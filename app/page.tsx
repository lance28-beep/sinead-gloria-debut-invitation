"use client"

import dynamic from "next/dynamic"
import Image from "next/image"
import { Hero } from "@/components/sections/hero"
import { Countdown } from "@/components/sections/countdown"
import { DebutantMarquee } from "@/components/sections/debutant-marquee"
import { Messages } from "@/components/sections/messages"
import { Details } from "@/components/sections/details"
import { Entourage } from "@/components/sections/entourage"
// import { PrincipalSponsors } from "@/components/sections/principal-sponsors"
import { BookOfGuests } from "@/components/sections/book-of-guests"
import { FAQ } from "@/components/sections/faq"
import { SnapShare } from "@/components/sections/snap-share"
import { Footer } from "@/components/sections/footer"
import BackgroundMusic from "@/components/background-music"
import { Section } from "@/components/section"

const GuestList = dynamic(() => import("@/components/sections/guest-list").then(mod => ({ default: mod.GuestList })), { ssr: false })

export default function Home() {
  const enableDecor = process.env.NEXT_PUBLIC_ENABLE_DECOR !== 'false'

  return (
    <main className="relative">
      {enableDecor && <BackgroundMusic />}
      {/* Content */}
      <div className="relative z-10">
        <Hero />
        <Countdown />
        <DebutantMarquee />
        {/* Gallery Image Section */}
        <Section id="gallery-image" className="relative bg-[#1B0D05] py-6 sm:py-8 md:py-10">
          <div className="relative w-full flex justify-center px-4">
            <div className="relative w-full max-w-full sm:max-w-md md:max-w-lg lg:max-w-xl aspect-auto">
              <Image
                src="/gallery/image.png"
                alt="Gallery image"
                width={800}
                height={600}
                className="w-full h-auto object-contain rounded-lg shadow-2xl"
                priority
              />
            </div>
          </div>
        </Section>
        <Messages />
        <Details />
        <Entourage />
        {/* <PrincipalSponsors /> */}
        <GuestList />
        <BookOfGuests />
        <FAQ />
        <SnapShare />
        <Footer />
      </div>
    </main>
  )
}
