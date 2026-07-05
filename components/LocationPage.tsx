import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/content";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

// ── Types ────────────────────────────────────────────────────────────────────
// Location / service-area SEO pages: "<serviceNoun> in <City>" (serviceNoun is
// set in lib/content.ts). Brochure-native design (no portfolio). To add a
// location: add a LocationData object to lib/locations.ts + a matching
// app/<slug>/page.tsx (3 lines).
export interface TwoLineHeading {
  line1: string;
  line2: string;
}
export interface LocationFaq {
  question: string;
  answer: string;
}
export interface AreaServed {
  type: "City" | "AdministrativeArea" | "State";
  name: string;
}
export interface AreaCard {
  name: string;
  slug: string; // path without leading slash
}
export interface CopyOverride {
  title?: string;
  body?: string;
}

export interface LocationData {
  slug: string;
  city: string;
  title: string;
  description: string;
  ogAlt?: string;
  hero: { intro: string; trustSignal: string };
  positioning: { eyebrow: string; heading: TwoLineHeading; body: string[] };
  whyIntro?: string;
  valueProps?: Record<string, CopyOverride>;
  processIntro: string;
  credibilityLocation: { value: string; label: string };
  serving: { eyebrow: string; heading: TwoLineHeading; body: string[]; industries: string[] };
  areas: { intro: string; cards: AreaCard[] };
  faq: { intro: string; items: LocationFaq[] };
  cta: { body: string; label: string };
  schema: { description: string; areaServed: AreaServed[]; knowsAbout: string[] };
}

// ── Shared constants ─────────────────────────────────────────────────────────
const DEFAULT_WHY_INTRO =
  "We're a local team that shows up on time, does the job right, and stands behind the work. No surprises, no runaround — just honest, reliable service.";

const DEFAULT_VALUE_PROPS = [
  { num: "01", title: "Licensed & insured.", body: "Fully licensed and insured for your protection and peace of mind — every job, every time. You're covered from the first call to the final walkthrough." },
  { num: "02", title: "Upfront, honest pricing.", body: "Clear, written quotes before we start. No hidden fees, no surprise charges — you'll always know exactly what you're paying and why." },
  { num: "03", title: "On time, every time.", body: "We respect your schedule. When we book a window, we show up in it — and we keep you posted if anything changes." },
  { num: "04", title: "Quality workmanship.", body: "We do the job properly the first time, with quality materials and real craftsmanship. Work that lasts, backed by a guarantee." },
  { num: "05", title: "Clean & respectful.", body: "We treat your home like our own — drop cloths down, boots off, and a tidy worksite left cleaner than we found it." },
  { num: "06", title: "Local & reliable.", body: "We live and work in this community. Our reputation is built on referrals from neighbours, so every job matters to us." },
];

const DEFAULT_PROCESS_STEPS = [
  { step: "01", title: "Get in touch", description: "Call or send a message. We'll ask the right questions and, for most jobs, book a visit or give you a ballpark on the spot." },
  { step: "02", title: "Free estimate", description: "We assess the work and give you a clear, written quote — no obligation, no pressure, no surprises down the line." },
  { step: "03", title: "The work", description: "We show up on time and do the job right, keeping your home clean and keeping you informed the whole way through." },
  { step: "04", title: "Stand behind it", description: "We make sure you're happy and back our work with a guarantee. Need us again? We're one call away." },
];

const DEFAULT_CREDIBILITY = [
  { value: "Licensed", label: "& Insured" },
  { value: "Free", label: "Estimates" },
  { value: "Local", label: "& Trusted" },
];

// ── Metadata + schema ────────────────────────────────────────────────────────
export function buildLocationMetadata(data: LocationData): Metadata {
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
      images: [{ url: siteConfig.seo.ogImage, width: 1200, height: 630, alt: data.ogAlt ?? `${siteConfig.name} — ${siteConfig.serviceNoun} ${data.city}` }],
    },
    twitter: { card: "summary_large_image", title: ogTitle, description: data.description, images: [siteConfig.seo.ogImage] },
  };
}

