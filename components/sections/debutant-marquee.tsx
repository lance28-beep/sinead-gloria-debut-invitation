"use client"

import Image from "next/image"
import { Section } from "@/components/section"

const DEBUTANT_IMAGES = [
  "/debutant/debutant (1).jpg",
  "/debutant/debutant (2).jpg",
  "/debutant/debutant (3).jpg",
  "/debutant/debutant (4).jpg",
]

export function DebutantMarquee() {
  // Duplicate images for seamless loop
  const marqueeImages = [...DEBUTANT_IMAGES, ...DEBUTANT_IMAGES]

  return (
    <Section
      id="debutant-marquee"
      className="relative overflow-hidden bg-[#1B0D05] py-4 sm:py-6 md:py-8"
    >
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{ backgroundImage: "url('/havana/woodbackground.png')" }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#1B0D05]/95 via-[#1B0D05]/90 to-[#1B0D05]/95" aria-hidden="true" />

      <div className="relative z-20 overflow-hidden">
        <div className="flex animate-marquee gap-2 sm:gap-3 md:gap-4 lg:gap-6 hover:[animation-play-state:paused]">
          {marqueeImages.map((src, index) => (
            <div
              key={`${src}-${index}`}
              className="flex-shrink-0 relative w-24 sm:w-32 md:w-40 lg:w-48 h-24 sm:h-32 md:h-40 lg:h-48 rounded-lg sm:rounded-xl overflow-hidden border border-white/20 shadow-lg"
            >
              <Image
                src={src}
                alt={`Debutant photo ${(index % DEBUTANT_IMAGES.length) + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 96px, (max-width: 768px) 128px, (max-width: 1024px) 160px, 192px"
              />
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}

