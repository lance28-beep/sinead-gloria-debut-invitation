"use client"

import Image from "next/image"

import { Section } from "@/components/section"

const EVENT_FACTS = [
  { label: "Event Type", value: "debut" },
  { label: "Event Date", value: "December 26, 2025" },
  { label: "Event Time", value: "6:00 PM – 10:00 PM" },
  { label: "Venue", value: "Grandballroom Hall, Sugarland Hotel" },
  {
    label: "Address",
    value: "Araneta Street, Barangay Singcang, Bacolod City, Negros Occidental",
  },
]

const GOOGLE_MAPS_LINK = "https://maps.app.goo.gl/9oJ6E3zMbykQD1zD6"

export function Details() {
  return (
    <Section id="details" className="relative overflow-hidden bg-[#1B0D05] py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28">
      <div
        className="absolute inset-0 opacity-50 bg-cover bg-center"
        style={{ backgroundImage: "url('/havana/woodbackground.png')" }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#120902]/95 via-[#1C0D05]/90 to-[#120902]/95" aria-hidden="true" />

              {/* Photo leaf asset top-right */}
              <div
          className="absolute top-0 right-0 pointer-events-none z-[5] w-[450px] sm:w-[440px] md:w-[600px] lg:w-[720px] h-[450px] sm:h-[440px] md:h-[600px] lg:h-[720px]"
        >
          <Image
            src="/havana/leaf.png"
            alt="Tropical leaf top right"
            fill
            className="object-contain object-right-top"
            priority
          />
        </div>

        {/* Photo leaf asset top-left */}
        <div
          className="absolute top-0 left-0 pointer-events-none z-[5] w-[450px] sm:w-[440px] md:w-[600px] lg:w-[720px] h-[450px] sm:h-[440px] md:h-[600px] lg:h-[720px]"
          style={{ transform: "scaleX(-1)" }}
        >
          <Image
            src="/havana/leaf.png"
            alt="Tropical leaf top left"
            fill
            className="object-contain object-left-top"
            priority
          />
        </div>

        {/* Hill asset bottom-right (behind hill3) */}
        <div
          className="absolute bottom-0 right-0 pointer-events-none z-[1] w-[300px] sm:w-[400px] md:w-[500px] lg:w-[600px] h-[200px] sm:h-[250px] md:h-[300px] lg:h-[350px]"
        >
          <Image
            src="/havana/hill5.png"
            alt="Hill bottom right background"
            fill
            className="object-contain object-right-bottom"
            priority
          />
        </div>

        {/* Hill asset bottom-right */}
        <div
          className="absolute bottom-0 right-0 pointer-events-none z-[15] w-[300px] sm:w-[400px] md:w-[500px] lg:w-[600px] h-[200px] sm:h-[250px] md:h-[300px] lg:h-[350px]"
        >
          <Image
            src="/havana/hill3.png"
            alt="Hill bottom right"
            fill
            className="object-contain object-right-bottom"
            priority
          />
        </div>

        {/* Hill asset bottom-left */}
        <div
          className="absolute bottom-0 left-0 pointer-events-none z-[15] w-[300px] sm:w-[400px] md:w-[500px] lg:w-[600px] h-[200px] sm:h-[250px] md:h-[300px] lg:h-[350px]"
        >
          <Image
            src="/havana/hill4.png"
            alt="Hill bottom left"
            fill
            className="object-contain object-left-bottom"
            priority
          />
        </div>
      <div className="relative z-20 max-w-5xl mx-auto px-3 sm:px-4 md:px-6">
        <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-14">
          <p className="text-[0.65rem] sm:text-xs md:text-sm uppercase tracking-[0.25em] sm:tracking-[0.3em] md:tracking-[0.35em] text-[#FDDBB2]/70">venue + schedule</p>
          <h2 className="fugaz-one-regular text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-white mt-2 sm:mt-3 tracking-[0.1em] sm:tracking-[0.12em] uppercase">
            Event Details
          </h2>
        </div>

        <div className="grid gap-6 sm:gap-8 md:grid-cols-2 md:gap-10 items-stretch">
          <div className="relative rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden border border-white/15 shadow-[0_25px_60px_rgba(0,0,0,0.6)] min-h-[200px] sm:min-h-[260px] md:min-h-[360px]">
            <Image
              src="/gallery/granballroom.png"
              alt="Grandballroom Hall, Sugarland Hotel"
              width={900}
              height={900}
              className="h-full w-full object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-4 sm:bottom-5 md:bottom-6 left-4 sm:left-5 md:left-6 right-4 sm:right-5 md:right-6 text-white">
              <p className="text-xs sm:text-sm uppercase tracking-[0.25em] sm:tracking-[0.3em] md:tracking-[0.35em] text-[#FDDBB2]/80">Sugarland Hotel</p>
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-[family-name:var(--font-crimson)] tracking-[0.08em]">
                Grandballroom Hall
              </p>
            </div>
          </div>

          <div className="rounded-xl sm:rounded-2xl md:rounded-3xl border border-white/12 bg-white/5 backdrop-blur-lg p-4 sm:p-5 md:p-6 lg:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.45)] flex flex-col gap-4 sm:gap-5 md:gap-6">
            <div className="space-y-3 sm:space-y-4 md:space-y-5">
              {EVENT_FACTS.map(fact => (
                <div key={fact.label} className="border-b border-white/10 pb-3 sm:pb-4 last:border-0 last:pb-0">
                  <p className="text-[0.65rem] sm:text-xs uppercase tracking-[0.25em] sm:tracking-[0.3em] md:tracking-[0.35em] text-[#FDDBB2]/70">{fact.label}</p>
                  <p className="mt-1 sm:mt-1.5 text-sm sm:text-base md:text-lg lg:text-xl text-white font-[family-name:var(--font-inter)] leading-snug">
                    {fact.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
              <button
                onClick={() => window.open(GOOGLE_MAPS_LINK, "_blank", "noopener,noreferrer")}
                className="flex items-center justify-center gap-1.5 sm:gap-2 rounded-full border border-white/35 py-2 sm:py-2.5 text-[0.65rem] sm:text-xs md:text-sm font-[family-name:var(--font-inter)] font-semibold uppercase tracking-[0.2em] sm:tracking-[0.25em] text-white/90 transition-colors hover:bg-white/10"
              >
                <svg className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#FDDBB2]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 10.5c0 7.7-9 12.5-9 12.5S3 18.2 3 10.5a9 9 0 1 1 18 0Zm-9 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                  />
                </svg>
                Google Maps
              </button>
              <button
                onClick={() => navigator.clipboard.writeText(EVENT_FACTS[3].value + ", " + EVENT_FACTS[4].value)}
                className="flex items-center justify-center gap-1.5 sm:gap-2 rounded-full border border-white/35 py-2 sm:py-2.5 text-[0.65rem] sm:text-xs md:text-sm font-[family-name:var(--font-inter)] font-semibold uppercase tracking-[0.2em] sm:tracking-[0.25em] text-white/90 transition-colors hover:bg-white/10"
              >
                <svg className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#FDDBB2]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="9" y="9" width="13" height="13" rx="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
                Copy Address
              </button>
            </div>
          </div>
        </div>

        {/* Dress Code Section */}
        <div className="mt-12 sm:mt-14 md:mt-16 lg:mt-20">
          <div className="text-center mb-6 sm:mb-8 md:mb-10">
            <h3 className="fugaz-one-regular text-lg sm:text-xl md:text-2xl lg:text-3xl text-white tracking-[0.08em] sm:tracking-[0.1em] uppercase">
              Dress Code: Noche de Havana
            </h3>
          </div>
          
          <div className="grid gap-6 sm:gap-8 md:grid-cols-2 md:gap-10 items-stretch">
            {/* Dress Code Info */}
            <div className="rounded-xl sm:rounded-2xl md:rounded-3xl border border-white/12 bg-white/5 backdrop-blur-lg p-4 sm:p-5 md:p-6 lg:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.45)] flex flex-col gap-4 sm:gap-5 md:gap-6">
              <div className="space-y-4 sm:space-y-5 md:space-y-6">
                <div className="border-b border-white/10 pb-4 sm:pb-5">
                  <p className="text-[0.65rem] sm:text-xs uppercase tracking-[0.25em] sm:tracking-[0.3em] md:tracking-[0.35em] text-[#FDDBB2]/70 mb-2 sm:mb-3">Female</p>
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white font-[family-name:var(--font-inter)] leading-snug">
                    Flowy outfits, warm hues, tropical chic
                  </p>
                </div>
                <div className="pb-0">
                  <p className="text-[0.65rem] sm:text-xs uppercase tracking-[0.25em] sm:tracking-[0.3em] md:tracking-[0.35em] text-[#FDDBB2]/70 mb-2 sm:mb-3">Male</p>
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white font-[family-name:var(--font-inter)] leading-snug">
                    Simple linen top, earth-tone bottoms, clean casual shoes
                  </p>
                </div>
              </div>
            </div>

            {/* Attire Guidelines Image */}
            <div className="relative rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden border border-white/15 shadow-[0_25px_60px_rgba(0,0,0,0.6)] min-h-[200px] sm:min-h-[260px] md:min-h-[360px]">
              <Image
                src="/gallery/attire guidelines.png"
                alt="Attire Guidelines"
                width={900}
                height={900}
                className="h-full w-full object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}

