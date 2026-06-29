"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Stars, GoogleG } from "@/components/ui/Stars";

/** Plain, already-formatted card data passed down from the server component. */
export interface ReviewCardData {
  id: string;
  author: string;
  text: string;
  rating: number;
  meta: string | null;
  photoUrl: string | null;
}

const GAP_PX = 20; // matches gap-5

// Fallback avatar tints when a reviewer has no Google photo. Kept monochrome
// to match this template's neutral brand palette (see app/globals.css).
const AVATAR_COLORS = ["#171717", "#404040", "#525252", "#737373", "#262626"];

function Avatar({
  src,
  name,
  className = "w-10 h-10",
}: {
  src: string | null;
  name: string;
  className?: string;
}) {
  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt=""
        loading="lazy"
        referrerPolicy="no-referrer"
        className={cn("rounded-full object-cover shrink-0", className)}
      />
    );
  }
  let hash = 0;
  for (const ch of name) hash = (hash * 31 + ch.charCodeAt(0)) >>> 0;
  const color = AVATAR_COLORS[hash % AVATAR_COLORS.length];
  return (
    <div
      className={cn(
        "rounded-full shrink-0 flex items-center justify-center text-white font-semibold text-[13px]",
        className
      )}
      style={{ backgroundColor: color }}
      aria-hidden="true"
    >
      {name.trim().charAt(0).toUpperCase() || "?"}
    </div>
  );
}

export function ReviewsCarousel({ cards }: { cards: ReviewCardData[] }) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  // Which cards are visually truncated (measured, so "Read more" only shows
  // when there's genuinely more to read).
  const textRefs = useRef(new Map<string, HTMLElement>());
  const [truncated, setTruncated] = useState<Set<string>>(new Set());

  // Full review opens in a modal, so expanding never distorts the row.
  const [active, setActive] = useState<ReviewCardData | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  function updateArrows() {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 8);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  }

  function measureTruncation() {
    const next = new Set<string>();
    textRefs.current.forEach((el, id) => {
      if (el.scrollHeight - el.clientHeight > 1) next.add(id);
    });
    setTruncated(next);
  }

  useEffect(() => {
    const sync = () => {
      updateArrows();
      measureTruncation();
    };
    // Measure after paint (layout is settled), not synchronously in the effect.
    const raf = requestAnimationFrame(sync);
    window.addEventListener("resize", sync);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", sync);
    };
  }, [cards]);

  // Drive the native <dialog> from state.
  useEffect(() => {
    const d = dialogRef.current;
    if (active && d && !d.open) d.showModal();
  }, [active]);

  function scroll(direction: 1 | -1) {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const amount = card ? card.offsetWidth + GAP_PX : el.clientWidth * 0.8;
    el.scrollBy({ left: direction * amount, behavior: "smooth" });
  }

  return (
    <div className="relative">
      <ul
        ref={trackRef}
        onScroll={updateArrows}
        className="flex gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        aria-label="Customer reviews"
      >
        {cards.map((c) => (
          <li
            key={c.id}
            data-card
            className="snap-start flex-none w-[80%] sm:w-[46%] lg:w-[38%] bg-white p-8 lg:p-10 flex flex-col border border-neutral-200"
          >
            <div className="flex items-start justify-between gap-3 mb-6">
              <Stars rating={c.rating} />
              <GoogleG />
            </div>

            <blockquote
              ref={(el) => {
                if (el) textRefs.current.set(c.id, el);
                else textRefs.current.delete(c.id);
              }}
              className="text-neutral-700 text-[14px] sm:text-[15px] leading-relaxed line-clamp-6"
            >
              &ldquo;{c.text}&rdquo;
            </blockquote>

            {truncated.has(c.id) && (
              <div className="pt-4 pb-4">
                <button
                  type="button"
                  onClick={() => setActive(c)}
                  className="group inline-flex items-center gap-1.5 text-[13px] font-semibold text-brand hover:text-brand-hover transition-colors cursor-pointer"
                >
                  Read more
                  <svg
                    viewBox="0 0 24 24"
                    className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    aria-hidden="true"
                  >
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              </div>
            )}

            <div className="mt-auto pt-5 border-t border-neutral-100 flex items-center gap-3">
              <Avatar src={c.photoUrl} name={c.author} />
              <div>
                <p className="text-brand text-[13px] font-semibold">{c.author}</p>
                {c.meta && <p className="text-neutral-400 text-[12px] mt-0.5">{c.meta}</p>}
              </div>
            </div>
          </li>
        ))}
      </ul>

      <CarouselButton direction="prev" onClick={() => scroll(-1)} show={canPrev} />
      <CarouselButton direction="next" onClick={() => scroll(1)} show={canNext} />

      <ReviewDialog dialogRef={dialogRef} review={active} onClose={() => setActive(null)} />
    </div>
  );
}

function CarouselButton({
  direction,
  onClick,
  show,
}: {
  direction: "prev" | "next";
  onClick: () => void;
  show: boolean;
}) {
  const isPrev = direction === "prev";
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!show}
      aria-label={isPrev ? "Previous reviews" : "Next reviews"}
      className={cn(
        "hidden sm:flex absolute top-1/2 -translate-y-1/2 z-10 w-11 h-11 items-center justify-center",
        "rounded-full bg-white border border-neutral-200 shadow-md text-brand",
        "transition-opacity hover:bg-neutral-50 cursor-pointer",
        "disabled:opacity-0 disabled:pointer-events-none",
        isPrev ? "left-1 lg:-left-3" : "right-1 lg:-right-3"
      )}
    >
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        {isPrev ? <path d="M15 18l-6-6 6-6" /> : <path d="M9 18l6-6-6-6" />}
      </svg>
    </button>
  );
}

function ReviewDialog({
  dialogRef,
  review,
  onClose,
}: {
  dialogRef: React.RefObject<HTMLDialogElement | null>;
  review: ReviewCardData | null;
  onClose: () => void;
}) {
  const close = () => dialogRef.current?.close();

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      // Click on the backdrop (the dialog element itself, not the inner card) closes it.
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
      aria-label="Full review"
      className="m-auto max-w-none bg-transparent p-0 backdrop:bg-black/50"
    >
      {review && (
        <div className="w-[90vw] max-w-lg bg-white border border-neutral-200 p-8 lg:p-10 shadow-xl animate-fade-in">
          <div className="flex items-center gap-3 mb-5">
            <Avatar src={review.photoUrl} name={review.author} className="w-11 h-11" />
            <div className="flex-1 min-w-0">
              <p className="text-brand text-[14px] font-semibold">{review.author}</p>
              {review.meta && <p className="text-neutral-400 text-[12px] mt-0.5">{review.meta}</p>}
            </div>
            <GoogleG className="w-5 h-5" />
          </div>

          <Stars rating={review.rating} className="w-3.5 h-3.5" />

          <blockquote className="mt-5 text-neutral-700 text-[15px] leading-relaxed max-h-[60vh] overflow-y-auto">
            &ldquo;{review.text}&rdquo;
          </blockquote>

          <button
            type="button"
            onClick={close}
            className="mt-8 text-[13px] font-medium text-neutral-500 hover:text-brand transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      )}
    </dialog>
  );
}
