"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  Instagram,
  Twitter,
  Facebook,
  MapPin,
  Calendar,
  Clock,
  Heart,
  Music2,
} from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();

  const quotes = [
    "Every girl dreams of her debut—a magical moment when she steps into womanhood, surrounded by those who love her most.",
    "Eighteen years of dreams, hopes, and beautiful moments have led to this special Havana nights celebration.",
    "A debut is not just a party—it's a celebration of growth, grace, and the beautiful journey ahead.",
  ];

  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) {
      const pauseTimeout = setTimeout(() => {
        setIsPaused(false);
      }, 3000);
      return () => clearTimeout(pauseTimeout);
    }

    if (isDeleting) {
      if (displayedText.length > 0) {
        const deleteTimeout = setTimeout(() => {
          setDisplayedText(displayedText.slice(0, -1));
        }, 30);
        return () => clearTimeout(deleteTimeout);
      } else {
        setIsDeleting(false);
        setCurrentQuoteIndex((prev) => (prev + 1) % quotes.length);
      }
    } else {
      const currentQuote = quotes[currentQuoteIndex];
      if (displayedText.length < currentQuote.length) {
        const typeTimeout = setTimeout(() => {
          setDisplayedText(currentQuote.slice(0, displayedText.length + 1));
        }, 50);
        return () => clearTimeout(typeTimeout);
      } else {
        setIsPaused(true);
        setIsDeleting(true);
      }
    }
  }, [displayedText, isDeleting, isPaused, currentQuoteIndex, quotes]);

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" },
  };

  const staggerChildren = {
    animate: {
      transition: { staggerChildren: 0.2 },
    },
  };

  const nav = [
    { label: "Home", href: "#hero" },
    { label: "Countdown", href: "#countdown" },
    { label: "Messages", href: "#messages" },
    { label: "Details", href: "#details" },
    { label: "Entourage", href: "#entourage" },
    { label: "Sponsors", href: "#sponsors" },
    { label: "RSVP", href: "#guest-list" },
    { label: "Book of Guests", href: "#guests" },
    { label: "FAQ", href: "#faq" },
    { label: "Snap & Share", href: "#snap-share" },
  ] as const;

  return (
    <footer className="relative z-20 mt-0 overflow-hidden bg-[#1B0D05]">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-60"
        style={{ backgroundImage: "url('/havana/woodbackground.png')" }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#140A03]/95 via-[#1F1207]/90 to-[#120902]/95" aria-hidden="true" />
      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-4 md:px-8 py-12 sm:py-14 md:py-16">
        {/* Celebration date presentation */}
        <motion.div
          className="flex justify-center px-2 sm:px-4 mb-10 sm:mb-12 md:mb-16"
          variants={fadeInUp}
        >
          <div className="max-w-2xl w-full">
            {/* Save The Date Header */}
            <div className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12">
              {/* Top decorative line */}
              <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4 mb-3 sm:mb-4 md:mb-6">
                <div className="h-px w-8 sm:w-12 md:w-16 lg:w-20 bg-white/20" />
                <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-white/40 rounded-full" />
                <div className="h-px w-8 sm:w-12 md:w-16 lg:w-20 bg-white/20" />
              </div>

              {/* Save The Date text */}
              <p className="text-xs sm:text-sm md:text-base lg:text-lg font-[family-name:var(--font-inter)] font-medium text-[#FDDBB2] uppercase tracking-[0.15em] sm:tracking-[0.2em] md:tracking-[0.3em] mb-3 sm:mb-4 md:mb-6">
                Save The Date
              </p>

              {/* Bottom decorative line */}
              <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4">
                <div className="h-px w-8 sm:w-12 md:w-16 lg:w-20 bg-white/20" />
                <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-white/40 rounded-full" />
                <div className="h-px w-8 sm:w-12 md:w-16 lg:w-20 bg-white/20" />
              </div>
            </div>

            {/* Date Section - Elegant Layout */}
            <div className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12">
              {/* Month - Elegant script style */}
              <div className="mb-3 sm:mb-4 md:mb-5 lg:mb-6">
                <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-[family-name:var(--font-ephesis)] text-white leading-none">
                  December
                </p>
              </div>

              {/* Day and Year - Horizontal layout with divider */}
              <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4 lg:gap-6 mb-4 sm:mb-6 md:mb-8">
                {/* Day - Large and bold focal point */}
                <p className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl 2xl:text-[10rem] font-[family-name:var(--font-crimson)] font-bold text-[#FDDBB2] leading-none drop-shadow-lg">
                  26
                </p>

                {/* Vertical divider */}
                <div className="h-12 sm:h-16 md:h-20 lg:h-24 xl:h-28 w-px bg-white/20" />

                {/* Year - Elegant and refined */}
                <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-[family-name:var(--font-crimson)] font-light text-white leading-none">
                  2025
                </p>
              </div>

              {/* Day of Week */}
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-[family-name:var(--font-crimson)] font-light text-white/80 mb-4 sm:mb-6 md:mb-8">
                Thursday
              </p>
            </div>

            {/* Time Section */}
            <div className="text-center">
              {/* Top decorative line */}
              <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4 mb-3 sm:mb-4 md:mb-5">
                <div className="h-px w-8 sm:w-12 md:w-16 lg:w-20 bg-white/20" />
                <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-white/40 rounded-full" />
                <div className="h-px w-8 sm:w-12 md:w-16 lg:w-20 bg-white/20" />
              </div>

              {/* Time */}
              <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-[family-name:var(--font-crimson)] font-medium text-white tracking-wide mb-3 sm:mb-4 md:mb-5">
                6:00 PM – 10:00 PM
              </p>

              {/* Bottom decorative line */}
              <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4">
                <div className="h-px w-8 sm:w-12 md:w-16 lg:w-20 bg-white/20" />
                <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-white/40 rounded-full" />
                <div className="h-px w-8 sm:w-12 md:w-16 lg:w-20 bg-white/20" />
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-10 mb-8 sm:mb-10 md:mb-12"
          variants={staggerChildren}
          initial="initial"
          animate="animate"
        >
          {/* Debutante Info */}
          <motion.div className="lg:col-span-2" variants={fadeInUp}>
            <div className="mb-6 sm:mb-8">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5 md:mb-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg border border-white/20">
                  <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-[#FDDBB2]" />
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-[family-name:var(--font-ephesis)] text-white">
                  Sinead Gloria L. Heussaf
                </h3>
              </div>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-start gap-2 sm:gap-3 font-[family-name:var(--font-inter)] text-white/85">
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-[#FDDBB2] flex-shrink-0 mt-0.5" />
                  <span className="text-sm sm:text-base md:text-lg">December 26, 2025 • Thursday</span>
                </div>
                <div className="flex items-start gap-2 sm:gap-3 font-[family-name:var(--font-inter)] text-white/85">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-[#FDDBB2] flex-shrink-0 mt-0.5" />
                  <span className="text-sm sm:text-base">Grandballroom Hall, Sugarland Hotel, Araneta Street, Barangay Singcang, Bacolod City, Negros Occidental</span>
                </div>
              </div>
            </div>

            <motion.div
              className="bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl md:rounded-[28px] lg:rounded-[32px] p-4 sm:p-5 md:p-6 border border-white/15 shadow-[0_35px_90px_rgba(0,0,0,0.65)] relative"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-px rounded-[calc(1rem-1px)] sm:rounded-[calc(1.5rem-1px)] md:rounded-[calc(1.75rem-1px)] lg:rounded-[30px] border border-white/10" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#FFFFFF0D,transparent_65%)]" />
              </div>

              <blockquote className="relative font-[family-name:var(--font-inter)] text-white/85 italic text-sm sm:text-base md:text-lg leading-relaxed min-h-[60px] sm:min-h-[70px] md:min-h-[80px]">
                "{displayedText}
                <span className="inline-block w-0.5 h-4 sm:h-5 md:h-6 bg-[#FDDBB2] ml-1 animate-pulse">
                  |
                </span>
                "
              </blockquote>
              <div className="flex items-center gap-1.5 sm:gap-2 mt-3 sm:mt-4">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#FDDBB2]/70 rounded-full" />
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#FDDBB2]/50 rounded-full" />
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#FDDBB2]/70 rounded-full" />
              </div>
            </motion.div>
          </motion.div>

          {/* Event Details quick tiles */}
          <motion.div className="space-y-4 sm:space-y-5 md:space-y-6" variants={fadeInUp}>
            <motion.div
              className="bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl md:rounded-[28px] lg:rounded-[32px] p-4 sm:p-5 md:p-6 border border-white/15 shadow-[0_35px_90px_rgba(0,0,0,0.65)] hover:border-white/25 transition-all duration-300 relative"
              whileHover={{ y: -5 }}
            >
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-px rounded-[calc(1rem-1px)] sm:rounded-[calc(1.5rem-1px)] md:rounded-[calc(1.75rem-1px)] lg:rounded-[30px] border border-white/10" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#FFFFFF0D,transparent_65%)]" />
              </div>

              <div className="relative flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md border border-white/20">
                  <Clock className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 text-[#FDDBB2]" />
                </div>
                <h4 className="font-[family-name:var(--font-inter)] font-bold text-base sm:text-lg md:text-xl text-white">
                  Celebration
                </h4>
              </div>
              <div className="relative space-y-2 sm:space-y-3 font-[family-name:var(--font-inter)] text-white/85 text-xs sm:text-sm">
                <div className="flex items-start gap-2 sm:gap-3">
                  <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FDDBB2] flex-shrink-0 mt-0.5" />
                  <span>Grandballroom Hall, Sugarland Hotel</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                  <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FDDBB2] flex-shrink-0" />
                  <span>6:00 PM – 10:00 PM</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl md:rounded-[28px] lg:rounded-[32px] p-4 sm:p-5 md:p-6 border border-white/15 shadow-[0_35px_90px_rgba(0,0,0,0.65)] hover:border-white/25 transition-all duration-300 relative"
              whileHover={{ y: -5 }}
            >
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-px rounded-[calc(1rem-1px)] sm:rounded-[calc(1.5rem-1px)] md:rounded-[calc(1.75rem-1px)] lg:rounded-[30px] border border-white/10" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#FFFFFF0D,transparent_65%)]" />
              </div>

              <div className="relative flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md border border-white/20">
                  <Heart className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 text-[#FDDBB2]" />
                </div>
                <h4 className="font-[family-name:var(--font-inter)] font-bold text-base sm:text-lg md:text-xl text-white">
                  Event Type
                </h4>
              </div>
              <div className="relative space-y-2 sm:space-y-3 font-[family-name:var(--font-inter)] text-white/85 text-xs sm:text-sm">
                <div className="flex items-center gap-2 sm:gap-3">
                  <span>Debut – All In Package</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                  <span>Havana Nights Celebration</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact + Quick Links */}
          <motion.div className="space-y-6 sm:space-y-7 md:space-y-8" variants={fadeInUp}>
            <div>
              <h4 className="font-[family-name:var(--font-inter)] font-bold text-base sm:text-lg md:text-xl mb-4 sm:mb-5 md:mb-6 flex items-center gap-2 sm:gap-3 text-white">
                <div className="w-1.5 sm:w-2 h-6 sm:h-7 md:h-8 bg-white/20 rounded-full" /> Follow
                Us
              </h4>
              <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                <a
                  href="https://www.facebook.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center h-9 w-9 sm:h-10 sm:w-10 md:h-11 md:w-11 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:border-white/30 hover:bg-white/15 transition-all hover:scale-110 shadow-md"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 text-white" />
                </a>
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center h-9 w-9 sm:h-10 sm:w-10 md:h-11 md:w-11 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:border-white/30 hover:bg-white/15 transition-all hover:scale-110 shadow-md"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 text-white" />
                </a>
                <a
                  href="https://www.tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center h-9 w-9 sm:h-10 sm:w-10 md:h-11 md:w-11 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:border-white/30 hover:bg-white/15 transition-all hover:scale-110 shadow-md"
                  aria-label="TikTok"
                >
                  <Music2 className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 text-white" />
                </a>
                <a
                  href="https://www.twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center h-9 w-9 sm:h-10 sm:w-10 md:h-11 md:w-11 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:border-white/30 hover:bg-white/15 transition-all hover:scale-110 shadow-md"
                  aria-label="Twitter"
                >
                  <Twitter className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 text-white" />
                </a>
              </div>
            </div>

            <div>
              <h5 className="font-[family-name:var(--font-inter)] font-bold text-sm sm:text-base md:text-lg mb-3 sm:mb-4 text-white">
                Quick Links
              </h5>
              <div className="space-y-1.5 sm:space-y-2">
                {nav.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="block text-white/70 hover:text-[#FDDBB2] transition-colors duration-200 font-[family-name:var(--font-inter)] text-xs sm:text-sm"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Row */}
        <motion.div
          className="border-t border-white/15 pt-6 sm:pt-7 md:pt-8"
          variants={fadeInUp}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-5 md:gap-6">
            <div className="text-center md:text-left">
              <p className="text-white font-[family-name:var(--font-inter)] text-xs sm:text-sm">
                © {year} Sinead Gloria L. Heussaf. All rights reserved.
              </p>
              <p className="text-white/80 font-[family-name:var(--font-inter)] text-xs sm:text-sm mt-0.5 sm:mt-1">
                Made with love for this special celebration
              </p>
            </div>

            <div className="text-center md:text-right space-y-0.5 sm:space-y-1">
              <p className="text-white/70 font-[family-name:var(--font-inter)] text-[0.65rem] sm:text-xs">
                Developed by{" "}
                <a
                  href="https://lance28-beep.github.io/portfolio-website/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#FDDBB2] hover:text-[#FDDBB2]/80 transition-colors duration-200 underline decoration-white/40 hover:decoration-white/70 font-semibold"
                >
                  Lance Valle
                </a>
              </p>
              <p className="text-white/70 font-[family-name:var(--font-inter)] text-[0.65rem] sm:text-xs">
                Want a website like this? Visit{" "}
                <a
                  href="https://www.facebook.com/WeddingInvitationNaga"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#FDDBB2] hover:text-[#FDDBB2]/80 transition-colors duration-200 underline decoration-white/40 hover:decoration-white/70 font-semibold"
                >
                  Wedding Invitation Naga
                </a>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
