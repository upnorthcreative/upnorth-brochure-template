"use client";

import { useMemo, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { siteConfig } from "@/lib/content";
import type { BeholdPost } from "@/lib/instagram";

const MAX_POSTS = 25;

interface PostWithMeta extends BeholdPost {
  animDelay: number;
  globalIndex: number;
}

function distributeColumns(posts: BeholdPost[], numCols: number): PostWithMeta[][] {
  const columns: PostWithMeta[][] = Array.from({ length: numCols }, () => []);
  const heights = new Array(numCols).fill(0);

  posts.forEach((post, i) => {
    const ratio = post.sizes.medium.height / post.sizes.medium.width;
    const col = heights.indexOf(Math.min(...heights));
    columns[col].push({ ...post, animDelay: i * 35, globalIndex: i });
    heights[col] += ratio;
  });

  return columns;
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

interface InstagramGridProps {
  posts: BeholdPost[];
  filter?: (post: BeholdPost) => boolean;
  showFollowLink?: boolean;
}

export function InstagramGrid({ posts, filter, showFollowLink = true }: InstagramGridProps) {
  const shown = useMemo(
    () => (filter ? posts.filter(filter) : posts).slice(0, MAX_POSTS),
    [posts, filter]
  );
  const { social } = siteConfig;

  const [numCols, setNumCols] = useState(3);

  useEffect(() => {
    const update = () => setNumCols(window.innerWidth >= 768 ? 3 : 2);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const columns = useMemo(
    () => distributeColumns(shown, numCols),
    [shown, numCols]
  );

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const isOpen = lightboxIndex !== null;
  const currentPost = isOpen && lightboxIndex !== null ? shown[lightboxIndex] : null;

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const prevImage = useCallback(() => {
    setLightboxIndex((i) => (i !== null ? (i - 1 + shown.length) % shown.length : null));
  }, [shown.length]);

  const nextImage = useCallback(() => {
    setLightboxIndex((i) => (i !== null ? (i + 1) % shown.length : null));
  }, [shown.length]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape")     closeLightbox();
      if (e.key === "ArrowLeft")  prevImage();
      if (e.key === "ArrowRight") nextImage();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, closeLightbox, prevImage, nextImage]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      <style>{`
        @keyframes ig-reveal {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .ig-item {
          display: block;
          overflow: hidden;
          opacity: 0;
          animation: ig-reveal 0.75s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        @keyframes lb-fade {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes lb-img-enter {
          from { opacity: 0; transform: scale(0.97); }
          to   { opacity: 1; transform: scale(1); }
        }
        .lb-overlay { animation: lb-fade 0.25s ease-out forwards; }
        .lb-img     { animation: lb-img-enter 0.35s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
        @media (prefers-reduced-motion: reduce) {
          .ig-item    { opacity: 1; animation: none; }
          .lb-overlay { animation: none; }
          .lb-img     { animation: none; }
        }
      `}</style>

      {/* Masonry grid */}
      <div className="flex">
        {columns.map((col, colIndex) => (
          <div key={colIndex} className="flex-1 flex flex-col">
            {col.map((post, i) => {
              const isLast = i === col.length - 1;
              return (
                <button
                  key={post.id}
                  onClick={() => setLightboxIndex(post.globalIndex)}
                  className={`ig-item group relative overflow-hidden cursor-pointer w-full text-left${isLast ? " flex-1" : ""}`}
                  style={{ animationDelay: `${post.animDelay}ms` }}
                  aria-label={post.caption?.slice(0, 80) ?? "Gallery image"}
                >
                  <Image
                    src={post.sizes.medium.mediaUrl}
                    alt={post.caption?.slice(0, 80) ?? ""}
                    width={post.sizes.medium.width}
                    height={post.sizes.medium.height}
                    className={`w-full block transition-transform duration-700 ease-out group-hover:scale-[1.04]${
                      isLast ? " h-full object-cover" : " h-auto"
                    }`}
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-neutral-950/0 group-hover:bg-neutral-950/10 transition-colors duration-500 pointer-events-none flex flex-col items-center justify-center gap-2.5">
                    <InstagramIcon className="w-[18px] h-[18px] text-white opacity-0 group-hover:opacity-90 transition-all duration-500 translate-y-1.5 group-hover:translate-y-0" />
                    <span className="text-[8px] tracking-[0.22em] uppercase text-white opacity-0 group-hover:opacity-80 transition-all duration-500 delay-75 translate-y-1.5 group-hover:translate-y-0">
                      View on Instagram
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Follow link */}
      {showFollowLink && social.instagram && (
        <div className="mt-16 text-center">
          <a
            href={social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-4 text-[10px] tracking-[0.2em] uppercase text-neutral-400 hover:text-neutral-900 transition-colors duration-500"
          >
            Follow us on Instagram
            <span className="block w-10 h-px bg-current" />
          </a>
        </div>
      )}

      {/* Lightbox */}
      {isOpen && currentPost && (
        <div
          className="lb-overlay fixed inset-0 z-50 bg-neutral-950/96 flex items-center justify-center"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
        >
          <button
            onClick={closeLightbox}
            className="absolute top-5 right-5 lg:top-7 lg:right-7 text-white/40 hover:text-white transition-colors duration-200 z-10"
            aria-label="Close lightbox"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
              <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" />
            </svg>
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors duration-200 z-10 p-2"
            aria-label="Previous image"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6 lg:w-7 lg:h-7">
              <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div
            className="relative flex items-center justify-center px-16 lg:px-24"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              key={`lb-${lightboxIndex}`}
              src={currentPost.sizes.medium.mediaUrl}
              alt={currentPost.caption?.slice(0, 80) ?? ""}
              width={currentPost.sizes.medium.width}
              height={currentPost.sizes.medium.height}
              className="lb-img block object-contain"
              style={{ maxWidth: "82vw", maxHeight: "78vh", width: "auto", height: "auto" }}
              priority
            />
          </div>

          <button
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors duration-200 z-10 p-2"
            aria-label="Next image"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6 lg:w-7 lg:h-7">
              <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div
            className="absolute bottom-7 inset-x-0 flex justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <a
              href={currentPost.permalink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 text-[9px] tracking-[0.2em] uppercase text-white/30 hover:text-white/70 transition-colors duration-200"
            >
              View Original on Instagram
              <span className="block w-8 h-px bg-current" />
            </a>
          </div>
        </div>
      )}
    </>
  );
}
