"use client";

import { useState } from "react";
import { siteConfig } from "@/lib/content";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <Section className="bg-white">
      <Container>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12 sm:mb-16">
          <div>
            <p className="text-neutral-400 text-[11px] uppercase tracking-[0.25em] mb-4">FAQ</p>
            <h2 className="text-[2rem] sm:text-[2.625rem] lg:text-[3rem] font-semibold tracking-tighter leading-[1.1]">
              Common Questions
            </h2>
          </div>
        </div>

        <div className="divide-y divide-neutral-200">
          {siteConfig.faqs.map((faq, i) => {
            const btnId = `faq-btn-${i}`;
            const panelId = `faq-panel-${i}`;
            const isOpen = open === i;
            return (
              <div key={faq.question}>
                <button
                  id={btnId}
                  className={`w-full flex items-center justify-between text-left gap-8 group ${i === 0 ? "pb-5" : "py-5"}`}
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                >
                  <span className="text-[15px] font-medium text-neutral-900 leading-snug group-hover:text-neutral-700 transition-colors">
                    {faq.question}
                  </span>
                  <span
                    className="w-5 h-5 shrink-0 flex items-center justify-center border border-neutral-200 text-neutral-400 text-xs transition-transform duration-200"
                    style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </button>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={btnId}
                  className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="pb-5 text-neutral-500 text-[14px] leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-8 text-neutral-500 text-[14px]">
          Can&apos;t find what you&apos;re looking for?{" "}
          <a href="/contact" className="text-neutral-900 underline underline-offset-2 hover:no-underline">
            Send us a message.
          </a>
        </p>
      </Container>
    </Section>
  );
}
