"use client";

import Image from "next/image";
import { useState } from "react";
import type { BeholdPost } from "@/types";

const PAGE_SIZE = 9;

interface InstagramGridProps {
  posts: BeholdPost[];
}

export function InstagramGrid({ posts }: InstagramGridProps) {
  const [visible, setVisible] = useState(PAGE_SIZE);
  const shown = posts.slice(0, visible);

  // 4-image repeating pattern: positions 0 and 3 = wide, 1 and 2 = portrait
  const isWide = (i: number) => i % 4 === 0 || i % 4 === 3;

  return (
    <div>
      {/* Mobile: 2-column grid */}
      <div className="grid grid-cols-2 gap-3 md:hidden">
        {shown.map((post) => (
          <a
            key={post.id}
            href={post.permalink}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative aspect-square overflow-hidden rounded-lg bg-neutral-100"
          >
            <Image
              src={post.sizes.medium.mediaUrl}
              alt={post.caption?.slice(0, 80) ?? ""}
              fill
              className="object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out"
              sizes="50vw"
            />
          </a>
        ))}
      </div>

      {/* Desktop: asymmetric repeating grid */}
      <div className="hidden md:grid grid-cols-4 auto-rows-[300px] lg:auto-rows-[340px] gap-4 lg:gap-5">
        {shown.map((post, i) => (
          <a
            key={post.id}
            href={post.permalink}
            target="_blank"
            rel="noopener noreferrer"
            className={`group relative overflow-hidden rounded-lg bg-neutral-100 ${
              isWide(i) ? "col-span-2" : "col-span-1"
            }`}
          >
            <Image
              src={post.sizes.medium.mediaUrl}
              alt={post.caption?.slice(0, 80) ?? ""}
              fill
              className="object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out"
              sizes={isWide(i) ? "50vw" : "25vw"}
            />
          </a>
        ))}
      </div>

      {visible < posts.length && (
        <div className="mt-12 text-center">
          <button
            onClick={() => setVisible((v) => v + PAGE_SIZE)}
            className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.18em] text-neutral-500 hover:text-neutral-900 transition-colors duration-300"
          >
            Load More
            <span className="block w-8 h-px bg-current" />
          </button>
        </div>
      )}
    </div>
  );
}
