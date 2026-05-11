"use client";

import { useState, type FormEvent } from "react";

const ENDPOINT = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;

type State = "idle" | "sending" | "sent" | "error";

export function ContactForm() {
  const [state, setState] = useState<State>("idle");
  const [error, setError] = useState<string>("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!ENDPOINT) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    setState("sending");
    setError("");
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      if (!res.ok) {
        const payload: { error?: string; errors?: { message: string }[] } =
          await res.json().catch(() => ({}));
        const msg =
          payload.errors?.map((e) => e.message).join(", ") ??
          payload.error ??
          `HTTP ${res.status}`;
        throw new Error(msg);
      }
      form.reset();
      setState("sent");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
      setState("error");
    }
  }

  if (!ENDPOINT) {
    return (
      <p className="form__missing">
        Contact form offline. Endpoint not configured at build time.
        Reach out via GitHub below.
      </p>
    );
  }

  if (state === "sent") {
    return (
      <div className="form__sent" role="status" aria-live="polite">
        <span
          className="stamp"
          aria-label="Received — File Logged"
          style={{ "--rotate": "-4deg" } as React.CSSProperties}
        >
          Received — File Logged
        </span>
        <p>
          Transmission acknowledged. Response will arrive from the
          custodian channel. Allow 5 working days.
        </p>
      </div>
    );
  }

  return (
    <form
      className="form"
      action={ENDPOINT}
      method="POST"
      onSubmit={onSubmit}
      noValidate
      aria-describedby="form-meta"
    >
      <p id="form-meta" className="form__meta">
        Form 7B — Inbound contact request. Routed through external
        custodian. No email address exposed.
      </p>

      <input
        type="text"
        name="_gotcha"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", width: 1, height: 1 }}
      />
      <input
        type="hidden"
        name="_subject"
        value="Dossier 001 — Inbound Request"
      />

      <div className="form__row">
        <label className="form__label" htmlFor="form-name">
          Sender · Subject
        </label>
        <input
          className="form__input"
          id="form-name"
          name="name"
          type="text"
          required
          autoComplete="name"
          maxLength={120}
        />
      </div>

      <div className="form__row">
        <label className="form__label" htmlFor="form-email">
          Return Address
        </label>
        <input
          className="form__input"
          id="form-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          maxLength={200}
        />
      </div>

      <div className="form__row">
        <label className="form__label" htmlFor="form-org">
          Agency / Organisation
        </label>
        <input
          className="form__input"
          id="form-org"
          name="organisation"
          type="text"
          autoComplete="organization"
          maxLength={120}
        />
      </div>

      <div className="form__row">
        <label className="form__label" htmlFor="form-message">
          Message Body
        </label>
        <textarea
          className="form__input form__textarea"
          id="form-message"
          name="message"
          required
          rows={5}
          maxLength={4000}
        />
      </div>

      <div className="form__actions">
        <button
          className="form__submit"
          type="submit"
          disabled={state === "sending"}
        >
          {state === "sending" ? "Transmitting…" : "Transmit Request"}
        </button>
        <span className="form__hint" aria-hidden="true">
          ↵ Routed through formspree.io
        </span>
      </div>

      {state === "error" && (
        <p className="form__error" role="alert">
          Transmission failed: {error}. Retry, or contact via GitHub
          below.
        </p>
      )}
    </form>
  );
}
