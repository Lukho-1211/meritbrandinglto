import Image from "next/image";

export function Footer() {
  return (
    <footer className="border-t border-line bg-field">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 pb-24 pt-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:pb-8">
        <div className="flex items-center gap-2.5">
          <Image
            src="/brand/logo.png"
            alt="Merit Branding logo"
            width={28}
            height={28}
            className="rounded-md"
          />
          <p className="font-display font-medium text-ink">Merit Branding LTO</p>
        </div>
        <p>Websites, apps, hosting, and Customer Relationship Management (CRM).</p>
        <div className="flex flex-col gap-2 sm:items-end">
          <a href="tel:+27721172942" className="hover:text-ink transition-colors">
            +27 721 172 942
          </a>
          <a
            href="mailto:meritbrandinglto@gmail.com"
            className="hover:text-ink transition-colors"
          >
            meritbrandinglto@gmail.com
          </a>
          <a
            href="https://wa.me/27721172942"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-ink transition-colors"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </footer>
  );
}
