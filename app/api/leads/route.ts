import { NextResponse } from "next/server";
import { Resend } from "resend";
import { SERVICES, type ServiceId } from "@/lib/services";
import { getAdminSupabase } from "@/lib/supabase/admin";

const SERVICE_IDS = new Set(SERVICES.map((s) => s.id));

type LeadBody = {
  name?: unknown;
  business?: unknown;
  email?: unknown;
  phone?: unknown;
  services?: unknown;
  message?: unknown;
  companyWebsite?: unknown;
};

function asString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function parseServices(value: unknown): ServiceId[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter((item): item is string => typeof item === "string")
    .filter((item): item is ServiceId => SERVICE_IDS.has(item as ServiceId));
}

export async function POST(request: Request) {
  let body: LeadBody;
  try {
    body = (await request.json()) as LeadBody;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // Honeypot: bots fill this; humans leave it empty.
  if (asString(body.companyWebsite)) {
    return NextResponse.json({ ok: true });
  }

  const name = asString(body.name);
  const business = asString(body.business);
  const email = asString(body.email);
  const phone = asString(body.phone);
  const message = asString(body.message);
  const services = parseServices(body.services);

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, email, and message are required." },
      { status: 400 },
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "Enter a valid email address." },
      { status: 400 },
    );
  }

  try {
    const supabase = getAdminSupabase();
    const { error } = await supabase.from("leads").insert({
      name,
      business: business || null,
      email,
      phone: phone || null,
      services,
      message,
      source: "meritbranding-site",
    });

    if (error) {
      console.error("leads insert failed", error);
      return NextResponse.json(
        {
          error:
            "We could not save your enquiry. WhatsApp +27 721 172 942 or email lukho@meritbranding.com.",
        },
        { status: 500 },
      );
    }
  } catch (err) {
    console.error("leads supabase unavailable", err);
    return NextResponse.json(
      {
        error:
          "We could not save your enquiry. WhatsApp +27 721 172 942 or email lukho@meritbranding.com.",
      },
      { status: 500 },
    );
  }

  // Email is best-effort after the row is saved.
  const resendKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.LEAD_TO_EMAIL || "lukho@meritbranding.com";
  const fromEmail =
    process.env.LEAD_FROM_EMAIL || "Merit Branding <onboarding@resend.dev>";

  if (resendKey) {
    try {
      const resend = new Resend(resendKey);
      const serviceLabels = SERVICES.filter((s) => services.includes(s.id))
        .map((s) => s.label)
        .join(", ");

      await resend.emails.send({
        from: fromEmail,
        to: [toEmail],
        replyTo: email,
        subject: `New enquiry from ${name}${business ? ` (${business})` : ""}`,
        text: [
          `Name: ${name}`,
          `Business: ${business || "—"}`,
          `Email: ${email}`,
          `Phone: ${phone || "—"}`,
          `Services: ${serviceLabels || "—"}`,
          "",
          message,
        ].join("\n"),
      });
    } catch (err) {
      console.error("lead email failed", err);
    }
  }

  return NextResponse.json({ ok: true });
}
