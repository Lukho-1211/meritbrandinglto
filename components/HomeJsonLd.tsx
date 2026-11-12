import { QUESTIONS } from "@/lib/questions";
import { SITE, getPublicOrigin } from "@/lib/site";

export function HomeJsonLd() {
  const origin = getPublicOrigin();
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": `${origin}/#studio`,
        name: SITE.legalName,
        url: origin,
        image: `${origin}/opengraph-image`,
        description: SITE.description,
        email: SITE.email,
        telephone: SITE.phoneTel,
        areaServed: { "@type": "Country", name: "South Africa" },
        contactPoint: {
          "@type": "ContactPoint",
          telephone: SITE.phoneTel,
          email: SITE.email,
          contactType: "customer service",
          areaServed: "ZA",
          availableLanguage: "English",
        },
      },
      {
        "@type": "WebSite",
        "@id": `${origin}/#website`,
        name: SITE.name,
        url: origin,
        publisher: { "@id": `${origin}/#studio` },
      },
      {
        "@type": "FAQPage",
        mainEntity: QUESTIONS.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
