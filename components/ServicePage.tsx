import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/content";
import { businessRef } from "@/lib/schema";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

// ── Types ────────────────────────────────────────────────────────────────────
// Service landing pages — one per specific service, optionally targeted to a
// city ("Furnace Repair in Maplewood"). Brochure-native design (no portfolio).
// To add one: add a ServiceData object to lib/services.ts + a matching
// app/<slug>/page.tsx (3 lines).
export interface TwoLineHeading {
  line1: string;
  line2: string;
}
export interface ServiceFaq {
  question: string;
  answer: string;
}
export interface PainPoint {
  problem: string;
  solution: string;
}
export interface ValueProp {
  title: string;
  body: string;
}
export interface LinkCard {
  name: string;
  slug: string; // path without leading slash
}

export interface ServiceData {
  slug: string; // "emergency-plumbing" or "furnace-repair-maplewood"
  service: string;
  city?: string; // optional — set for service-in-city pages
  breadcrumb: string;
  h1: TwoLineHeading;
  title: string;
  description: string;
  ogAlt?: string;
  hero: { eyebrow: string; intro: string; trustSignal: string };
  positioning: { eyebrow: string; heading: TwoLineHeading; body: string[] };
  painPoints: { eyebrow: string; heading: TwoLineHeading; items: PainPoint[] };
  /** Client-defined selling points for THIS service (3–6). */
  valueProps: ValueProp[];
  valuePropsHeading?: TwoLineHeading;
  valuePropsIntro?: string;
  processIntro: string;
  faq: { intro: string; items: ServiceFaq[] };
  related: { heading: string; intro: string; services?: LinkCard[]; locations?: LinkCard[] };
  cta: { body: string; label: string };
  schema: { serviceType: string; description: string };
}

const DEFAULT_PROCESS_STEPS = [
  { step: "01", title: "Get in touch", description: "Call or send a message. We'll ask the right questions and, for most jobs, book a visit or give you a ballpark on the spot." },
  { step: "02", title: "Free estimate", description: "We assess the work and give you a clear, written quote — no obligation, no pressure, no surprises." },
  { step: "03", title: "The work", description: "We show up on time and do the job right, keeping your home clean and keeping you informed." },
  { step: "04", title: "Stand behind it", description: "We make sure you're happy and back our work with a guarantee. Need us again? We're one call away." },
];

// ── Metadata + schema ────────────────────────────────────────────────────────
export function buildServiceMetadata(data: ServiceData): Metadata {
  const url = `${siteConfig.seo.siteUrl}/${data.slug}`;
  const ogTitle = `${data.title} | ${siteConfig.name}`;
  return {
    title: data.title,
    description: data.description,
    alternates: { canonical: url },
    openGraph: {
      title: ogTitle,
      description: data.description,
      url,
      siteName: siteConfig.name,
      locale: siteConfig.ogLocale,
      type: "website",
      images: [{ url: siteConfig.seo.ogImage, width: 1200, height: 630, alt: data.ogAlt ?? `${data.title} — ${siteConfig.name}` }],
    },
    twitter: { card: "summary_large_image", title: ogTitle, description: data.description, images: [siteConfig.seo.ogImage] },
  };
}

function buildSchemas(data: ServiceData) {
  const url = `${siteConfig.seo.siteUrl}/${data.slug}`;
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name: data.title,
    serviceType: data.schema.serviceType,
    description: data.schema.description,
    url,
    provider: businessRef,
    ...(data.city ? { areaServed: { "@type": "City", name: data.city, addressCountry: "CA" } } : {}),
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: data.faq.items.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.seo.siteUrl },
      { "@type": "ListItem", position: 2, name: "Services", item: `${siteConfig.seo.siteUrl}/services` },
      { "@type": "ListItem", position: 3, name: data.breadcrumb, item: url },
    ],
  };
  return { serviceSchema, faqSchema, breadcrumbSchema };
}

