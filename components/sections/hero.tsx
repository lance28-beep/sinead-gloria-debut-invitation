"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Section } from "@/components/section"

const clamp = (value: number, max: number) => Math.min(value, max)

export function Hero() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    let frame: number

    const handleScroll = () => {
      frame = requestAnimationFrame(() => setScrollY(window.scrollY))
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const limitedScroll = clamp(scrollY, 800)
  const topLeftOffset = clamp(limitedScroll * 0.2, 200)
  const topRightOffset = clamp(limitedScroll * 0.2, 200)
  const bottomLeftOffset = clamp(limitedScroll * 0.18, 180)
  const bottomRightOffset = clamp(limitedScroll * 0.25, 240)

  return (
    <Section id="hero" className="relative min-h-screen flex items-center justify-center py-16 sm:py-20 md:py-24 lg:py-28 bg-[#3D2817] overflow-hidden">
      {/* Wood background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none"
        style={{
          backgroundImage: "url('/havana/woodbackground.png')",
        }}
      />

      {/* Wooden texture overlay */}
      <div className="absolute inset-0 opacity-40 pointer-events-none" style={{ 
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.3'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat'
      }} />

      {/* String lights at top */}
      {/* <div className="absolute top-0 left-0 right-0 h-16 sm:h-20 md:h-24 pointer-events-none z-20">
        <div className="flex justify-around items-start h-full px-4">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="flex flex-col items-center animate-pulse" style={{ animationDelay: `${i * 0.2}s`, animationDuration: '2s' }}>
              <div className="w-0.5 h-4 sm:h-6 bg-gray-600/50" />
              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-b from-yellow-200 to-yellow-100 shadow-lg shadow-yellow-400/50" />
            </div>
          ))}
        </div>
      </div> */}

      {/* Photo leaf asset top-left */}
      <div
        className="absolute top-0 left-0 pointer-events-none z-[15] w-[200px] sm:w-[440px] md:w-[600px] lg:w-[720px] h-[200px] sm:h-[440px] md:h-[600px] lg:h-[720px]"
        style={{ transform: `scaleX(-1) translateX(${topLeftOffset}px)` }}
      >
        <Image
          src="/havana/leaft-top-right%20.png"
          alt="Tropical leaf top left"
          fill
          className="object-contain object-left-top"
          priority
        />
      </div>

      {/* Photo leaf asset top-right */}
      <div
        className="absolute top-0 right-0 pointer-events-none z-[15] w-[200px] sm:w-[440px] md:w-[600px] lg:w-[720px] h-[200px] sm:h-[440px] md:h-[600px] lg:h-[720px]"
        style={{ transform: `translateX(${topRightOffset}px)` }}
      >
        <Image
          src="/havana/leaft-top-right%20.png"
          alt="Tropical leaf top right"
          fill
          className="object-contain object-right-top"
          priority
        />
      </div>

      
      {/* Photo leaf asset bottom-left */}
      <div
        className="absolute bottom-0 left-0 pointer-events-none z-30 w-[220px] sm:w-[300px] md:w-[420px] lg:w-[520px] xl:w-[600px] h-[260px] sm:h-[350px] md:h-[460px] lg:h-[560px] xl:h-[620px]"
        style={{ transform: `translateY(${bottomLeftOffset}px)` }}
      >
        <Image
          src="/havana/leaf-left_bottom%20corner.png"
          alt="Large tropical leaf"
          fill
          className="object-contain object-left-bottom"
          priority
        />
      </div>
      <div
        className="absolute bottom-0 right-0 md:-right-6 lg:-right-10 xl:-right-16 pointer-events-none z-30 w-[220px] sm:w-[300px] md:w-[420px] lg:w-[520px] xl:w-[640px] h-[260px] sm:h-[350px] md:h-[460px] lg:h-[560px] xl:h-[680px]"
        style={{ transform: `scaleX(-1) translateY(${bottomRightOffset}px)` }}
      >
        <Image
          src="/havana/leaf-left_bottom%20corner.png"
          alt="Large tropical leaf mirrored"
          fill
          className="object-contain object-right-bottom"
          priority
        />
      </div>

      {/* Hill asset bottom-right */}
      <div
        className="absolute bottom-0 right-0 pointer-events-none z-[15] w-[200px] sm:w-[300px] md:w-[400px] lg:w-[500px] h-[150px] sm:h-[220px] md:h-[300px] lg:h-[380px]"
        style={{ transform: `translateY(${bottomRightOffset * 0.8}px)` }}
      >
        <Image
          src="/havana/hill3.png"
          alt="Hill decoration bottom right"
          fill
          className="object-contain object-right-bottom"
          priority
        />
      </div>

      {/* Hill asset bottom-left */}
      <div
        className="absolute bottom-0 left-0 pointer-events-none z-[15] w-[200px] sm:w-[300px] md:w-[400px] lg:w-[500px] h-[150px] sm:h-[220px] md:h-[300px] lg:h-[380px]"
        style={{ transform: `translateY(${bottomLeftOffset * 0.8}px)` }}
      >
        <Image
          src="/havana/hill4.png"
          alt="Hill decoration bottom left"
          fill
          className="object-contain object-left-bottom"
          priority
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* JOIN US FOR A ONE HOT */}
        <div className="relative z-[20] mb-6 sm:mb-8">
          <p className="text-xs sm:text-sm md:text-base lg:text-lg font-[family-name:var(--font-crimson)] font-semibold text-white uppercase tracking-[0.25em] sm:tracking-[0.3em] drop-shadow-lg">
            Join us for a one hot
          </p>
        </div>

        {/* HAVANA - Marquee Light Bulb Style */}
        <div className="mb-3 sm:mb-4">
          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-[family-name:var(--font-crimson)] font-black text-transparent uppercase tracking-[0.05em] sm:tracking-[0.08em] leading-none select-none"
              style={{
                WebkitTextStroke: '2px #D2691E',
                textShadow: `
                  0 0 10px rgba(255, 165, 0, 0.8),
                  0 0 20px rgba(255, 140, 0, 0.6),
                  0 0 30px rgba(255, 165, 0, 0.4),
                  0 0 40px rgba(255, 140, 0, 0.3),
                  inset 0 0 10px rgba(255, 165, 0, 0.5)
                `,
                background: 'linear-gradient(180deg, #FFB84D 0%, #FF8C00 50%, #D2691E 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.5))'
              }}>
            HAVANA
          </h1>
          {/* Light bulbs effect around letters */}
          <div className="flex justify-center gap-1 sm:gap-2 mt-2">
            {[...Array(7)].map((_, i) => (
              <div key={i} className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-400 animate-pulse" 
                   style={{ animationDelay: `${i * 0.15}s`, animationDuration: '1.5s' }} />
            ))}
          </div>
        </div>

        {/* nights - Script style */}
        <div className="mb-8 sm:mb-10 md:mb-12">
          <p className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-[family-name:var(--font-ephesis)] text-white drop-shadow-2xl" 
             style={{ textShadow: '3px 3px 6px rgba(0, 0, 0, 0.7)' }}>
            nights
          </p>
        </div>

        {/* TO CELEBRATE */}
        <div className="mb-6 sm:mb-8">
          <p className="text-sm sm:text-base md:text-lg lg:text-xl font-[family-name:var(--font-crimson)] font-normal text-white uppercase tracking-[0.2em] sm:tracking-[0.25em] drop-shadow-lg">
            To celebrate
          </p>
        </div>

        {/* Debutante Name - Script style */}
        <div className="mb-10 sm:mb-12 md:mb-14">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-[family-name:var(--font-ephesis)] text-white mb-4 sm:mb-6 drop-shadow-2xl" 
              style={{ textShadow: '3px 3px 6px rgba(0, 0, 0, 0.7)' }}>
            Sinead Gloria L. Heussaf
          </h2>
          <p className="windsong-regular text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white drop-shadow-2xl" 
             style={{ textShadow: '3px 3px 6px rgba(0, 0, 0, 0.7)' }}>
            is turning 18
          </p>
        </div>

        {/* Event Details */}
        <div className="relative max-w-2xl mx-auto">
          {/* Date with divider */}
          <div className="mb-6 sm:mb-8">
            <p className="text-sm sm:text-base md:text-lg font-[family-name:var(--font-crimson)] font-normal text-white uppercase tracking-[0.2em] drop-shadow-lg mb-3">
              December
            </p>
            <div className="flex items-center justify-center gap-4 sm:gap-6 mb-3">
              <div className="h-px w-12 sm:w-16 bg-white/40" />
              <p className="text-4xl sm:text-5xl md:text-6xl font-[family-name:var(--font-crimson)] font-bold text-white drop-shadow-lg">
                26th
              </p>
              <div className="h-px w-12 sm:w-16 bg-white/40" />
            </div>
            <p className="text-sm sm:text-base md:text-lg font-[family-name:var(--font-crimson)] font-normal text-white uppercase tracking-[0.2em] drop-shadow-lg">
              at 6:00 PM
            </p>
          </div>

          {/* Venue */}
          <div className="mb-8 sm:mb-10">
            <p className="text-lg sm:text-xl md:text-2xl font-[family-name:var(--font-crimson)] font-semibold text-white tracking-wide drop-shadow-lg">
              Grandballroom Hall, Sugarland Hotel
            </p>
          </div>
        </div>

        {/* RSVP CTA */}
        <div className="mt-12 sm:mt-14 md:mt-16">
          <a
            href="#guest-list"
            className="inline-block px-8 sm:px-10 md:px-12 py-3 sm:py-4 md:py-5 bg-gradient-to-r from-[#D2691E] to-[#FF8C00] hover:from-[#FF8C00] hover:to-[#FFB84D] text-white font-[family-name:var(--font-crimson)] font-semibold text-base sm:text-lg md:text-xl uppercase tracking-wider rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 drop-shadow-lg"
            style={{
              boxShadow: '0 4px 15px rgba(255, 140, 0, 0.4), 0 0 20px rgba(255, 165, 0, 0.2)'
            }}
          >
            RSVP
          </a>
        </div>
      </div>
    </Section>
  )
}

