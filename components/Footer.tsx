import Image from "next/image";
import { SocialLinks } from "@/components/SocialLinks";

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
          <div>
            <p className="font-display font-medium text-ink">Merit Branding LTO</p>
            <p className="text-xs">Lukho replies to every brief.</p>
          </div>
        </div>
        <p>Websites, stores, apps, hosting, and CRM.</p>
        <div className="flex flex-col gap-2 sm:items-end">
          <a href="tel:+27721172942" className="hover:text-ink transition-colors">
            +27 721 172 942
          </a>
          <a
            href="mailto:lukho@meritbranding.com"
            className="hover:text-ink transition-colors"
          >
            lukho@meritbranding.com
          </a>
          <SocialLinks variant="footer" className="sm:justify-end" />
          <nav aria-label="Legal" className="flex gap-4">
            <a href="/privacy" className="hover:text-ink transition-colors">
              Privacy
            </a>
            <a href="/terms" className="hover:text-ink transition-colors">
              Terms
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
