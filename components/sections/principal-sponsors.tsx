"use client"

import React from "react"
import { useEffect, useMemo, useState } from "react"
import { Loader2 } from "lucide-react"
import Image from "next/image"

import { Section } from "@/components/section"

interface PrincipalSponsor {
  MalePrincipalSponsor: string
  FemalePrincipalSponsor: string
}

export function PrincipalSponsors() {
  // Helper component for elegant section titles
  const SectionTitle = ({
    children,
    align = "center",
    className = "",
  }: {
    children: React.ReactNode
    align?: "left" | "center" | "right"
    className?: string
  }) => {
    const textAlign =
      align === "right" ? "text-right" : align === "left" ? "text-left" : "text-center"
    return (
      <h3
        className={`text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-[family-name:var(--font-inter)] font-semibold uppercase text-white mb-2 sm:mb-3 md:mb-4 lg:mb-5 tracking-[0.25em] sm:tracking-[0.3em] md:tracking-[0.35em] ${textAlign} ${className}`}
      >
        {children}
      </h3>
    )
  }

  // Helper component for name items with alignment
  const NameItem = ({ name, align = "center" }: { name: string, align?: "left" | "center" | "right" }) => {
    const containerAlign =
      align === "right" ? "items-end" : align === "left" ? "items-start" : "items-center"
    const textAlign =
      align === "right" ? "text-right" : align === "left" ? "text-left" : "text-center"
    return (
      <div className={`flex flex-col ${containerAlign} justify-center py-1 sm:py-1.5 md:py-2 lg:py-2.5 w-full`}>
        <p
          className={`text-white text-xs sm:text-sm md:text-base lg:text-lg font-[family-name:var(--font-inter)] font-semibold tracking-wide leading-snug break-words ${textAlign}`}
        >
          {name}
        </p>
      </div>
    )
  }

  // Remote data state
  const [sponsors, setSponsors] = useState<PrincipalSponsor[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchSponsors = async () => {
    setIsLoading(true)
    try {
      const res = await fetch("/api/principal-sponsor", { cache: "no-store" })
      if (!res.ok) throw new Error("Failed to load principal sponsors")
      const data: PrincipalSponsor[] = await res.json()
      setSponsors(data)
    } catch (e: any) {
      console.error(e)
      setError(e?.message || "Failed to load principal sponsors")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchSponsors()
  }, [])

  // Keep sponsors as pairs to ensure alignment
  const sponsorPairs = useMemo(() => 
    sponsors.filter(s => s.MalePrincipalSponsor || s.FemalePrincipalSponsor),
    [sponsors]
  )

  return (
    <Section
      id="sponsors"
      className="relative overflow-hidden bg-[#1B0D05] py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28"
    >
      
      <div
        className="absolute inset-0 bg-cover bg-center opacity-60"
        style={{ backgroundImage: "url('/havana/woodbackground.png')" }}
        aria-hidden="true"
      />

      
      
      <div className="absolute inset-0 bg-gradient-to-b from-[#140A03]/95 via-[#1F1207]/90 to-[#120902]/95" aria-hidden="true" />

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
      
      {/* Section Header */}
      <div className="relative z-20 text-center mb-8 sm:mb-12 md:mb-16 lg:mb-20 px-3 sm:px-4 md:px-6">
        <p className="text-[0.65rem] sm:text-xs md:text-sm uppercase tracking-[0.25em] sm:tracking-[0.3em] md:tracking-[0.35em] text-[#FDDBB2]/70 mb-2 sm:mb-3 md:mb-4">Honor Guard</p>
        <h2 className="fugaz-one-regular text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-white mb-4 sm:mb-6 md:mb-8 uppercase tracking-[0.1em] sm:tracking-[0.12em] md:tracking-[0.15em]">
          Principal Sponsors
        </h2>

        <p className="text-sm sm:text-base md:text-lg lg:text-xl font-[family-name:var(--font-inter)] text-white/85 max-w-2xl mx-auto leading-relaxed tracking-wide px-2 sm:px-4">
          These beloved godparents surround Sinead with wisdom, blessing, and Havana-night sparkle as she makes her grand entrance.
        </p>
      </div>

      {/* Central Card Container */}
      <div className="relative z-20 max-w-5xl mx-auto px-2 sm:px-3 md:px-4 lg:px-6">
        {/* Main card with elegant styling */}
        <div className="relative group">
          <div className="absolute -inset-1 sm:-inset-2 rounded-2xl sm:rounded-[28px] md:rounded-[36px] bg-gradient-to-br from-[#FD9210]/25 via-transparent to-transparent blur-3xl opacity-70 group-hover:opacity-100 transition-opacity" />

          <div className="relative bg-white/5 backdrop-blur-2xl rounded-xl sm:rounded-2xl md:rounded-[28px] lg:rounded-[32px] border border-white/15 shadow-[0_35px_90px_rgba(0,0,0,0.65)] overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-px rounded-[calc(1rem-1px)] sm:rounded-[calc(1.5rem-1px)] md:rounded-[calc(1.75rem-1px)] lg:rounded-[30px] border border-white/10" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#FFFFFF0D,transparent_65%)]" />
            </div>

            <div className="relative p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 text-white">
              {isLoading ? (
                <div className="flex items-center justify-center py-12 sm:py-16 md:py-20 lg:py-24">
                  <div className="flex flex-col items-center gap-3 sm:gap-4">
                    <Loader2 className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 animate-spin text-[#FDDBB2]" />
                    <span className="text-white/80 font-[family-name:var(--font-inter)] text-sm sm:text-base md:text-lg tracking-[0.15em] sm:tracking-[0.2em] uppercase">
                      Loading sponsors...
                    </span>
                  </div>
                </div>
              ) : error ? (
                <div className="flex items-center justify-center py-12 sm:py-16 md:py-20 lg:py-24">
                  <div className="text-center px-2">
                    <p className="text-[#FFB4A2] font-[family-name:var(--font-inter)] text-sm sm:text-base md:text-lg mb-3 sm:mb-4">{error}</p>
                    <button
                      onClick={fetchSponsors}
                      className="text-white/80 hover:text-white font-[family-name:var(--font-inter)] underline transition-colors duration-300 text-xs sm:text-sm md:text-base"
                    >
                      Try again
                    </button>
                  </div>
                </div>
              ) : sponsorPairs.length === 0 ? (
                <div className="text-center py-12 sm:py-16 md:py-20 lg:py-24">
                  <p className="text-white/70 font-[family-name:var(--font-inter)] text-sm sm:text-base md:text-lg">No sponsors yet</p>
                </div>
              ) : (
                <div className="mb-4 sm:mb-5 md:mb-7 lg:mb-9 xl:mb-12">
                  <div className="grid grid-cols-1 min-[350px]:grid-cols-2 gap-x-2 sm:gap-x-3 md:gap-x-4 mb-2 sm:mb-2.5 md:mb-3.5 lg:mb-5">
                    <SectionTitle align="right" className="pr-2 sm:pr-3 md:pr-4 lg:pr-6">Male Principal Sponsors</SectionTitle>
                    <SectionTitle align="left" className="pl-2 sm:pl-3 md:pl-4 lg:pl-6">Female Principal Sponsors</SectionTitle>
                  </div>
                  <div className="grid grid-cols-1 min-[350px]:grid-cols-2 gap-x-2 sm:gap-x-3 md:gap-x-4 lg:gap-x-6 gap-y-1.5 sm:gap-y-2 md:gap-y-3 items-stretch">
                    {sponsorPairs.map((pair, idx) => (
                      <React.Fragment key={`sponsor-pair-${idx}`}>
                        <div key={`male-${idx}-${pair.MalePrincipalSponsor || 'empty'}`} className="px-2 sm:px-3 md:px-4 lg:px-6">
                          {pair.MalePrincipalSponsor ? (
                            <NameItem name={pair.MalePrincipalSponsor} align="right" />
                          ) : (
                            <div className="py-0.5 sm:py-1 md:py-1.5 lg:py-2" />
                          )}
                        </div>
                        <div key={`female-${idx}-${pair.FemalePrincipalSponsor || 'empty'}`} className="px-2 sm:px-3 md:px-4 lg:px-6">
                          {pair.FemalePrincipalSponsor ? (
                            <NameItem name={pair.FemalePrincipalSponsor} align="left" />
                          ) : (
                            <div className="py-0.5 sm:py-1 md:py-1.5 lg:py-2" />
                          )}
                        </div>
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
