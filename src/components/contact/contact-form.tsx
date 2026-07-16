"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "success" | "error";

const inputClass =
  "w-full border border-border bg-background-elevated px-4 py-3 text-sm text-foreground placeholder:text-foreground-subtle focus:border-accent focus:outline-none";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "Something went wrong. Please try again.");
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    }
  }

  if (status === "success") {
    return (
      <div className="border border-border-strong bg-background-elevated p-10 text-center">
        <p className="font-display text-2xl text-foreground">Message sent</p>
        <p className="mt-2 text-sm text-foreground-muted">
          Thank you for reaching out — your message has been received and will be
          reviewed personally.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* honeypot — hidden from real users, catches simple bots */}
      <input
        type="text"
        name="company_website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="font-mono text-[11px] uppercase tracking-wider text-foreground-subtle">
            Name
          </label>
          <input id="name" name="name" required minLength={2} maxLength={120} className={cn(inputClass, "mt-2")} />
        </div>
        <div>
          <label htmlFor="email" className="font-mono text-[11px] uppercase tracking-wider text-foreground-subtle">
            Email
          </label>
          <input id="email" type="email" name="email" required maxLength={200} className={cn(inputClass, "mt-2")} />
        </div>
      </div>

      <div>
        <label htmlFor="organization" className="font-mono text-[11px] uppercase tracking-wider text-foreground-subtle">
          Organization <span className="normal-case text-foreground-subtle">(optional)</span>
        </label>
        <input id="organization" name="organization" maxLength={200} className={cn(inputClass, "mt-2")} />
      </div>

      <div>
        <label htmlFor="subject" className="font-mono text-[11px] uppercase tracking-wider text-foreground-subtle">
          Subject
        </label>
        <input id="subject" name="subject" required minLength={2} maxLength={150} className={cn(inputClass, "mt-2")} />
      </div>

      <div>
        <label htmlFor="message" className="font-mono text-[11px] uppercase tracking-wider text-foreground-subtle">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          minLength={10}
          maxLength={4000}
          rows={6}
          className={cn(inputClass, "mt-2 resize-none")}
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-red-500">{errorMessage}</p>
      )}

      <Button type="submit" disabled={status === "submitting"}>
        {status === "submitting" ? "Sending…" : "Send Message"}
      </Button>
    </form>
  );
}
