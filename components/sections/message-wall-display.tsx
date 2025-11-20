"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Heart, MessageCircle, Sparkles } from "lucide-react"
import { useState, useEffect } from "react"

interface Message {
  timestamp: string
  name: string
  message: string
}

interface MessageWallDisplayProps {
  messages: Message[]
  loading: boolean
}

export default function MessageWallDisplay({ messages, loading }: MessageWallDisplayProps) {
  const [visibleMessages, setVisibleMessages] = useState<Message[]>([])
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (messages.length > 0) {
      setIsAnimating(true)
      // Stagger the animation of messages
      const timer = setTimeout(() => {
        setVisibleMessages(messages)
        setIsAnimating(false)
      }, 100)
      return () => clearTimeout(timer)
    } else {
      setVisibleMessages([])
    }
  }, [messages])

  if (loading) {
    return (
      <div className="space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6">
        {[1, 2, 3].map(i => (
          <Card key={i} className="border border-white/10 bg-white/5 backdrop-blur-md rounded-xl sm:rounded-2xl shadow-[0_20px_45px_rgba(0,0,0,0.45)]">
            <CardContent className="py-4 px-4 sm:py-6 sm:px-6 md:py-7 md:px-7 lg:py-8 lg:px-9">
              <Skeleton className="h-16 sm:h-20 md:h-24 lg:h-28 w-full mb-3 sm:mb-4 md:mb-5 bg-white/10" />
              <div className="flex items-center gap-2 sm:gap-3 pt-3 sm:pt-4 border-t border-white/10">
                <Skeleton className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-white/10" />
                <div className="flex-1 space-y-1.5 sm:space-y-2">
                  <Skeleton className="h-3 w-20 sm:w-24 md:w-28 bg-white/10" />
                  <Skeleton className="h-2.5 w-16 sm:w-20 md:w-24 bg-white/10" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (messages.length === 0) {
    return (
      <div className="text-center py-8 sm:py-12 md:py-16 px-3 sm:px-4 rounded-2xl sm:rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md shadow-[0_25px_50px_rgba(0,0,0,0.45)]">
        <div className="relative inline-block mb-4 sm:mb-6 md:mb-8">
          <div className="absolute inset-0 bg-[#FD9210]/30 rounded-full blur-2xl scale-150"></div>
          <div className="relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-white/10 border border-[#FD9210]/40 rounded-full flex items-center justify-center mx-auto shadow-lg">
            <MessageCircle className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-[#FDDBB2]" />
          </div>
        </div>
        <h3 className="fugaz-one-regular text-base sm:text-lg md:text-xl lg:text-2xl text-white mb-2 sm:mb-3 md:mb-4 uppercase tracking-[0.15em] sm:tracking-[0.2em] px-2">
          No Messages Yet
        </h3>
        <p className="text-xs sm:text-sm md:text-base lg:text-lg text-white/80 font-[family-name:var(--font-inter)] max-w-md mx-auto leading-relaxed tracking-wide px-2">
          Be the first to serenade Sinead with a Havana-lit wish. Your note will sparkle here!
        </p>
        <div className="mt-4 sm:mt-6 md:mt-8 flex justify-center">
          <div className="flex items-center gap-1.5 sm:gap-2 text-[#FDDBB2]/70">
            <Sparkles className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
            <span className="text-[0.65rem] sm:text-xs md:text-sm font-[family-name:var(--font-inter)] uppercase tracking-[0.25em] sm:tracking-[0.35em]">
              Your message will appear here
            </span>
            <Sparkles className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6">
      {visibleMessages.map((msg, index) => (
        <Card
          key={`${msg.timestamp}-${index}`}
          className={`relative border border-white/20 bg-gradient-to-br from-[#1C0D05]/90 via-[#120902]/80 to-[#1C0D05]/90 backdrop-blur-2xl shadow-[0_30px_70px_rgba(0,0,0,0.65)] transition-all duration-500 group rounded-xl sm:rounded-2xl md:rounded-[28px] lg:rounded-[32px] ${
            isAnimating ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
          }`}
          style={{
            transitionDelay: `${index * 100}ms`,
            animation: isAnimating ? "none" : "fadeInUp 0.6s ease-out forwards",
          }}
        >
          <div className="pointer-events-none absolute inset-px rounded-[calc(1rem-1px)] sm:rounded-[calc(1.5rem-1px)] md:rounded-[calc(1.75rem-1px)] lg:rounded-[30px] border border-white/10" />
          <div className="pointer-events-none absolute inset-0 rounded-xl sm:rounded-2xl md:rounded-[28px] lg:rounded-[32px] bg-gradient-to-b from-white/5 via-transparent to-white/0" />

          <CardContent className="relative py-4 px-4 sm:py-6 sm:px-6 md:py-7 md:px-8 lg:py-9 lg:px-10 space-y-3 sm:space-y-4 md:space-y-5">
            <div className="flex items-center justify-between text-[0.6rem] sm:text-[0.65rem] md:text-xs uppercase tracking-[0.25em] sm:tracking-[0.3em] md:tracking-[0.35em] text-[#FDDBB2]/80">
              <span className="flex items-center gap-1 sm:gap-1.5 md:gap-2">
                Guest Note
                <span className="h-0.5 w-0.5 sm:h-1 sm:w-1 rounded-full bg-[#FDDBB2]/70" />
                <span className="text-[0.6rem] sm:text-[0.65rem] md:text-xs">
                  {new Date(msg.timestamp).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}
                </span>
              </span>
              <span className="flex items-center gap-0.5 sm:gap-1">
                <Sparkles className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                <span className="text-[0.6rem] sm:text-[0.65rem] md:text-xs">No. {String(index + 1).padStart(2, "0")}</span>
              </span>
            </div>

            {/* Message content */}
            <div className="rounded-xl sm:rounded-2xl md:rounded-[20px] lg:rounded-[24px] border border-white/10 bg-white/5 px-3 py-3 sm:px-4 sm:py-4 md:px-5 md:py-5 shadow-[inset_0_25px_55px_rgba(0,0,0,0.4)]">
              <p className="text-white/95 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed sm:leading-relaxed font-[family-name:var(--font-inter)] tracking-wide">
                {msg.message}
              </p>
            </div>

            {/* Author info at bottom with elegant divider */}
            <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-3 md:gap-4 pt-3 sm:pt-4 md:pt-5 border-t border-white/10">
              <div className="flex items-center gap-2 sm:gap-2.5 md:gap-3">
                <div className="flex-shrink-0">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 rounded-full flex items-center justify-center border border-white/20 bg-white/10 text-white shadow-[0_10px_25px_rgba(0,0,0,0.3)]">
                    <span className="font-[family-name:var(--font-inter)] text-xs sm:text-sm md:text-base font-semibold tracking-[0.15em] sm:tracking-[0.2em]">
                      {msg.name
                        .split(" ")
                        .map(n => n[0])
                        .join("")
                        .slice(0, 2)
                        .toUpperCase()}
                    </span>
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-[family-name:var(--font-inter)] text-white text-xs sm:text-sm md:text-base font-semibold leading-tight truncate">
                    {msg.name}
                  </h4>
                  <span className="text-[0.65rem] sm:text-xs md:text-sm text-white/60 font-[family-name:var(--font-inter)] tracking-wide">
                    {new Date(msg.timestamp).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2 text-[#FDDBB2]/80 font-[family-name:var(--font-inter)] text-[0.65rem] sm:text-[0.7rem] md:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em]">
                <Heart className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 text-[#FDDBB2]/80 fill-transparent" />
                <span className="whitespace-nowrap">Havana Love</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}
