import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";

const contactSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(200),
  organization: z.string().trim().max(200).optional().or(z.literal("")),
  subject: z.string().trim().min(2).max(150),
  message: z.string().trim().min(10).max(4000),
  // honeypot field — real users never fill this in
  company_website: z.string().max(0).optional().or(z.literal("")),
});

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

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !toEmail) {
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

  const { name, email, organization, subject, message } = parsed.data;

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: "Portfolio Contact Form <onboarding@resend.dev>",
      to: toEmail,
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        organization ? `Organization: ${organization}` : null,
        "",
        message,
      ]
        .filter(Boolean)
        .join("\n"),
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Failed to send contact email:", error);
    return NextResponse.json(
      { error: "Something went wrong sending your message. Please try again." },
      { status: 500 }
    );
  }
}
