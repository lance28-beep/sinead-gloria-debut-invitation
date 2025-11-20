"use client"

import { useEffect, useMemo, useState } from "react"
import Image from "next/image"
import { Section } from "@/components/section"
import Counter from "@/components/Counter"

const EVENT_START = "2025-12-26T18:00:00+08:00"

type TimeBreakdown = {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function getTimeBreakdown(targetTime: number): TimeBreakdown {
  const now = Date.now()
  const clampedDiff = Math.max(targetTime - now, 0)
  const days = Math.floor(clampedDiff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((clampedDiff / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((clampedDiff / (1000 * 60)) % 60)
  const seconds = Math.floor((clampedDiff / 1000) % 60)
  return { days, hours, minutes, seconds }
}

export function Countdown() {
  const targetTime = useMemo(() => new Date(EVENT_START).getTime(), [])
  const [timeLeft, setTimeLeft] = useState<TimeBreakdown>(() => getTimeBreakdown(targetTime))

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeBreakdown(targetTime))
    }, 1000)
    return () => clearInterval(timer)
  }, [targetTime])

  const segments: { label: string; value: number; places: number[] }[] = [
    {
      label: "Days",
      value: timeLeft.days,
      places: [10, 1],
    },
    {
      label: "Hours",
      value: timeLeft.hours,
      places: [10, 1],
    },
    {
      label: "Minutes",
      value: timeLeft.minutes,
      places: [10, 1],
    },
    {
      label: "Seconds",
      value: timeLeft.seconds,
      places: [10, 1],
    },
  ]

  return (
    <Section
      id="countdown"
      className="relative overflow-hidden bg-[#3D2817]"
    >
      <>
        <div
          className="absolute inset-0 bg-cover bg-center opacity-60"
          style={{ backgroundImage: "url('/havana/woodbackground.png')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1B0D05]/95 via-[#3D2817]/85 to-[#1B0D05]/95" />

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

        <div className="relative z-20 text-center mb-8 sm:mb-12 md:mb-16 lg:mb-20 px-3 sm:px-4 md:px-6">
          <p className="text-[0.65rem] sm:text-xs md:text-sm uppercase tracking-[0.2em] sm:tracking-[0.25em] md:tracking-[0.3em] text-white/80 mb-2 sm:mb-3">
            Havana Lights Countdown
          </p>
          <h2 className="fugaz-one-regular text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-white tracking-[0.12em] sm:tracking-[0.15em] md:tracking-[0.18em] uppercase drop-shadow-[0_5px_15px_rgba(0,0,0,0.7)]">
            The Night ignites in
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/80 max-w-2xl mx-auto mt-3 sm:mt-4 leading-relaxed px-2">
            Every second brings us closer to Sinead's Havana Nights debut.
          </p>
        </div>

        <div className="relative z-20">
          <div className="relative z-20 max-w-3xl mx-auto bg-[#1B0D05]/70 border border-[#FD9210]/40 rounded-xl sm:rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-10 shadow-[0_15px_40px_rgba(0,0,0,0.65)] px-3 sm:px-4 md:px-6">
            <div className="flex items-center justify-center gap-1.5 sm:gap-2 md:gap-3 mb-4 sm:mb-5 md:mb-6 text-[#54A658] uppercase tracking-[0.25em] sm:tracking-[0.3em] md:tracking-[0.35em] text-[0.65rem] sm:text-xs md:text-sm">
              <span className="h-px w-6 sm:w-8 md:w-10 bg-[#54A658]/60" />
              Save the Date
              <span className="h-px w-6 sm:w-8 md:w-10 bg-[#54A658]/60" />
            </div>
            <div className="text-white text-center mb-6 sm:mb-8 md:mb-10">
              <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-[family-name:var(--font-ephesis)] drop-shadow-lg">
                December
              </p>
              <div className="flex items-center justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-12 mt-4 sm:mt-5 md:mt-6">
                <p className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-[family-name:var(--font-crimson)] text-[#FD9210] drop-shadow-[0_10px_25px_rgba(0,0,0,0.6)]">
                  26
                </p>
                <div className="w-0.5 h-16 sm:h-20 md:h-24 lg:h-28 bg-white/30" />
                <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-[family-name:var(--font-crimson)] text-white">
                  2025
                </p>
              </div>
              <p className="mt-4 sm:mt-5 md:mt-6 text-sm sm:text-base md:text-lg lg:text-xl tracking-[0.3em] sm:tracking-[0.35em] md:tracking-[0.4em] uppercase text-[#54A658]">
                6PM — 10PM
              </p>
            </div>
            <div className="mt-6 sm:mt-8 md:mt-10 lg:mt-12">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
                {segments.map(segment => (
                  <div
                    key={segment.label}
                    className="flex flex-col items-center gap-2 sm:gap-3 rounded-xl sm:rounded-2xl border border-white/15 bg-white/5 px-3 sm:px-4 py-3 sm:py-4 md:py-5 text-center shadow-[0_10px_25px_rgba(0,0,0,0.35)] backdrop-blur-sm"
                  >
                    <Counter
                      value={segment.value}
                      places={segment.places}
                      fontSize={36}
                      padding={6}
                      gap={12}
                      borderRadius={18}
                      horizontalPadding={12}
                      textColor="white"
                      fontWeight={800}
                      counterStyle={{
                        fontFamily: '"Stack Sans Text", sans-serif',
                        letterSpacing: "0.08em",
                        fontSize: "clamp(28px, 5vw, 48px)",
                      }}
                      gradientHeight={20}
                      gradientFrom="rgba(24,13,5,0.95)"
                      gradientTo="transparent"
                    />
                    <p className="text-[0.65rem] sm:text-xs md:text-sm uppercase tracking-[0.25em] sm:tracking-[0.3em] md:tracking-[0.35em] text-[#FD9210]/90">
                      {segment.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col items-center gap-1.5 sm:gap-2 text-white/80 uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[0.65rem] sm:text-xs md:text-sm mt-4 sm:mt-5 md:mt-6">
              <span>Grandballroom Hall</span>
              <span>Sugarland Hotel</span>
            </div>
          </div>
        </div>
      </>
    </Section>
  )
}
