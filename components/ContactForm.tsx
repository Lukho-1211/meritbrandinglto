"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { SERVICES, type ServiceId } from "@/lib/services";

type ContactFormProps = {
  preselected: ServiceId[];
};

type FormStatus = "idle" | "submitting" | "success" | "error";

export function ContactForm({ preselected }: ContactFormProps) {
  const [name, setName] = useState("");
  const [business, setBusiness] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [services, setServices] = useState<ServiceId[]>(preselected);
  const honeypotRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setServices(preselected);
  }, [preselected]);

  function toggleService(id: ServiceId) {
    setServices((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  }

  function validate() {
    const errors: Record<string, string> = {};
    if (!name.trim()) errors.name = "Enter your name.";
    if (!email.trim()) errors.email = "Enter your email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errors.email = "Enter a valid email address.";
    }
    if (!message.trim()) errors.message = "Tell us a little about what you need.";
    return errors;
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");
    const errors = validate();
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) {
      setStatus("idle");
      return;
    }

    setStatus("submitting");
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          business: business.trim(),
          email: email.trim(),
          phone: phone.trim(),
          services,
          message: message.trim(),
          companyWebsite: honeypotRef.current?.value ?? "",
        }),
      });

      const data = (await response.json().catch(() => ({}))) as {
        error?: string;
      };

      if (!response.ok) {
        setStatus("error");
        setErrorMessage(
          data.error ||
            "We could not save your enquiry. WhatsApp or email us instead.",
        );
        return;
      }

      setStatus("success");
      setName("");
      setBusiness("");
      setEmail("");
      setPhone("");
      setMessage("");
      setServices([]);
      setFieldErrors({});
    } catch {
      setStatus("error");
      setErrorMessage(
        "We could not reach the server. WhatsApp +27 721 172 942 or email meritbrandinglto@gmail.com.",
      );
    }
  }

  if (status === "success") {
    return (
      <div
        className="rounded-2xl border border-merit/30 bg-paper p-6 sm:p-8"
        role="status"
      >
        <h3 className="font-display text-2xl font-semibold text-ink">
          Enquiry received
        </h3>
        <p className="mt-3 text-base leading-relaxed text-muted">
          Thanks — your brief is with us. We will reply by email. For something
          urgent, WhatsApp{" "}
          <a
            className="text-merit underline-offset-2 hover:underline"
            href="https://wa.me/27721172942"
          >
            +27 721 172 942
          </a>
          .
        </p>
        <button
          type="button"
          className="mt-6 inline-flex rounded-full border border-line px-4 py-2 text-sm font-medium text-ink hover:bg-field"
          onClick={() => setStatus("idle")}
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      <div className="hidden" aria-hidden="true">
        <label htmlFor="mbl_hp">Leave blank</label>
        <input
          id="mbl_hp"
          name="mbl_hp"
          ref={honeypotRef}
          tabIndex={-1}
          autoComplete="off"
          defaultValue=""
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id="name"
          label="Name"
          placeholder="Thandi Nkosi"
          value={name}
          onChange={setName}
          error={fieldErrors.name}
          required
        />
        <Field
          id="business"
          label="Business"
          placeholder="Nkosi Studio"
          value={business}
          onChange={setBusiness}
        />
        <Field
          id="email"
          label="Email"
          type="email"
          placeholder="thandi@nkosistudio.co.za"
          value={email}
          onChange={setEmail}
          error={fieldErrors.email}
          required
        />
        <Field
          id="phone"
          label="Phone"
          type="tel"
          placeholder="072 123 4567"
          value={phone}
          onChange={setPhone}
        />
      </div>

      <fieldset>
        <legend className="mb-3 text-sm font-medium text-ink">Services</legend>
        <div className="flex flex-wrap gap-2">
          {SERVICES.map((service) => {
            const active = services.includes(service.id);
            return (
              <label
                key={service.id}
                className={`cursor-pointer rounded-full border px-3 py-1.5 text-sm transition-colors ${
                  active
                    ? "border-merit bg-merit text-paper"
                    : "border-line bg-paper text-muted hover:border-merit/40"
                }`}
              >
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={active}
                  onChange={() => toggleService(service.id)}
                />
                {service.label}
              </label>
            );
          })}
        </div>
      </fieldset>

      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-medium text-ink">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full rounded-xl border border-line bg-paper px-4 py-3 text-base text-ink placeholder:text-muted/60"
          placeholder="What do you need built, and when?"
          required
        />
        {fieldErrors.message ? (
          <p className="mt-1.5 text-sm text-merit" role="alert">
            {fieldErrors.message}
          </p>
        ) : null}
      </div>

      {status === "error" ? (
        <p className="rounded-xl border border-merit/25 bg-paper px-4 py-3 text-sm text-muted" role="alert">
          {errorMessage}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex w-full items-center justify-center rounded-full bg-merit px-5 py-3 text-sm font-medium text-paper transition-opacity hover:opacity-90 disabled:opacity-60 sm:w-auto"
      >
        {status === "submitting" ? "Sending…" : "Send enquiry"}
      </button>
      <p className="text-sm leading-relaxed text-muted">
        We use your name, business, email, and phone only to reply to this brief.
      </p>
    </form>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  error,
  required,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
  error?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-ink">
        {label}
        {required ? <span className="text-merit"> *</span> : null}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="w-full rounded-xl border border-line bg-paper px-4 py-3 text-base text-ink placeholder:text-muted/60"
      />
      {error ? (
        <p className="mt-1.5 text-sm text-merit" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
