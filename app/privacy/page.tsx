import type { Metadata } from "next";
import { LegalDocument, LegalSection } from "@/components/LegalDocument";
import { SITE } from "@/lib/site";

const description =
  "How Merit Branding LTO, an online studio, uses the details you send with a brief, an email, a call, or a portal sign-in.";

export const metadata: Metadata = {
  title: "Privacy",
  description,
  alternates: { canonical: "/privacy" },
  openGraph: {
    url: "/privacy",
    title: "Privacy — Merit Branding",
    description,
  },
  twitter: {
    title: "Privacy — Merit Branding",
    description,
  },
};

export default function PrivacyPage() {
  return (
    <LegalDocument
      eyebrow="Privacy"
      title="What we do with your details."
      lede={`${SITE.legalName} is an online studio. We have no shopfront. This page covers the details you send us from the website, by email, by phone, by WhatsApp, or when you sign in to the portal.`}
    >
      <LegalSection title="Who we are">
        <p>
          {SITE.legalName} builds websites, online stores, web apps, hosting, and
          Customer Relationship Management (CRM) for South African businesses. For
          questions about your details, email{" "}
          <a className="text-ink underline-offset-2 hover:text-merit hover:underline" href={`mailto:${SITE.email}`}>
            {SITE.email}
          </a>{" "}
          or call{" "}
          <a className="text-ink underline-offset-2 hover:text-merit hover:underline" href={`tel:${SITE.phoneTel}`}>
            {SITE.phoneDisplay}
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection title="What we collect">
        <p>From the brief form we collect:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>your name</li>
          <li>your business name, if you give one</li>
          <li>your email</li>
          <li>your phone number, if you give one</li>
          <li>the services you select</li>
          <li>the message you write</li>
        </ul>
        <p>
          If you email, call, or WhatsApp us, we keep the details you choose to
          send so we can reply. If you sign in to the portal, we use your email
          to send a sign-in link. We do not ask for a password.
        </p>
        <p>
          We do not ask for payment card numbers on this website. A quote, if
          you accept one, is handled separately from this form.
        </p>
      </LegalSection>

      <LegalSection title="Why we use it">
        <p>We use these details to:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>reply to your brief and follow up</li>
          <li>prepare a written quote</li>
          <li>do the work you have accepted</li>
          <li>send a portal sign-in link when you ask for one</li>
        </ul>
        <p>We do not sell your details. We do not use them for advertising lists.</p>
      </LegalSection>

      <LegalSection title="Who else sees it">
        <p>
          The enquiry is stored in Supabase so we can reply and keep a record
          of the brief. Portal accounts are stored there too. Email about a new
          enquiry, and the portal sign-in link, are sent through Resend to us
          or to you.
        </p>
        <p>
          We share details with someone else only when you ask us to, when a
          written quote says we will, or when South African law requires it.
        </p>
      </LegalSection>

      <LegalSection title="How long we keep it">
        <p>
          We keep a brief while we are talking, and afterwards as a record of
          what was asked and what was agreed. Portal sign-in links expire on
          their own. Email{" "}
          <a className="text-ink underline-offset-2 hover:text-merit hover:underline" href={`mailto:${SITE.email}`}>
            {SITE.email}
          </a>{" "}
          if you want a copy, a correction, or deletion. We will delete what we
          can, and we will say if a record has to stay because of a quote, an
          invoice, or the law.
        </p>
      </LegalSection>

      <LegalSection title="Cookies">
        <p>
          The public pages do not use advertising or analytics cookies. If you
          sign in, the portal keeps a session cookie so you stay signed in on
          that device. You can sign out, or clear the cookie in your browser.
        </p>
      </LegalSection>

      <LegalSection title="This page">
        <p>
          We will update this page if the way we handle details changes. The
          date at the top is the latest version. The{" "}
          <a className="text-ink underline-offset-2 hover:text-merit hover:underline" href="/terms">
            terms
          </a>{" "}
          cover quotes and the work itself.
        </p>
      </LegalSection>
    </LegalDocument>
  );
}
