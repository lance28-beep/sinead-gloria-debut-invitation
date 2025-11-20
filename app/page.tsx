"use client"

import dynamic from "next/dynamic"
import { Hero } from "@/components/sections/hero"
import { Countdown } from "@/components/sections/countdown"
import { Messages } from "@/components/sections/messages"
import { Details } from "@/components/sections/details"
import { Entourage } from "@/components/sections/entourage"
import { PrincipalSponsors } from "@/components/sections/principal-sponsors"
import { BookOfGuests } from "@/components/sections/book-of-guests"
import { FAQ } from "@/components/sections/faq"
import { SnapShare } from "@/components/sections/snap-share"
import { Footer } from "@/components/sections/footer"
import BackgroundMusic from "@/components/background-music"

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
        <Messages />
        <Details />
        <Entourage />
        <PrincipalSponsors />
        <GuestList />
        <BookOfGuests />
        <FAQ />
        <SnapShare />
        <Footer />
      </div>
    </main>
  )
}
