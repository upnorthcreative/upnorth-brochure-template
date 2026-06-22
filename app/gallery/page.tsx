import type { Metadata } from "next";
import { siteConfig } from "@/lib/content";
import { Container } from "@/components/ui/Container";
import { PageBanner } from "@/components/sections/PageBanner";
import { InstagramGrid } from "@/components/sections/InstagramGrid";
import { fetchInstagramFeed } from "@/lib/instagram";

export const metadata: Metadata = {
  title: "Gallery",
  description: `Browse our work at ${siteConfig.name}.`,
};

export const revalidate = 3600;

export default async function GalleryPage() {
  const { social } = siteConfig;

  const posts = social.instagramFeedUrl
    ? await fetchInstagramFeed(social.instagramFeedUrl)
    : [];

  return (
    <>
      <PageBanner
        eyebrow="Our Work"
        title="Gallery"
        description="A selection of our recent work."
      />

      <section className="bg-white py-20 lg:py-28">
        <Container>
          {posts.length > 0 ? (
            <>
              {social.instagram && (
                <div className="flex justify-end mb-10">
                  <a
                    href={social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.18em] text-neutral-400 hover:text-neutral-900 transition-colors duration-300"
                  >
                    {social.instagramHandle ?? "Follow on Instagram"}
                    <span className="block w-8 h-px bg-current" />
                  </a>
                </div>
              )}
              <InstagramGrid posts={posts} />
            </>
          ) : (
            <div className="text-center py-20">
              <p className="text-xl font-light text-neutral-500 mb-6">
                Photography coming soon.
              </p>
              {social.instagram && (
                <a
                  href={social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.18em] text-neutral-500 hover:text-neutral-900 transition-colors duration-300"
                >
                  {social.instagramHandle ?? "Follow on Instagram"}
                  <span className="block w-8 h-px bg-current" />
                </a>
              )}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
