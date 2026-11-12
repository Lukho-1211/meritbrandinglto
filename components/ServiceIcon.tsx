import type { ServiceId } from "@/lib/services";

const SERVICE_ICON_SRC: Record<ServiceId, string> = {
  "basic-website": "/icons/services/basic-website.svg",
  "custom-website": "/icons/services/custom-website.svg",
  "online-store": "/icons/services/online-store.svg",
  "web-app": "/icons/services/web-app.svg",
  hosting: "/icons/services/hosting.svg",
  crm: "/icons/services/crm.svg",
};

export function ServiceIcon({ id }: { id: ServiceId }) {
  const src = SERVICE_ICON_SRC[id];

  return (
    <span
      aria-hidden
      className="mt-1 inline-block size-[22px] shrink-0 bg-merit"
      style={{
        maskImage: `url(${src})`,
        maskSize: "contain",
        maskRepeat: "no-repeat",
        maskPosition: "center",
        WebkitMaskImage: `url(${src})`,
        WebkitMaskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
      }}
    />
  );
}
