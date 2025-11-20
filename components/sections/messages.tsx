"use client"

import { useRef, useState, useCallback, useEffect } from "react"
import { MessageCircle, Heart, Sparkles } from "lucide-react"
import { Section } from "@/components/section"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import MessageWallDisplay from "./message-wall-display"

interface Message {
  timestamp: string
  name: string
  message: string
}

interface MessageFormProps {
  onSuccess?: () => void
  onMessageSent?: () => void
}

function MessageForm({ onSuccess, onMessageSent }: MessageFormProps) {
  const formRef = useRef<HTMLFormElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [nameValue, setNameValue] = useState("")
  const [messageValue, setMessageValue] = useState("")
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    const name = formData.get("name") as string
    const message = formData.get("message") as string

    const googleFormData = new FormData()
    googleFormData.append("entry.405401269", name)
    googleFormData.append("entry.893740636", message)

    try {
      await fetch(
        "https://docs.google.com/forms/d/e/1FAIpQLSeLdBTJcwHsz29X4W_6ft-f1GIpTuxor9AM4rijsehUXeKZnQ/formResponse",
        {
          method: "POST",
          mode: "no-cors",
          body: googleFormData,
        }
      )

      toast({
        title: "Message Sent! 💌",
        description: "Your heartfelt wishes have been delivered",
        duration: 3000,
      })

      setIsSubmitted(true)
      setNameValue("")
      setMessageValue("")
      formRef.current?.reset()
      
      // Reset submitted state after animation
      setTimeout(() => setIsSubmitted(false), 1000)
      
      if (onSuccess) onSuccess()
      if (onMessageSent) onMessageSent()
    } catch (error) {
      toast({
        title: "Unable to send message",
        description: "Please try again in a moment",
        variant: "destructive",
        duration: 3000,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="relative w-full max-w-md sm:max-w-lg mx-auto px-3 sm:px-0">
      {/* Clean decorative background elements */}
      {/* <div className="absolute -top-4 -left-6 h-16 w-16 bg-[#FD9210]/25 blur-3xl rounded-full" />
      <div className="absolute -bottom-6 -right-6 h-20 w-20 bg-[#54A658]/25 blur-3xl rounded-full" /> */}

      <Card
        className={`relative w-full border border-white/20 bg-gradient-to-br from-[#1C0D05]/95 via-[#1A0C04]/85 to-[#120902]/90 backdrop-blur-md shadow-[0_20px_60px_rgba(0,0,0,0.65)] transition-all duration-300 overflow-hidden rounded-xl sm:rounded-2xl ${
          isFocused ? "border-[#FD9210]/60 shadow-[0_25px_60px_rgba(253,146,16,0.35)]" : "hover:border-[#FD9210]/40"
        } ${isSubmitted ? "animate-bounce" : ""}`}
      >
        {/* Simple elegant overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#FD9210/20,transparent_55%)]" />

        {/* Success animation overlay */}
        {isSubmitted && (
          <div className="absolute inset-0 bg-gradient-to-br from-[#54A658]/30 to-[#A3E074]/15 flex items-center justify-center z-20 pointer-events-none">
            <div className="flex flex-col items-center gap-2 animate-pulse">
              <div className="w-16 h-16 bg-[#54A658] rounded-full flex items-center justify-center shadow-lg shadow-[#54A658]/60">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              <p className="text-white font-semibold text-lg tracking-wide">To Sinead!</p>
            </div>
          </div>
        )}

        <CardContent className="relative p-4 sm:p-7 md:p-9 space-y-5 sm:space-y-6">
          {/* Header with icon */}
          <div className="text-center space-y-2.5 sm:space-y-3">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-[#FD9210]/30 rounded-full blur-2xl scale-150" />
              <div className="relative w-12 h-12 sm:w-16 sm:h-16 bg-white/10 border border-[#FD9210]/40 rounded-full flex items-center justify-center mx-auto shadow-lg">
                <MessageCircle className="h-6 w-6 sm:h-8 sm:w-8 text-[#FDDBB2]" />
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-[0.65rem] sm:text-xs uppercase tracking-[0.35em] text-[#FDDBB2]/70">
                Letter for Sinead
              </p>
              <h3 className="text-base sm:text-xl md:text-2xl font-[family-name:var(--font-inter)] text-white tracking-[0.15em] uppercase">
                Pour Your Heart Out
              </h3>
              <p className="text-xs sm:text-base text-white/80 font-[family-name:var(--font-inter)] leading-relaxed max-w-md mx-auto">
                Paint Sinead a memory, a blessing, or a promise. Every word will be printed in her keepsake journal after the celebration.
              </p>
            </div>
          </div>

          <form 
            ref={formRef} 
            onSubmit={handleSubmit} 
            className="space-y-3.5 sm:space-y-5"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          >
            {/* Name Field */}
            <div className="space-y-1.5 sm:space-y-2.5">
              <label className="block text-[0.65rem] sm:text-xs font-[family-name:var(--font-inter)] font-semibold text-white/80 uppercase tracking-[0.25em]">
                Your Name
              </label>
              <div className="relative group">
                <div className="absolute inset-0 rounded-xl opacity-0 transition group-hover:opacity-100 bg-gradient-to-r from-[#FD9210]/40 via-transparent to-[#54A658]/40 blur" />
                <Input
                  name="name"
                  required
                  value={nameValue}
                  onChange={e => setNameValue(e.target.value)}
                  onFocus={() => setFocusedField("name")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Enter your name"
                  className={`relative w-full border rounded-lg sm:rounded-xl py-2 sm:py-2.5 px-3 sm:px-4 text-sm sm:text-base font-[family-name:var(--font-inter)] text-white placeholder:text-white/40 transition-all duration-300 bg-white/5 focus:outline-none ${
                    focusedField === "name"
                      ? "border-[#FD9210] shadow-[0_0_25px_rgba(253,146,16,0.25)] bg-white/10"
                      : "border-white/20 hover:border-white/40"
                  }`}
                />
              </div>
            </div>

            {/* Message Field */}
            <div className="space-y-1.5 sm:space-y-2.5">
              <div className="flex items-center justify-between">
                <label className="block text-[0.65rem] sm:text-xs font-[family-name:var(--font-inter)] font-semibold text-white/80 uppercase tracking-[0.25em]">
                  Your Message
                </label>
                {messageValue && (
                  <span
                    className={`text-[0.65rem] sm:text-xs font-[family-name:var(--font-inter)] transition-colors ${
                      messageValue.length > 500 ? "text-red-400" : "text-white/60"
                    }`}
                  >
                    {messageValue.length}/500
                  </span>
                )}
              </div>
              <div className="relative group">
                <div className="absolute inset-0 rounded-2xl opacity-0 transition group-hover:opacity-100 bg-gradient-to-r from-[#54A658]/35 via-transparent to-[#FD9210]/35 blur" />
                <Textarea
                  name="message"
                  required
                  value={messageValue}
                  onChange={e => {
                    if (e.target.value.length <= 500) {
                      setMessageValue(e.target.value)
                    }
                  }}
                  onFocus={() => setFocusedField("message")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Share your love, memories, or well wishes..."
                  className={`relative w-full border rounded-xl sm:rounded-2xl min-h-[110px] sm:min-h-[140px] text-sm sm:text-base font-[family-name:var(--font-inter)] text-white placeholder:text-white/40 transition-all duration-300 resize-none bg-white/5 py-2.5 sm:py-3 px-3.5 sm:px-5 focus:outline-none ${
                    focusedField === "message"
                      ? "border-[#54A658] shadow-[0_0_25px_rgba(84,166,88,0.25)] bg-white/10"
                      : "border-white/20 hover:border-white/40"
                  }`}
                />
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting || !nameValue.trim() || !messageValue.trim()}
              className="relative w-full overflow-hidden rounded-full bg-gradient-to-r from-[#D2691E] to-[#FF8C00] hover:from-[#FF8C00] hover:to-[#FFB84D] text-white py-2.5 sm:py-3.5 px-5 sm:px-8 text-[0.65rem] sm:text-xs font-[family-name:var(--font-crimson)] font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/70 disabled:opacity-60 disabled:cursor-not-allowed tracking-[0.3em] drop-shadow-lg"
              style={{
                boxShadow: '0 4px 15px rgba(255, 140, 0, 0.4), 0 0 20px rgba(255, 165, 0, 0.2)'
              }}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Sending...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <Heart className="h-3.5 w-3.5 sm:h-4 sm:w-4 fill-current" />
                  Seal it with love
                </span>
              )}
            </Button>
            <p className="text-[0.6rem] sm:text-xs text-center text-white/60 uppercase tracking-[0.3em] font-[family-name:var(--font-inter)]">
              posted to sinead’s digital wall
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export function Messages() {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)

  const fetchMessages = useCallback(() => {
    setLoading(true)
    fetch(
      "https://script.google.com/macros/s/AKfycbyIjP05YJVu1XUJ8xDpfNJZXthwlgXm1-gk77BnVVDZgMKOs6tDMDiSsCTVRqvgCYFi/exec"
    )
      .then((res) => res.json())
      .then((data) => {
        const rows: string[][] = data.GoogleSheetData
        const [header, ...entries] = rows
        const idxName = header.findIndex((h: string) => h.toLowerCase().includes("name"))
        const idxMsg = header.findIndex((h: string) => h.toLowerCase().includes("message"))
        const idxTime = header.findIndex((h: string) => h.toLowerCase().includes("timestamp"))
        const parsed = entries
          .map((row: string[]) => ({
            timestamp: row[idxTime],
            name: row[idxName],
            message: row[idxMsg],
          }))
          .reverse()
        setMessages(parsed)
        setLoading(false)
      })
      .catch((error) => {
        console.error("Failed to fetch messages:", error)
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    fetchMessages()
  }, [fetchMessages])

  return (
    <Section id="messages" className="relative overflow-hidden bg-[#1B0D05] py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-80"
        style={{ backgroundImage: "url('/havana/woodbackground.png')" }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#140A03]/95 via-[#1F1207]/90 to-[#120902]/95" aria-hidden="true" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Decorative background elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          {/* Floating soft glows */}
          {/* <div className="hidden sm:block absolute -top-6 -left-6 w-24 h-24 bg-[#FD9210]/15 rounded-full blur-2xl animate-pulse" />
          <div className="hidden sm:block absolute top-10 right-0 w-20 h-20 bg-[#54A658]/15 rounded-full blur-xl animate-pulse delay-1000" />
          <div className="hidden sm:block absolute bottom-10 left-10 w-28 h-28 bg-white/15 rounded-full blur-2xl animate-pulse delay-2000" />
          <div className="sm:hidden absolute top-4 left-0 w-14 h-14 bg-white/12 rounded-full blur-lg" />
          <div className="sm:hidden absolute bottom-6 right-2 w-10 h-10 bg-[#FD9210]/20 rounded-full blur-md" /> */}

          {/* Gradient lines */}
          <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
          <div className="absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#FD9210]/20 to-transparent" />
        </div>
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16 lg:mb-20">
        <p className="text-[0.65rem] sm:text-xs md:text-sm uppercase tracking-[0.2em] sm:tracking-[0.25em] md:tracking-[0.3em] text-white/80 mb-2 sm:mb-3">
        Send a heartfelt note to Sinead
          </p>
          <h2 className="fugaz-one-regular text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-white mb-6 sm:mb-8 md:mb-10 text-balance uppercase tracking-[0.1em] sm:tracking-[0.12em] md:tracking-[0.15em]">
            Toasts for Sinead
          </h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/85 font-[family-name:var(--font-inter)] font-light leading-relaxed max-w-2xl mx-auto px-2 sm:px-4 md:px-6 tracking-wide">
              Celebrate Sinead's sparkling milestone with words that echo warmth, gratitude, and hope. Share a fond story from her childhood, a blessing for her future, or a cheer for the woman she is becoming—each message becomes a keepsake in her debut diary.
            </p>
          </div>

        </div>

        {/* Form Section */}
        <div className="flex justify-center mb-16 sm:mb-20 md:mb-24">
          <div className="relative max-w-2xl w-full">
            {/* Card halo */}
            <div className="absolute -inset-3 bg-gradient-to-br from-[#FD9210]/20 via-transparent to-transparent rounded-3xl blur-2xl opacity-70" />
            <div className="absolute -inset-1 bg-gradient-to-br from-white/15 via-transparent to-transparent rounded-3xl blur-md opacity-80" />
            <MessageForm onMessageSent={fetchMessages} />
          </div>
        </div>

        {/* Messages Display Section */}
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6">
          {/* Top corner accents */}
          <div className="absolute -top-3 -left-3 w-4 h-4 bg-white/40 rounded-full blur-sm opacity-70" />
          <div className="absolute -top-3 -right-3 w-4 h-4 bg-white/40 rounded-full blur-sm opacity-70" />
          <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-14 xl:mb-16">
            <div className="relative inline-block mb-4 sm:mb-5 md:mb-7">
              <div className="absolute inset-0 bg-[#FD9210]/20 rounded-full blur-xl scale-150"></div>
              <div className="relative w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-white/10 border border-[#FD9210]/40 rounded-full flex items-center justify-center mx-auto shadow-lg">
                <Heart className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 text-[#FDDBB2]" />
              </div>
            </div>
            <h3 className="fugaz-one-regular text-base sm:text-lg md:text-xl lg:text-2xl text-white mb-2 sm:mb-3 md:mb-4 tracking-[0.1em] sm:tracking-[0.12em] uppercase">
              Words Lighting Sinead's Night
            </h3>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/80 font-[family-name:var(--font-inter)] font-light max-w-2xl mx-auto px-2 sm:px-4 tracking-wide">
              Read the heartfelt tributes from family and friends as they serenade Sinead with love.
            </p>
          </div>
          
          <MessageWallDisplay messages={messages} loading={loading} />
        </div>

      </div>
    </Section>
  )
}
