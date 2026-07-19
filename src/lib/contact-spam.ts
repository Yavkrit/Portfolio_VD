import { z } from "zod";

export const MIN_SUBMIT_TIME_MS = 1500;

export const contactSchema = z.object({
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

export type ContactSubmission = z.infer<typeof contactSchema>;

export function countUrls(text: string): number {
  return (text.match(/https?:\/\/|www\./gi) ?? []).length;
}

export function isSpamSubmission(
  submission: Pick<ContactSubmission, "company_website" | "started_at" | "message">,
  now: number = Date.now()
): boolean {
  const submittedTooFast =
    typeof submission.started_at === "number" &&
    now - submission.started_at < MIN_SUBMIT_TIME_MS;

  return (
    Boolean(submission.company_website) ||
    submittedTooFast ||
    countUrls(submission.message) > 2
  );
}
