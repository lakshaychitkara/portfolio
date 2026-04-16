"use client";

import { FormEvent, useId, useState } from "react";
import { buildApiUrl, getApiTargetDiagnostics } from "@/lib/api";
import { fetchJson } from "@/lib/http";
import { captureClientError } from "@/lib/telemetry";
import type { ContactResponse } from "@/lib/types";

interface ContactState {
  name: string;
  email: string;
  message: string;
}

const initialState: ContactState = {
  name: "",
  email: "",
  message: "",
};

interface ContactFieldErrors {
  name?: string;
  email?: string;
  message?: string;
}

function validateContactForm(form: ContactState): ContactFieldErrors {
  const errors: ContactFieldErrors = {};

  const name = form.name.trim();
  const email = form.email.trim();
  const message = form.message.trim();

  if (name.length < 2 || name.length > 80) {
    errors.name = "Name must be between 2 and 80 characters.";
  }

  if (!/^\S+@\S+\.\S+$/.test(email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (message.length < 12 || message.length > 3000) {
    errors.message = "Message must be between 12 and 3000 characters.";
  }

  return errors;
}

export function ContactForm() {
  const formPrefix = useId();
  const nameId = `${formPrefix}-name`;
  const emailId = `${formPrefix}-email`;
  const messageId = `${formPrefix}-message`;
  const nameErrorId = `${nameId}-error`;
  const emailErrorId = `${emailId}-error`;
  const messageErrorId = `${messageId}-error`;
  const [form, setForm] = useState<ContactState>(initialState);
  const [fieldErrors, setFieldErrors] = useState<ContactFieldErrors>({});
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validationErrors = validateContactForm(form);
    setFieldErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    if (typeof navigator !== "undefined" && !navigator.onLine) {
      setError("You appear to be offline. Reconnect and try again.");
      return;
    }

    setLoading(true);
    setStatus(null);
    setError(null);

    try {
      const payload = await fetchJson<ContactResponse>(buildApiUrl("/api/contact"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
        timeoutMs: 8000,
        retries: 0,
        dedupeKey: `contact:${form.email}:${form.message.length}`,
      });
      setStatus(payload.message ?? "Message received.");
      setForm(initialState);
      setFieldErrors({});
    } catch (err) {
      const diagnostics = getApiTargetDiagnostics();
      const message = err instanceof Error ? err.message : "Unexpected error.";
      const hint = diagnostics.warning ? ` ${diagnostics.warning}` : "";
      captureClientError("contact_form_submit", err, {
        apiMode: diagnostics.mode,
        configuredBaseUrl: diagnostics.configuredBaseUrl,
        effectiveBaseUrl: diagnostics.effectiveBaseUrl,
        usesSameOrigin: diagnostics.usesSameOrigin,
      });
      setError(`${message}${hint}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-white/10 bg-slate-900/80 p-5">
      <label htmlFor={nameId} className="block space-y-2">
        <span className="text-sm font-medium text-slate-100">Name</span>
        <input
          id={nameId}
          required
          minLength={2}
          maxLength={80}
          autoComplete="name"
          value={form.name}
          onChange={(event) =>
            setForm((prev) => ({
              ...prev,
              name: event.target.value,
            }))
          }
          aria-invalid={fieldErrors.name ? "true" : "false"}
          aria-describedby={fieldErrors.name ? nameErrorId : undefined}
          className="min-h-[44px] w-full rounded-xl border border-white/15 bg-slate-950/70 px-3 py-2 text-sm text-slate-100"
          placeholder="Your name"
        />
        {fieldErrors.name ? (
          <p id={nameErrorId} className="text-xs text-rose-300">
            {fieldErrors.name}
          </p>
        ) : null}
      </label>

      <label htmlFor={emailId} className="block space-y-2">
        <span className="text-sm font-medium text-slate-100">Email</span>
        <input
          id={emailId}
          type="email"
          required
          maxLength={120}
          autoComplete="email"
          value={form.email}
          onChange={(event) =>
            setForm((prev) => ({
              ...prev,
              email: event.target.value,
            }))
          }
          aria-invalid={fieldErrors.email ? "true" : "false"}
          aria-describedby={fieldErrors.email ? emailErrorId : undefined}
          className="min-h-[44px] w-full rounded-xl border border-white/15 bg-slate-950/70 px-3 py-2 text-sm text-slate-100"
          placeholder="you@example.com"
        />
        {fieldErrors.email ? (
          <p id={emailErrorId} className="text-xs text-rose-300">
            {fieldErrors.email}
          </p>
        ) : null}
      </label>

      <label htmlFor={messageId} className="block space-y-2">
        <span className="text-sm font-medium text-slate-100">Message</span>
        <textarea
          id={messageId}
          required
          minLength={12}
          maxLength={3000}
          aria-invalid={fieldErrors.message ? "true" : "false"}
          aria-describedby={fieldErrors.message ? messageErrorId : undefined}
          value={form.message}
          onChange={(event) =>
            setForm((prev) => ({
              ...prev,
              message: event.target.value,
            }))
          }
          className="min-h-32 w-full rounded-xl border border-white/15 bg-slate-950/70 px-3 py-2 text-sm text-slate-100"
          placeholder="Tell me about the role, project scope, or collaboration idea"
        />
        {fieldErrors.message ? (
          <p id={messageErrorId} className="text-xs text-rose-300">
            {fieldErrors.message}
          </p>
        ) : null}
      </label>

      <button
        type="submit"
        disabled={loading}
        className="inline-flex min-h-[44px] items-center rounded-full bg-cyan-400 px-5 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Sending..." : "Send Message"}
      </button>

      {status ? (
        <p className="text-sm text-emerald-300" aria-live="polite" role="status">
          {status}
        </p>
      ) : null}
      {error ? (
        <p className="text-sm text-rose-300" aria-live="polite" role="alert">
          {error}
        </p>
      ) : null}
    </form>
  );
}
