export const SERVICES = [
  {
    id: "basic-website",
    label: "Basic website",
    brief: "a basic website",
    title: "Basic websites",
    body: "A straightforward site with the pages a business needs to be found — who you are, what you offer, and a way to get in touch.",
    includes:
      "a small set of pages, contact details, and a simple look that stays clear on a phone.",
  },
  {
    id: "custom-website",
    label: "Custom website",
    brief: "a custom website",
    title: "Custom websites",
    body: "A site designed and built for your business — clear pages, contact paths that work, and a look that matches how you want to be seen.",
    includes:
      "the pages, a contact path that works, and a look matched to the business.",
  },
  {
    id: "web-app",
    label: "Web app",
    brief: "a web app",
    title: "Web apps",
    body: "Tools your team or customers use in the browser on a phone or desktop — bookings, dashboards, portals, and internal workflows.",
    includes:
      "a tool in the browser for bookings, a dashboard, a portal, or an internal workflow.",
  },
  {
    id: "hosting",
    label: "Hosting",
    brief: "hosting and domain setup",
    title: "Hosting and domains",
    body: "Domain setup, SSL, hosting, and routine updates so the site stays online and current.",
    includes: "domain setup, SSL, hosting, and routine updates.",
  },
  {
    id: "crm",
    label: "Customer Relationship Management (CRM)",
    brief: "Customer Relationship Management (CRM) for enquiries",
    title: "Customer Relationship Management (CRM)",
    body: "A simple place to keep enquiries, follow-ups, and notes so leads do not get lost in a chat thread.",
    includes: "enquiries, follow-ups, and notes in one place.",
  },
] as const;

export type ServiceId = (typeof SERVICES)[number]["id"];

export function buildBriefLine(ids: ServiceId[]): string {
  if (ids.length === 0) {
    return "Select what you need and we will turn it into a brief.";
  }
  const phrases = SERVICES.filter((s) => ids.includes(s.id)).map((s) => s.brief);
  if (phrases.length === 1) {
    return `I need ${phrases[0]}.`;
  }
  if (phrases.length === 2) {
    return `I need ${phrases[0]} and ${phrases[1]}.`;
  }
  const last = phrases[phrases.length - 1];
  return `I need ${phrases.slice(0, -1).join(", ")}, and ${last}.`;
}
