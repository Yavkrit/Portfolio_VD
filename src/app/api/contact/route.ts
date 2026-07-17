import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import { adminNotificationEmail, visitorConfirmationEmail } from "@/lib/email-templates";

const MIN_SUBMIT_TIME_MS = 1500;

const contactSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(200),
  organization: z.string().trim().max(200).optional().or(z.literal("")),
  subject: z.string().trim().min(2).max(150),
  message: z.string().trim().min(10).max(4000),
  // honeypot field — real users never fill this in
  company_website: z.string().max(0).optional().or(z.literal("")),
  // timestamp (ms) captured when the form first rendered client-side
  started_at: z.coerce.number().optional(),
});

function countUrls(text: string): number {
  return (text.match(/https?:\/\/|www\./gi) ?? []).length;
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please check the form fields and try again." },
      { status: 400 }
    );
  }

  const { name, email, organization, subject, message, company_website, started_at } =
    parsed.data;

  // Spam heuristics: honeypot filled, submitted implausibly fast, or
  // message is link-heavy. Report success without sending, so bots get
  // no signal that they were caught.
  const submittedTooFast =
    typeof started_at === "number" && Date.now() - started_at < MIN_SUBMIT_TIME_MS;
  const isSpam = Boolean(company_website) || submittedTooFast || countUrls(message) > 2;

  if (isSpam) {
    console.warn("Contact form submission flagged as spam and dropped.", {
      submittedTooFast,
      hasHoneypot: Boolean(company_website),
      urlCount: countUrls(message),
    });
    return NextResponse.json({ ok: true });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmails = (process.env.CONTACT_TO_EMAIL ?? "")
    .split(",")
    .map((e) => e.trim())
    .filter(Boolean);

  if (!apiKey || toEmails.length === 0) {
    console.warn(
      "Contact form submitted, but RESEND_API_KEY / CONTACT_TO_EMAIL are not configured yet."
    );
    return NextResponse.json(
      {
        error:
          "The contact form isn't wired up to email delivery yet. Please try again shortly.",
      },
      { status: 503 }
    );
  }

  const resend = new Resend(apiKey);

  try {
    const admin = adminNotificationEmail({ name, email, organization, subject, message });
    const { error: adminError } = await resend.emails.send({
      from: "Portfolio Contact Form <onboarding@resend.dev>",
      to: toEmails,
      replyTo: email,
      subject: admin.subject,
      html: admin.html,
      text: admin.text,
    });

    if (adminError) {
      console.error("Failed to send admin notification email:", adminError);
      return NextResponse.json(
        { error: "Something went wrong sending your message. Please try again." },
        { status: 502 }
      );
    }

    // Best-effort visitor confirmation — the admin notification above is
    // the one that matters, so a failure here shouldn't fail the request.
    const confirmation = visitorConfirmationEmail({ name, subject });
    const { error: confirmationError } = await resend.emails.send({
      from: "Dr. V. D. Shivling <onboarding@resend.dev>",
      to: email,
      subject: confirmation.subject,
      html: confirmation.html,
      text: confirmation.text,
    });

    if (confirmationError) {
      console.error("Failed to send visitor confirmation email:", confirmationError);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Failed to send contact email:", error);
    return NextResponse.json(
      { error: "Something went wrong sending your message. Please try again." },
      { status: 500 }
    );
  }
}
