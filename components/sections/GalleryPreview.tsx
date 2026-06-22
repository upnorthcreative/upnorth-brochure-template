import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/content";
import { Container } from "@/components/ui/Container";
import { fetchInstagramFeed } from "@/lib/instagram";

export async function GalleryPreview() {
  const { social } = siteConfig;

  const posts = social.instagramFeedUrl
    ? await fetchInstagramFeed(social.instagramFeedUrl)
    : [];

  const p = posts.slice(0, 6);
  const hasPosts = p.length > 0;

  // Hidden entirely when no feed is configured and no embed code is set
  if (!social.instagramFeedUrl && !social.instagramEmbedCode) return null;

  return (
    <section className="bg-neutral-950 py-24 lg:py-36">
      <Container>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-14 lg:mb-20">
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-neutral-500 mb-3">
              Follow Along
            </p>
            <h2 className="text-3xl lg:text-4xl font-semibold text-white leading-tight">
              On Instagram
            </h2>
          </div>

          {social.instagram && (
            <a
              href={social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] uppercase tracking-[0.18em] text-neutral-500 hover:text-white transition-colors duration-300 flex items-center gap-3 self-start sm:self-auto"
            >
              {social.instagramHandle ?? "View Profile"}
              <span className="block w-8 h-px bg-current" />
            </a>
          )}
        </div>

        {social.instagramEmbedCode ? (
          <div
            className="instagram-embed"
            dangerouslySetInnerHTML={{ __html: social.instagramEmbedCode }}
          />
        ) : hasPosts ? (
          <>
            {/* Mobile: 2-column natural masonry */}
            <div className="md:hidden columns-2 gap-x-4">
              {p.map((post) => (
                <a
                  key={post.id}
                  href={post.permalink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block break-inside-avoid mb-4 overflow-hidden rounded-lg bg-neutral-800"
                >
                  <Image
                    src={post.sizes.medium.mediaUrl}
                    alt={post.caption?.slice(0, 80) ?? ""}
                    width={post.sizes.medium.width}
                    height={post.sizes.medium.height}
                    className="w-full h-auto block group-hover:scale-[1.04] group-hover:brightness-105 transition-all duration-700 ease-out"
                    sizes="50vw"
                  />
                </a>
              ))}
            </div>

            {/* Desktop: editorial layout — large feature left, 2 stacked right, 3 bottom */}
            <div className="hidden md:block">
              <div className="flex gap-5 lg:gap-6 mb-5 lg:mb-6">
                {p[0] && (
                  <a
                    href={p[0].permalink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative shrink-0 overflow-hidden rounded-lg"
                    style={{ width: "57%", height: "clamp(400px, 38vw, 560px)" }}
                  >
                    <Image
                      src={p[0].sizes.medium.mediaUrl}
                      alt={p[0].caption?.slice(0, 80) ?? ""}
                      fill
                      className="object-cover group-hover:scale-[1.04] group-hover:brightness-105 transition-all duration-700 ease-out"
                      sizes="57vw"
                      priority
                    />
                  </a>
                )}

                <div className="flex flex-col flex-1 gap-5 lg:gap-6">
                  {p.slice(1, 3).map((post) => (
                    <a
                      key={post.id}
                      href={post.permalink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative flex-1 overflow-hidden rounded-lg"
                    >
                      <Image
                        src={post.sizes.medium.mediaUrl}
                        alt={post.caption?.slice(0, 80) ?? ""}
                        fill
                        className="object-cover group-hover:scale-[1.04] group-hover:brightness-105 transition-all duration-700 ease-out"
                        sizes="21vw"
                      />
                    </a>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-5 lg:gap-6">
                {p.slice(3, 6).map((post) => (
                  <a
                    key={post.id}
                    href={post.permalink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative overflow-hidden rounded-lg"
                    style={{ height: "clamp(200px, 20vw, 300px)" }}
                  >
                    <Image
                      src={post.sizes.medium.mediaUrl}
                      alt={post.caption?.slice(0, 80) ?? ""}
                      fill
                      className="object-cover group-hover:scale-[1.04] group-hover:brightness-105 transition-all duration-700 ease-out"
                      sizes="33vw"
                    />
                  </a>
                ))}
              </div>
            </div>

            <div className="mt-12 lg:mt-16 text-center">
              <Link
                href="/gallery"
                className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.18em] text-neutral-500 hover:text-white transition-colors duration-300"
              >
                View Gallery
                <span className="block w-8 h-px bg-current" />
              </Link>
            </div>
          </>
        ) : null}

      </Container>
    </section>
  );
}
