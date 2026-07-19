import { describe, expect, it } from "vitest";
import { contactSchema, countUrls, isSpamSubmission } from "./contact-spam";

const validSubmission = {
  name: "Jane Researcher",
  email: "jane@example.com",
  subject: "Collaboration inquiry",
  message: "I would like to discuss a potential research collaboration.",
};

describe("contactSchema", () => {
  it("accepts a valid submission", () => {
    const result = contactSchema.safeParse(validSubmission);
    expect(result.success).toBe(true);
  });

  it("rejects a message shorter than 10 characters", () => {
    const result = contactSchema.safeParse({ ...validSubmission, message: "too short" });
    expect(result.success).toBe(false);
  });

  it("rejects an invalid email address", () => {
    const result = contactSchema.safeParse({ ...validSubmission, email: "not-an-email" });
    expect(result.success).toBe(false);
  });

  it("rejects a non-empty honeypot field", () => {
    const result = contactSchema.safeParse({
      ...validSubmission,
      company_website: "http://spam.example",
    });
    expect(result.success).toBe(false);
  });

  it("accepts an optional organization field", () => {
    const result = contactSchema.safeParse({ ...validSubmission, organization: "CSIR-CSIO" });
    expect(result.success).toBe(true);
  });
});

describe("countUrls", () => {
  it("counts http(s) and www occurrences", () => {
    expect(countUrls("check https://a.com and www.b.com and http://c.com")).toBe(3);
  });

  it("returns 0 for plain text", () => {
    expect(countUrls("no links here at all")).toBe(0);
  });
});

describe("isSpamSubmission", () => {
  it("flags a filled honeypot as spam", () => {
    const spam = isSpamSubmission({
      company_website: "http://bot.example",
      started_at: undefined,
      message: "hello",
    });
    expect(spam).toBe(true);
  });

  it("flags a submission sent faster than the minimum time as spam", () => {
    const now = 10_000;
    const spam = isSpamSubmission(
      { company_website: "", started_at: now - 100, message: "hello there" },
      now
    );
    expect(spam).toBe(true);
  });

  it("flags a link-heavy message as spam", () => {
    const spam = isSpamSubmission({
      company_website: "",
      started_at: undefined,
      message: "visit http://a.com http://b.com http://c.com",
    });
    expect(spam).toBe(true);
  });

  it("does not flag a normal, human-paced submission", () => {
    const now = 10_000;
    const spam = isSpamSubmission(
      { company_website: "", started_at: now - 5000, message: "A normal message." },
      now
    );
    expect(spam).toBe(false);
  });
});
