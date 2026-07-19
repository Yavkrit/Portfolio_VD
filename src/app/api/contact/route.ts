import { NextResponse } from "next/server";
import { Resend } from "resend";
import { adminNotificationEmail, visitorConfirmationEmail } from "@/lib/email-templates";
import { contactSchema, isSpamSubmission } from "@/lib/contact-spam";

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

  const { name, email, organization, subject, message } = parsed.data;

  // Spam heuristics: honeypot filled, submitted implausibly fast, or
  // message is link-heavy. Report success without sending, so bots get
  // no signal that they were caught.
  if (isSpamSubmission(parsed.data)) {
    console.warn("Contact form submission flagged as spam and dropped.");
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
    // Sent as separate per-recipient calls rather than one batched `to`
    // array: Resend's sandbox mode (no verified domain yet) rejects the
    // *entire* send if any recipient isn't the account's verified address,
    // so batching would silently block delivery to every recipient just
    // because one of them isn't verified yet. Isolating each recipient
    // means the ones that can deliver today still do, independently.
    const admin = adminNotificationEmail({ name, email, organization, subject, message });
    const adminResults = await Promise.allSettled(
      toEmails.map((recipient) =>
        resend.emails.send({
          from: "Dr Dattatraya Vhatkar <contact@vdshivling.in>",
          to: recipient,
          replyTo: email,
          subject: admin.subject,
          html: admin.html,
          text: admin.text,
        })
      )
    );

    const failures = adminResults.flatMap((result, i) => {
      if (result.status === "rejected") return [{ to: toEmails[i], error: result.reason }];
      if (result.value.error) return [{ to: toEmails[i], error: result.value.error }];
      return [];
    });
    const succeeded = toEmails.filter((_, i) => !failures.some((f) => f.to === toEmails[i]));

    if (failures.length > 0) {
      console.error("Some admin notification recipients failed:", failures);
    }

    if (succeeded.length === 0) {
      return NextResponse.json(
        { error: "Something went wrong sending your message. Please try again." },
        { status: 502 }
      );
    }

    // Best-effort visitor confirmation — the admin notification above is
    // the one that matters, so a failure here shouldn't fail the request.
    const confirmation = visitorConfirmationEmail({ name, subject });
    const { error: confirmationError } = await resend.emails.send({
      from: "Dr Dattatraya Vhatkar <contact@vdshivling.in>",
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
