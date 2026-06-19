import { siteConfig } from "@/lib/content";

export function GoogleMap() {
  const { maps, address } = siteConfig;

  if (maps.embedUrl) {
    return (
      <div className="border border-neutral-200 overflow-hidden aspect-video">
        <iframe
          src={maps.embedUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={`Map showing ${address.full}`}
        />
      </div>
    );
  }

  return (
    <div className="border border-neutral-200 bg-neutral-50 aspect-video flex items-center justify-center">
      <div className="text-center p-6">
        <svg
          className="w-6 h-6 mx-auto mb-3 text-neutral-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
        </svg>
        <p className="text-[13px] font-medium text-neutral-600 mb-1">{address.full}</p>
        {maps.profileUrl && (
          <a
            href={maps.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[12px] text-neutral-400 hover:text-neutral-700 underline underline-offset-2 transition-colors"
          >
            View on Google Maps
          </a>
        )}
      </div>
    </div>
  );
}
