"use client";

import { useActionState } from "react";
import { sendMagicLink, type LoginState } from "@/app/login/actions";

const INITIAL: LoginState = {};

export function LoginForm({
  email,
  error,
}: {
  email?: string;
  error?: string;
}) {
  const [state, action, pending] = useActionState(sendMagicLink, INITIAL);
  const alert = state.error || error;

  if (state.sent) {
    return (
      <div className="rounded-2xl border border-merit/30 bg-paper p-6 sm:p-8" role="status">
        <h2 className="font-display text-2xl font-semibold text-ink">
          Check your email
        </h2>
        <p className="mt-3 text-base leading-relaxed text-muted">
          {state.devLink
            ? "Local sign-in is ready. Open the link below on this device."
            : "If that address is in use with us, a sign-in link is on the way. It can take a minute. Open it on this device."}
        </p>
        {state.devLink ? (
          <a
            href={state.devLink}
            className="mt-6 inline-flex items-center rounded-full bg-action px-5 py-3 text-sm font-medium text-on-action transition-opacity hover:opacity-90"
          >
            Open sign-in link
          </a>
        ) : null}
      </div>
    );
  }

  return (
    <form action={action} className="space-y-5">
      {alert ? (
        <p
          className="rounded-xl border border-merit/25 bg-paper px-4 py-3 text-sm text-muted"
          role="alert"
        >
          {alert}
        </p>
      ) : null}

      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-medium text-ink">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          defaultValue={email ?? ""}
          placeholder="thandi@nkosistudio.co.za"
          className="w-full rounded-xl border border-line bg-paper px-4 py-3 text-base text-ink placeholder:text-muted/60"
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="inline-flex w-full items-center justify-center rounded-full bg-action px-5 py-3 text-sm font-medium text-on-action transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {pending ? "Sending…" : "Send sign-in link"}
      </button>
    </form>
  );
}