function buildSchemas(data: LocationData) {
  const url = `${siteConfig.seo.siteUrl}/${data.slug}`;
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${url}#business`,
    name: siteConfig.name,
    description: data.schema.description,
    url,
    telephone: siteConfig.phone ?? undefined,
    email: siteConfig.email,
    image: `${siteConfig.seo.siteUrl}${siteConfig.seo.ogImage}`,
    priceRange: "$$",
    address: { "@type": "PostalAddress", addressRegion: "Ontario", addressCountry: "CA" },
    areaServed: data.schema.areaServed.map((a) => ({ "@type": a.type, name: a.name, addressCountry: "CA" })),
    knowsAbout: data.schema.knowsAbout,
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: data.faq.items.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })),
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.seo.siteUrl },
      { "@type": "ListItem", position: 2, name: `${siteConfig.serviceNoun} ${data.city}`, item: url },
    ],
  };
  return { localBusinessSchema, faqSchema, breadcrumbSchema };
}

// ── Helpers ──────────────────────────────────────────────────────────────────
function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="text-neutral-500 text-[11px] uppercase tracking-[0.25em] mb-5">{children}</p>;
}
function Heading2({ h, dark }: { h: TwoLineHeading; dark?: boolean }) {
  return (
    <h2 className={`text-[2rem] sm:text-[2.5rem] lg:text-[2.75rem] font-semibold tracking-tighter leading-[1.08] ${dark ? "text-white" : "text-neutral-950"}`}>
      {h.line1} <span className={dark ? "text-neutral-400" : "text-neutral-400"}>{h.line2}</span>
    </h2>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────
export function LocationPage({ data }: { data: LocationData }) {
  const valueProps = DEFAULT_VALUE_PROPS.map((vp) => ({ ...vp, ...(data.valueProps?.[vp.num] ?? {}) }));
  const credibilityStats = [...DEFAULT_CREDIBILITY, data.credibilityLocation];
  const areaCards = data.areas.cards.map((c) => ({ name: c.name, href: `/${c.slug}`, active: c.slug === data.slug }));
  const whyIntro = data.whyIntro ?? DEFAULT_WHY_INTRO;
  const { localBusinessSchema, faqSchema, breadcrumbSchema } = buildSchemas(data);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="bg-neutral-950 text-white pt-32 pb-16 lg:pt-[8.5rem] lg:pb-20">
        <Container>
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 flex-wrap text-[11px] uppercase tracking-[0.2em]">
              <li><Link href="/" className="text-neutral-500 hover:text-neutral-300 transition-colors">Home</Link></li>
              <li className="text-neutral-700" aria-hidden="true">/</li>
              <li><span className="text-neutral-400" aria-current="page">{siteConfig.serviceNoun} {data.city}</span></li>
            </ol>
          </nav>
          <div className="max-w-3xl">
            <Eyebrow>{data.city}</Eyebrow>
            <h1 className="text-[2.5rem] sm:text-[3.25rem] lg:text-[4rem] font-semibold tracking-tighter leading-[1.05]">
              {siteConfig.serviceNoun} in {data.city}
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

      {/* ── LOCAL POSITIONING ────────────────────────────────── */}
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
                <Link href="/services" className="text-brand text-sm font-medium hover:underline underline-offset-4">Our services →</Link>
                <Link href="/contact" className="text-brand text-sm font-medium hover:underline underline-offset-4">Get a free estimate →</Link>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ── WHY CHOOSE US ────────────────────────────────────── */}
      <Section className="bg-neutral-50 border-y border-neutral-200/70">
        <Container>
          <div className="max-w-2xl mb-14">
            <Eyebrow>Why {siteConfig.name}</Eyebrow>
            <Heading2 h={{ line1: "Work you can", line2: "count on." }} />
            <p className="text-neutral-600 text-[15px] leading-relaxed font-light mt-5">{whyIntro}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-10">
            {valueProps.map((vp) => (
              <div key={vp.num}>
                <p className="text-neutral-400 text-[11px] uppercase tracking-[0.25em] tabular-nums mb-3">{vp.num}</p>
                <h3 className="text-lg font-semibold tracking-tight text-neutral-950 mb-2">{vp.title}</h3>
                <p className="text-neutral-600 text-[14px] leading-relaxed font-light">{vp.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── CREDIBILITY STATS ────────────────────────────────── */}
      <section className="bg-brand text-white">
        <Container>
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/10">
            {credibilityStats.map((stat) => (
              <div key={stat.label} className="py-10 lg:py-14 px-6 lg:px-8">
                <p className="text-[1.5rem] lg:text-[2rem] font-semibold tracking-tighter leading-none mb-2">{stat.value}</p>
                <p className="text-neutral-400 text-[11px] uppercase tracking-[0.2em]">{stat.label}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── PROCESS ──────────────────────────────────────────── */}
      <Section>
        <Container>
          <div className="max-w-2xl mb-14">
            <Eyebrow>How It Works</Eyebrow>
            <Heading2 h={{ line1: "Simple, honest,", line2: "start to finish." }} />
            <p className="text-neutral-600 text-[15px] leading-relaxed font-light mt-5">{data.processIntro}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-10">
            {DEFAULT_PROCESS_STEPS.map((step) => (
              <div key={step.step} className="border-t border-neutral-200 pt-5">
                <p className="text-brand text-[11px] uppercase tracking-[0.25em] font-medium mb-4">{step.step}</p>
                <h3 className="text-lg font-semibold tracking-tight text-neutral-950 mb-2">{step.title}</h3>
                <p className="text-neutral-600 text-[14px] leading-relaxed font-light">{step.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── SERVING + INDUSTRIES ─────────────────────────────── */}
      <Section className="bg-neutral-50 border-y border-neutral-200/70">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-20 items-start">
            <div>
              <Eyebrow>{data.serving.eyebrow}</Eyebrow>
              <Heading2 h={data.serving.heading} />
            </div>
            <div>
              <div className="space-y-5">
                {data.serving.body.map((para, i) => (
                  <p key={i} className="text-neutral-600 text-[15px] leading-relaxed font-light">{para}</p>
                ))}
              </div>
              <div className="mt-8">
                <p className="text-neutral-500 text-[11px] uppercase tracking-[0.25em] mb-4">What We Do</p>
                <ul className="grid grid-cols-2 gap-x-8 gap-y-2.5">
                  {data.serving.industries.map((industry) => (
                    <li key={industry} className="flex items-center gap-3 text-neutral-700 text-[14px]">
                      <span className="w-1 h-1 rounded-full bg-brand shrink-0" />
                      {industry}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ── AREAS WE SERVE ───────────────────────────────────── */}
      <Section id="areas">
        <Container>
          <div className="max-w-2xl mb-10">
            <Eyebrow>Service Area</Eyebrow>
            <Heading2 h={{ line1: "Areas", line2: "we serve." }} />
            <p className="text-neutral-600 text-[15px] leading-relaxed font-light mt-5">{data.areas.intro}</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4">
            {areaCards.map((area) => (
              <Link
                key={area.name}
                href={area.href}
                aria-current={area.active ? "page" : undefined}
                className={`group block p-6 border transition-colors duration-200 ${area.active ? "border-brand bg-neutral-950 text-white" : "border-neutral-200 bg-white hover:border-neutral-400"}`}
              >
                <p className={`font-semibold tracking-tight mb-2 ${area.active ? "text-white" : "text-neutral-950"}`}>{area.name}</p>
                <span className={`text-[11px] uppercase tracking-[0.18em] ${area.active ? "text-neutral-400" : "text-neutral-400 group-hover:text-neutral-600"}`}>
                  {area.active ? "This Page" : siteConfig.serviceNoun}
                </span>
              </Link>
            ))}
          </div>
          <p className="text-neutral-500 text-[14px] leading-relaxed font-light mt-8 max-w-lg">
            Don&apos;t see your area? We cover the surrounding communities too.{" "}
            <Link href="/contact" className="text-brand font-medium hover:underline underline-offset-4">Get in touch</Link> and ask.
          </p>
        </Container>
      </Section>

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <Section className="bg-neutral-50 border-y border-neutral-200/70">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-20">
            <div>
              <Eyebrow>Common Questions</Eyebrow>
              <Heading2 h={{ line1: "Questions,", line2: "answered." }} />
              <p className="text-neutral-600 text-[15px] leading-relaxed font-light mt-5">{data.faq.intro}</p>
              <div className="mt-8 flex flex-col gap-3">
                <Link href="/services" className="text-brand text-sm font-medium hover:underline underline-offset-4">See all services →</Link>
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
