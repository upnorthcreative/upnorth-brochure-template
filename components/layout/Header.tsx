"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/content";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = useState(pathname);
  const headerRef = useRef<HTMLElement>(null);

  // Reset mobile menu on navigation (render-phase derived state)
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMobileOpen(false);
  }

  useEffect(() => {
    const header = headerRef.current;
    let ticking = false;

    const update = () => {
      const y = window.scrollY;
      if (header) {
        const progress = Math.min(y / 80, 1);
        header.style.backgroundColor = `rgba(255,255,255,${progress * 0.95})`;
        header.style.borderBottomColor = `rgba(212,212,212,${progress * 0.8})`;
      }
      setScrolled(y > 50);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Backdrop — z-40 so header (z-50) sits above it, page content sits below */}
      <div
        className={`fixed inset-x-0 bottom-0 top-[72px] z-40 bg-neutral-950/50 md:hidden transition-opacity duration-300 ${
          mobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />

      <header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-50 border-b"
        style={{
          backgroundColor: "rgba(255,255,255,0)",
          borderBottomColor: "rgba(212,212,212,0)",
        }}
      >
      <Container>
        <div className="flex h-[72px] items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className={`text-[15px] font-semibold tracking-tight transition-colors duration-300 hover:opacity-70 ${
              scrolled ? "text-neutral-950" : "text-white"
            }`}
          >
            {siteConfig.name}
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {siteConfig.nav.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-[13px] transition-colors duration-300 relative pb-px after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:transition-opacity after:duration-200 ${
                    scrolled
                      ? isActive
                        ? "text-neutral-950 font-medium after:bg-neutral-950 after:opacity-100"
                        : "text-neutral-500 hover:text-neutral-950 after:bg-neutral-300 after:opacity-0 hover:after:opacity-100"
                      : isActive
                        ? "text-white font-medium after:bg-white after:opacity-100"
                        : "text-white/60 hover:text-white after:bg-white/50 after:opacity-0 hover:after:opacity-100"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Button
              href={siteConfig.hero.cta.href}
              size="sm"
              variant={scrolled ? "primary" : "secondary"}
            >
              {siteConfig.hero.cta.label}
            </Button>
          </div>

          {/* Mobile menu toggle */}
          <button
            className={`md:hidden -mr-1 p-2.5 cursor-pointer transition-colors duration-300 ${
              scrolled
                ? "text-neutral-500 hover:text-neutral-950"
                : "text-white/80 hover:text-white"
            }`}
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </Container>

      {/* Mobile nav — slides down */}
      <div
        className={`md:hidden overflow-hidden transition-[max-height] duration-300 ease-in-out ${
          mobileOpen ? "max-h-[400px]" : "max-h-0"
        }`}
      >
        <div className="border-t border-neutral-200 bg-white">
          <Container>
            <nav className="flex flex-col py-6 gap-1">
              {siteConfig.nav.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`text-[15px] transition-colors py-2.5 border-b border-neutral-100 last:border-0 ${
                      isActive
                        ? "text-neutral-950 font-medium"
                        : "text-neutral-500 hover:text-neutral-950"
                    }`}
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <div className="pt-4">
                <Button href={siteConfig.hero.cta.href} size="sm" className="w-full">
                  {siteConfig.hero.cta.label}
                </Button>
              </div>
            </nav>
          </Container>
        </div>
      </div>
    </header>
    </>
  );
}