// ── Helpers ──────────────────────────────────────────────────────────────────
function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="text-neutral-500 text-[11px] uppercase tracking-[0.25em] mb-5">{children}</p>;
}
function Heading2({ h }: { h: TwoLineHeading }) {
  return (
    <h2 className="text-[2rem] sm:text-[2.5rem] lg:text-[2.75rem] font-semibold tracking-tighter leading-[1.08] text-neutral-950">
      {h.line1} <span className="text-neutral-400">{h.line2}</span>
    </h2>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────
export function ServicePage({ data }: { data: ServiceData }) {
  const { serviceSchema, faqSchema, breadcrumbSchema } = buildSchemas(data);
  const hasRelated = (data.related.services?.length || 0) + (data.related.locations?.length || 0) > 0;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="bg-neutral-950 text-white pt-32 pb-16 lg:pt-[8.5rem] lg:pb-20">
        <Container>
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 flex-wrap text-[11px] uppercase tracking-[0.2em]">
              <li><Link href="/" className="text-neutral-500 hover:text-neutral-300 transition-colors">Home</Link></li>
              <li className="text-neutral-700" aria-hidden="true">/</li>
              <li><Link href="/services" className="text-neutral-500 hover:text-neutral-300 transition-colors">Services</Link></li>
              <li className="text-neutral-700" aria-hidden="true">/</li>
              <li><span className="text-neutral-400" aria-current="page">{data.breadcrumb}</span></li>
            </ol>
          </nav>
          <div className="max-w-3xl">
            <Eyebrow>{data.hero.eyebrow}</Eyebrow>
            <h1 className="text-[2.5rem] sm:text-[3.25rem] lg:text-[4rem] font-semibold tracking-tighter leading-[1.05]">
              {data.h1.line1} {data.h1.line2}
            </h1>
            <p className="mt-6 text-neutral-400 text-[15px] sm:text-[17px] leading-relaxed font-light max-w-2xl">{data.hero.intro}</p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Button href="/contact" variant="secondary" size="lg">Get a Free Estimate</Button>
              {siteConfig.phone && (
                <Button href={siteConfig.phoneHref ?? `tel:${siteConfig.phone}`} variant="outline-dark" size="lg">
                  Call {siteConfig.phone}
                </Button>
              )}
            </div>
            <p className="mt-7 flex items-center gap-3 text-neutral-500 text-[11px] uppercase tracking-[0.18em]">
              <span className="w-1.5 h-1.5 rounded-full bg-white/40 shrink-0" />
              {data.hero.trustSignal}
            </p>
          </div>
        </Container>
      </section>

      {/* ── POSITIONING ──────────────────────────────────────── */}
      <Section>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-10 lg:gap-20 items-start">
            <div>
              <Eyebrow>{data.positioning.eyebrow}</Eyebrow>
              <Heading2 h={data.positioning.heading} />
            </div>
            <div>
              {data.positioning.body.map((para, i) => (
                <p key={i} className={`text-neutral-600 text-[15px] leading-relaxed font-light${i > 0 ? " mt-5" : ""}`}>{para}</p>
              ))}
              <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
                <Link href="/services" className="text-brand text-sm font-medium hover:underline underline-offset-4">All services →</Link>
                <Link href="/contact" className="text-brand text-sm font-medium hover:underline underline-offset-4">Get a free estimate →</Link>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ── PAIN POINTS → SOLUTIONS ──────────────────────────── */}
      <Section className="bg-neutral-50 border-y border-neutral-200/70">
        <Container>
          <div className="max-w-2xl mb-14">
            <Eyebrow>{data.painPoints.eyebrow}</Eyebrow>
            <Heading2 h={data.painPoints.heading} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
            {data.painPoints.items.map((p, i) => (
              <div key={i} className="border-t border-neutral-200 pt-6">
                <p className="text-neutral-500 text-[10px] uppercase tracking-[0.25em] mb-2">The problem</p>
                <p className="text-[17px] font-semibold tracking-tight text-neutral-950 leading-snug mb-4">{p.problem}</p>
                <p className="text-brand text-[10px] uppercase tracking-[0.25em] font-medium mb-2">How we help</p>
                <p className="text-neutral-600 text-[14px] leading-relaxed font-light">{p.solution}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── VALUE PROPS (client-defined) ─────────────────────── */}
      <Section>
        <Container>
          <div className="max-w-2xl mb-14">
            <Eyebrow>Why {siteConfig.name}</Eyebrow>
            {data.valuePropsHeading ? <Heading2 h={data.valuePropsHeading} /> : <Heading2 h={{ line1: "The right team", line2: "for the job." }} />}
            {data.valuePropsIntro && <p className="text-neutral-600 text-[15px] leading-relaxed font-light mt-5">{data.valuePropsIntro}</p>}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-10">
            {data.valueProps.map((vp, i) => (
              <div key={vp.title}>
                <p className="text-neutral-400 text-[11px] uppercase tracking-[0.25em] tabular-nums mb-3">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="text-lg font-semibold tracking-tight text-neutral-950 mb-2">{vp.title}</h3>
                <p className="text-neutral-600 text-[14px] leading-relaxed font-light">{vp.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── PROCESS ──────────────────────────────────────────── */}
      <Section className="bg-brand text-white">
        <Container>
          <div className="max-w-2xl mb-14">
            <p className="text-neutral-500 text-[11px] uppercase tracking-[0.25em] mb-5">How It Works</p>
            <h2 className="text-[2rem] sm:text-[2.5rem] lg:text-[2.75rem] font-semibold tracking-tighter leading-[1.08] text-white">
              Simple, honest, <span className="text-neutral-400">start to finish.</span>
            </h2>
            <p className="text-neutral-400 text-[15px] leading-relaxed font-light mt-5">{data.processIntro}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-10">
            {DEFAULT_PROCESS_STEPS.map((step) => (
              <div key={step.step} className="border-t border-white/15 pt-5">
                <p className="text-white/60 text-[11px] uppercase tracking-[0.25em] font-medium mb-4">{step.step}</p>
                <h3 className="text-lg font-semibold tracking-tight text-white mb-2">{step.title}</h3>
                <p className="text-neutral-400 text-[14px] leading-relaxed font-light">{step.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <Section>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-20">
            <div>
              <Eyebrow>Common Questions</Eyebrow>
              <Heading2 h={{ line1: "Questions,", line2: "answered." }} />
              <p className="text-neutral-600 text-[15px] leading-relaxed font-light mt-5">{data.faq.intro}</p>
              <div className="mt-8 flex flex-col gap-3">
                <Link href="/services" className="text-brand text-sm font-medium hover:underline underline-offset-4">All services →</Link>
                <Link href="/contact" className="text-brand text-sm font-medium hover:underline underline-offset-4">Ask a question →</Link>
              </div>
            </div>
            <div className="border-t border-neutral-200">
              {data.faq.items.map((faq) => (
                <div key={faq.question} className="py-7 border-b border-neutral-200">
                  <h3 className="text-[17px] font-semibold tracking-tight text-neutral-950 mb-2">{faq.question}</h3>
                  <p className="text-neutral-600 text-[14px] leading-relaxed font-light">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* ── RELATED ──────────────────────────────────────────── */}
      {hasRelated && (
        <Section className="bg-neutral-50 border-y border-neutral-200/70">
          <Container>
            <div className="max-w-2xl mb-10">
              <Eyebrow>Explore More</Eyebrow>
              <Heading2 h={{ line1: data.related.heading, line2: "" }} />
              <p className="text-neutral-600 text-[15px] leading-relaxed font-light mt-5">{data.related.intro}</p>
            </div>
            {data.related.services && data.related.services.length > 0 && (
              <div className="mb-8">
                <p className="text-neutral-500 text-[11px] uppercase tracking-[0.25em] mb-4">Other Services</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4">
                  {data.related.services.map((s) => (
                    <Link key={s.slug} href={`/${s.slug}`} className="group block p-5 border border-neutral-200 bg-white hover:border-neutral-400 transition-colors duration-200">
                      <p className="font-semibold tracking-tight text-neutral-950 mb-1">{s.name}</p>
                      <span className="text-[11px] uppercase tracking-[0.18em] text-neutral-400 group-hover:text-neutral-600">View →</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
            {data.related.locations && data.related.locations.length > 0 && (
              <div>
                <p className="text-neutral-500 text-[11px] uppercase tracking-[0.25em] mb-4">Areas We Serve</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4">
                  {data.related.locations.map((c) => (
                    <Link key={c.slug} href={`/${c.slug}`} className="group block p-5 border border-neutral-200 bg-white hover:border-neutral-400 transition-colors duration-200">
                      <p className="font-semibold tracking-tight text-neutral-950 mb-1">{c.name}</p>
                      <span className="text-[11px] uppercase tracking-[0.18em] text-neutral-400 group-hover:text-neutral-600">{siteConfig.serviceNoun} →</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </Container>
        </Section>
      )}

      {/* ── FINAL CTA ────────────────────────────────────────── */}
      <section className="bg-brand text-white py-20 lg:py-28">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <p className="text-neutral-500 text-[11px] uppercase tracking-[0.25em] mb-5">{data.cta.label}</p>
              <h2 className="text-[2rem] sm:text-[2.75rem] lg:text-[3.25rem] font-semibold tracking-tighter leading-[1.05]">
                Ready to get started?
              </h2>
            </div>
            <div className="lg:justify-self-end lg:text-right">
              <p className="text-neutral-400 text-[15px] leading-relaxed font-light mb-8 max-w-sm lg:ml-auto">{data.cta.body}</p>
              <div className="flex flex-col sm:flex-row gap-4 lg:justify-end">
                <Button href="/contact" variant="secondary" size="lg">Get a Free Estimate</Button>
                {siteConfig.phone && (
                  <Button href={siteConfig.phoneHref ?? `tel:${siteConfig.phone}`} variant="outline-dark" size="lg">
                    Call {siteConfig.phone}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
