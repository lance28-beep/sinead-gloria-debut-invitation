"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Section } from "@/components/section";

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: "When and where is the celebration?",
    answer:
      "Join us for this special Havana nights celebration on Thursday, December 26, 2025, at 6:00 PM at the Grandballroom Hall, Sugarland Hotel, located at Araneta Street, Barangay Singcang, Bacolod City, Negros Occidental. The event will run until 10:00 PM.",
  },
  {
    question: "When is the RSVP deadline?",
    answer:
      "Please confirm your attendance by January 14, 2026. We have reserved seats for you and would love to celebrate this special moment with you! Your response helps us finalize our guest list and seating arrangements for the celebration.\n\nFor any questions or concerns, please contact us at: 09088993835 / 09453324669\n\n[RSVP_LINK]Click here to RSVP[/RSVP_LINK]",
  },
  {
    question: "Can I bring a plus one?",
    answer:
      "We kindly ask that any additional guests be included or declared in your RSVP so we can make the proper arrangements. Thank you so much for your understanding — we can't wait to celebrate this magical Havana nights celebration with you!",
  },
  {
    question: "What if I have dietary restrictions or allergies?",
    answer:
      "Please mention any dietary restrictions, allergies, or special meal requirements in the message field when you submit your RSVP. We want to ensure everyone enjoys the celebration comfortably!",
  },
  {
    question: "Is there parking available?",
    answer:
      "Yes! Sugarland Hotel has ample parking facilities. We recommend arriving 15-20 minutes early to secure a spot and get settled comfortably before the celebration begins.",
  },
  {
    question: "How do I get to the venue?",
    answer:
      "Sugarland Hotel is located at Araneta Street, Barangay Singcang, Bacolod City, Negros Occidental. You can use the 'Get Directions' button in the Event Details section to open Google Maps for easy navigation to the venue.",
  },
  {
    question: "What should I do if I need to cancel my RSVP?",
    answer:
      "Please contact us as soon as possible if your plans change. You can update your RSVP by searching for your name in the RSVP section. We understand that plans can change, and we appreciate your timely communication.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Section
      id="faq"
      className="relative bg-[#1B0D05] py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28 overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-cover bg-center opacity-60"
        style={{ backgroundImage: "url('/havana/woodbackground.png')" }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#140A03]/95 via-[#1F1207]/90 to-[#120902]/95" aria-hidden="true" />
      
      {/* Section Header */}
      <div className="relative z-10 text-center mb-8 sm:mb-12 md:mb-16 lg:mb-20 px-3 sm:px-4 md:px-6">
        <p className="text-[0.65rem] sm:text-xs md:text-sm uppercase tracking-[0.25em] sm:tracking-[0.3em] md:tracking-[0.35em] text-[#FDDBB2]/70 mb-2 sm:mb-3 md:mb-4">Got Questions?</p>
        <h2 className="fugaz-one-regular text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-white mb-4 sm:mb-6 md:mb-8 uppercase tracking-[0.1em] sm:tracking-[0.12em] md:tracking-[0.15em]">
          Frequently Asked Questions
        </h2>

        <p className="text-sm sm:text-base md:text-lg lg:text-xl font-[family-name:var(--font-inter)] text-white/85 max-w-2xl mx-auto leading-relaxed tracking-wide px-2 sm:px-4">
          Everything you need to know about our Havana nights celebration. We're here to help make your experience as smooth and enjoyable as possible.
        </p>
      </div>

      {/* FAQ content */}
      <div className="relative z-10 max-w-4xl mx-auto px-2 sm:px-3 md:px-4 lg:px-6">
        {/* Main card */}
        <div className="relative group">
          <div className="absolute -inset-1 sm:-inset-2 rounded-2xl sm:rounded-[28px] md:rounded-[36px] bg-gradient-to-br from-[#FD9210]/25 via-transparent to-transparent blur-3xl opacity-70 group-hover:opacity-100 transition-opacity" />

          <div className="relative bg-white/5 backdrop-blur-2xl rounded-xl sm:rounded-2xl md:rounded-[28px] lg:rounded-[32px] border border-white/15 shadow-[0_35px_90px_rgba(0,0,0,0.65)] overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-px rounded-[calc(1rem-1px)] sm:rounded-[calc(1.5rem-1px)] md:rounded-[calc(1.75rem-1px)] lg:rounded-[30px] border border-white/10" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#FFFFFF0D,transparent_65%)]" />
            </div>

            {/* FAQ items */}
            <div className="relative p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 space-y-2.5 sm:space-y-3 md:space-y-4">
              {faqItems.map((item, index) => {
                const isOpen = openIndex === index;
                const contentId = `faq-item-${index}`;
                return (
                  <div
                    key={index}
                    className="rounded-lg sm:rounded-xl border border-white/15 bg-white/5 backdrop-blur-sm hover:bg-white/8 transition-all duration-300 hover:shadow-md hover:border-white/25 overflow-hidden"
                  >
                    <button
                      onClick={() => toggleItem(index)}
                      className="group w-full px-3 sm:px-4 md:px-5 lg:px-6 py-3 sm:py-4 md:py-5 flex items-center justify-between text-left outline-none focus-visible:ring-2 focus-visible:ring-[#FDDBB2]/50 focus-visible:ring-offset-2 transition-colors"
                      aria-expanded={isOpen}
                      aria-controls={contentId}
                    >
                      <span className="font-[family-name:var(--font-inter)] font-semibold text-white pr-3 sm:pr-4 text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed group-hover:text-[#FDDBB2] transition-colors duration-200">
                        {item.question}
                      </span>
                      <ChevronDown
                        size={18}
                        className={`text-[#FDDBB2] flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""} w-4 h-4 sm:w-5 sm:h-5`}
                        aria-hidden
                      />
                    </button>

                    <div
                      id={contentId}
                      role="region"
                      className={`grid transition-all duration-300 ease-out ${
                        isOpen
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="px-3 sm:px-4 md:px-5 lg:px-6 py-2.5 sm:py-3 md:py-4 lg:py-5 bg-white/5 backdrop-blur-sm border-t border-white/15">
                          {item.answer.includes("[RSVP_LINK]") ? (
                            <p className="text-white/85 leading-relaxed text-xs sm:text-sm md:text-base lg:text-lg font-[family-name:var(--font-inter)] whitespace-pre-line">
                              {item.answer.split("[RSVP_LINK]")[0]}
                              <a
                                href="#guest-list"
                                className="text-[#FDDBB2] underline font-semibold hover:text-[#FDDBB2]/80 transition-colors"
                                onClick={(e) => {
                                  e.preventDefault();
                                  document
                                    .getElementById("guest-list")
                                    ?.scrollIntoView({ behavior: "smooth" });
                                }}
                              >
                                {
                                  item.answer.match(
                                    /\[RSVP_LINK\](.*?)\[\/RSVP_LINK\]/,
                                  )?.[1]
                                }
                              </a>
                              {item.answer.split("[/RSVP_LINK]")[1]}
                            </p>
                          ) : (
                            <p className="text-white/85 leading-relaxed text-xs sm:text-sm md:text-base lg:text-lg font-[family-name:var(--font-inter)] whitespace-pre-line">
                              {item.answer}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
