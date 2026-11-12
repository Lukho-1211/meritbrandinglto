import type { Metadata } from "next";
import { LegalDocument, LegalSection } from "@/components/LegalDocument";
import { SITE } from "@/lib/site";

const description =
  "Terms for briefs, quotes, and work from Merit Branding LTO, an online studio for South African businesses.";

export const metadata: Metadata = {
  title: "Terms",
  description,
  alternates: { canonical: "/terms" },
  openGraph: {
    url: "/terms",
    title: "Terms — Merit Branding",
    description,
  },
  twitter: {
    title: "Terms — Merit Branding",
    description,
  },
};

export default function TermsPage() {
  return (
    <LegalDocument
      eyebrow="Terms"
      title="How a brief becomes work."
      lede={`${SITE.legalName} is an online studio. These terms cover the website, a brief, a quote, and the work that follows. If a written quote you accept says something different about price, scope, timing, or ownership, the quote is the one that applies.`}
    >
      <LegalSection title="Using the site">
        <p>
          The pages describe what we build: websites, online stores, web apps,
          hosting, and Customer Relationship Management (CRM). Sending a brief,
          an email, or a WhatsApp message asks us to reply. It does not start
          paid work and it does not reserve a date.
        </p>
        <p>
          You confirm that the name, business, and contact details you send are
          yours to give, and that you have the right to use any logos, words,
          and pictures you later send for a project.
        </p>
      </LegalSection>

      <LegalSection title="Quotes">
        <p>
          We reply with a written quote after the brief. A website, a store, an
          app, and monthly hosting are priced separately. You can take one or
          all of them. Timing is part of that quote.
        </p>
        <p>
          Work starts when you accept the quote in writing. Until then, either
          of us can stop. We can decline a brief.
        </p>
      </LegalSection>

      <LegalSection title="The build">
        <p>
          Nothing goes live until you have reviewed the working pages. What you
          keep after launch, and what we look after, is written into the quote
          before we start.
        </p>
        <p>
          You review promptly and send the content the quote relies on. If the
          scope changes after you accept, we agree the change in writing,
          including any change in price or time.
        </p>
      </LegalSection>

      <LegalSection title="Hosting">
        <p>
          Hosting, when you take it, is a separate monthly amount. It covers
          domain setup, SSL, hosting, and routine updates, so the site stays
          online and current. How to end that monthly service is written into
          the quote.
        </p>
      </LegalSection>

      <LegalSection title="The portal">
        <p>
          The portal is for a person using an email we already have from a
          brief or from work with us. Sign-in is an email link, not a password.
          Do not share that link. We can close a portal sign-in that is unused
          or misused.
        </p>
      </LegalSection>

      <LegalSection title="If something goes wrong">
        <p>
          We do the work described in the accepted quote with reasonable care.
          If we are responsible for a problem on that work, our liability is
          limited to the fees you paid us for that project. This limit does not
          apply where South African law does not allow it.
        </p>
        <p>
          We are not responsible for outages, losses, or delays caused by a
          domain registrar, a host, an email provider, or content you supplied.
        </p>
      </LegalSection>

      <LegalSection title="Law and contact">
        <p>
          These terms are governed by the laws of South Africa. We are an
          online studio, so notices go to{" "}
          <a className="text-ink underline-offset-2 hover:text-merit hover:underline" href={`mailto:${SITE.email}`}>
            {SITE.email}
          </a>{" "}
          or {SITE.phoneDisplay}. How we handle personal details is on the{" "}
          <a className="text-ink underline-offset-2 hover:text-merit hover:underline" href="/privacy">
            privacy page
          </a>
          .
        </p>
      </LegalSection>
    </LegalDocument>
  );
}
