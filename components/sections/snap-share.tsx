"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import {
  Instagram,
  Facebook,
  Twitter,
  Share2,
  Download,
} from "lucide-react";
import { Section } from "@/components/section";
import { QRCodeCanvas } from "qrcode.react";

export function SnapShare() {
  const [isMobile, setIsMobile] = useState(false);

  const websiteUrl =
    typeof window !== "undefined"
      ? window.location.href
      : "https://example.com";
  const shareText = `Join us in celebrating Sinead's Havana nights debut celebration! Check out the website: ${websiteUrl}`;

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const shareOnSocial = (
    platform: "instagram" | "facebook" | "twitter" | "tiktok",
  ) => {
    const encodedUrl = encodeURIComponent(websiteUrl);
    const encodedText = encodeURIComponent(shareText);

    const urls: Record<string, string> = {
      instagram: `https://www.instagram.com/`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodedText}`,
      tiktok: `https://www.tiktok.com/`,
    };

    const target = urls[platform];
    if (target) {
      window.open(target, "_blank", "width=600,height=400");
    }
  };

  const downloadQRCode = () => {
    const canvas = document.getElementById(
      "snapshare-qr",
    ) as HTMLCanvasElement | null;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = "wedding-qr.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8 },
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <Section
      id="snap-share"
      className="relative bg-[#1B0D05] pt-12 sm:pt-16 md:pt-20 lg:pt-24 xl:pt-28 pb-0 overflow-hidden"
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

      <div className="relative z-20 max-w-6xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-8 sm:mb-12 md:mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="text-[0.65rem] sm:text-xs md:text-sm uppercase tracking-[0.25em] sm:tracking-[0.3em] md:tracking-[0.35em] text-[#FDDBB2]/70 mb-2 sm:mb-3 md:mb-4">Spread the Magic</p>
          <h2 className="fugaz-one-regular text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-white mb-4 sm:mb-6 md:mb-8 uppercase tracking-[0.1em] sm:tracking-[0.12em] md:tracking-[0.15em]">
            Share the Celebration
          </h2>

          <p className="text-sm sm:text-base md:text-lg lg:text-xl font-[family-name:var(--font-inter)] text-white/85 max-w-2xl mx-auto leading-relaxed tracking-wide px-2 sm:px-4">
            Help us spread the joy of this special Havana nights celebration! Share our website with family and friends so they can join in the magic of this unforgettable moment.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-10 max-w-5xl mx-auto items-start"
          variants={staggerChildren}
          initial="initial"
          animate="animate"
        >
          {/* QR Code Card */}
          <motion.div className="relative group" variants={fadeInUp}>
            <div className="absolute -inset-1 sm:-inset-2 rounded-2xl sm:rounded-[28px] md:rounded-[36px] bg-gradient-to-br from-[#FD9210]/25 via-transparent to-transparent blur-3xl opacity-70 group-hover:opacity-100 transition-opacity" />

            <div className="relative bg-white/5 backdrop-blur-2xl rounded-xl sm:rounded-2xl md:rounded-[28px] lg:rounded-[32px] border border-white/15 shadow-[0_35px_90px_rgba(0,0,0,0.65)] overflow-hidden text-center h-full flex flex-col">
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-px rounded-[calc(1rem-1px)] sm:rounded-[calc(1.5rem-1px)] md:rounded-[calc(1.75rem-1px)] lg:rounded-[30px] border border-white/10" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#FFFFFF0D,transparent_65%)]" />
              </div>

              <div className="relative p-4 sm:p-6 md:p-8 lg:p-10 text-white flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-base sm:text-lg md:text-xl lg:text-2xl font-[family-name:var(--font-inter)] font-semibold text-white mb-2 sm:mb-3 md:mb-4">
                    Quick Share with QR Code
                  </h4>
                  
                  <p className="text-xs sm:text-sm md:text-base font-[family-name:var(--font-inter)] text-white/70 mb-4 sm:mb-5 md:mb-6">
                    Let guests easily access our celebration website
                  </p>
                </div>

                <div className="flex flex-col items-center">
                  <div className="inline-flex flex-col items-center bg-white/5 backdrop-blur-sm p-3 sm:p-4 md:p-6 rounded-lg sm:rounded-xl border border-white/15 mb-3 sm:mb-4">
                    <div className="mb-3 sm:mb-4 p-2 sm:p-3 rounded-lg sm:rounded-xl bg-white shadow-md border border-white/20">
                      <QRCodeCanvas
                        id="snapshare-qr"
                        value={websiteUrl}
                        size={isMobile ? 100 : 180}
                        includeMargin
                        className="bg-white"
                      />
                    </div>
                    <button
                      onClick={downloadQRCode}
                      className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-3 bg-white/10 hover:bg-white/15 text-white border border-white/20 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg text-[0.65rem] sm:text-xs md:text-sm font-[family-name:var(--font-inter)] font-semibold backdrop-blur-sm"
                    >
                      <Download className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>Download QR Code</span>
                    </button>
                  </div>

                  <p className="text-[0.65rem] sm:text-xs md:text-sm font-[family-name:var(--font-inter)] text-white/70">
                    Scan to instantly visit our celebration website
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Social Media Card */}
          <motion.div className="relative group" variants={fadeInUp}>
            <div className="absolute -inset-1 sm:-inset-2 rounded-2xl sm:rounded-[28px] md:rounded-[36px] bg-gradient-to-br from-[#FD9210]/25 via-transparent to-transparent blur-3xl opacity-70 group-hover:opacity-100 transition-opacity" />

            <div className="relative bg-white/5 backdrop-blur-2xl rounded-xl sm:rounded-2xl md:rounded-[28px] lg:rounded-[32px] border border-white/15 shadow-[0_35px_90px_rgba(0,0,0,0.65)] overflow-hidden h-full flex flex-col">
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-px rounded-[calc(1rem-1px)] sm:rounded-[calc(1.5rem-1px)] md:rounded-[calc(1.75rem-1px)] lg:rounded-[30px] border border-white/10" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#FFFFFF0D,transparent_65%)]" />
              </div>

              <div className="relative p-4 sm:p-6 md:p-8 lg:p-10 text-white flex-1 flex flex-col">
                <div className="mb-4 sm:mb-5 md:mb-6">
                  <h5 className="text-base sm:text-lg md:text-xl lg:text-2xl font-[family-name:var(--font-inter)] font-semibold text-white mb-2 sm:mb-3 text-center">
                    Spread the Word
                  </h5>
                  
                  <p className="text-xs sm:text-sm md:text-base font-[family-name:var(--font-inter)] text-white/70 mb-4 sm:mb-5 md:mb-6 text-center">
                    Share our Havana nights celebration with your network
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4 flex-1">
                  <button
                    onClick={() => shareOnSocial("instagram")}
                    className="group flex flex-col items-center justify-center gap-1.5 sm:gap-2 bg-gradient-to-br from-pink-500 via-purple-500 to-pink-600 text-white px-2 sm:px-3 md:px-4 py-3 sm:py-4 md:py-5 rounded-lg hover:scale-105 transition-all duration-200 shadow-md hover:shadow-xl"
                  >
                    <Instagram className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform" />
                    <span className="font-[family-name:var(--font-inter)] font-semibold text-[0.65rem] sm:text-xs md:text-sm">
                      Instagram
                    </span>
                  </button>

                  <button
                    onClick={() => shareOnSocial("facebook")}
                    className="group flex flex-col items-center justify-center gap-1.5 sm:gap-2 bg-gradient-to-br from-blue-500 to-blue-700 text-white px-2 sm:px-3 md:px-4 py-3 sm:py-4 md:py-5 rounded-lg hover:scale-105 transition-all duration-200 shadow-md hover:shadow-xl"
                  >
                    <Facebook className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform" />
                    <span className="font-[family-name:var(--font-inter)] font-semibold text-[0.65rem] sm:text-xs md:text-sm">
                      Facebook
                    </span>
                  </button>

                  <button
                    onClick={() => shareOnSocial("tiktok")}
                    className="group flex flex-col items-center justify-center gap-1.5 sm:gap-2 bg-gradient-to-br from-black via-gray-800 to-black text-white px-2 sm:px-3 md:px-4 py-3 sm:py-4 md:py-5 rounded-lg hover:scale-105 transition-all duration-200 shadow-md hover:shadow-xl"
                  >
                    <Share2 className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform" />
                    <span className="font-[family-name:var(--font-inter)] font-semibold text-[0.65rem] sm:text-xs md:text-sm">
                      TikTok
                    </span>
                  </button>

                  <button
                    onClick={() => shareOnSocial("twitter")}
                    className="group flex flex-col items-center justify-center gap-1.5 sm:gap-2 bg-gradient-to-br from-sky-400 to-blue-500 text-white px-2 sm:px-3 md:px-4 py-3 sm:py-4 md:py-5 rounded-lg hover:scale-105 transition-all duration-200 shadow-md hover:shadow-xl"
                  >
                    <Twitter className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform" />
                    <span className="font-[family-name:var(--font-inter)] font-semibold text-[0.65rem] sm:text-xs md:text-sm">
                      Twitter
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Closing Message */}
        <motion.div
          className="text-center mt-8 sm:mt-12 md:mt-16 pb-12 sm:pb-16 md:pb-20 lg:pb-24 xl:pb-28"
          variants={fadeInUp}
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="relative group max-w-3xl mx-auto px-2 sm:px-0">
            <div className="absolute -inset-1 sm:-inset-2 rounded-2xl sm:rounded-[28px] md:rounded-[36px] bg-gradient-to-br from-[#FD9210]/25 via-transparent to-transparent blur-3xl opacity-70 group-hover:opacity-100 transition-opacity" />

            <div className="relative bg-white/5 backdrop-blur-2xl rounded-xl sm:rounded-2xl md:rounded-[28px] lg:rounded-[32px] border border-white/15 shadow-[0_35px_90px_rgba(0,0,0,0.65)] overflow-hidden">
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-px rounded-[calc(1rem-1px)] sm:rounded-[calc(1.5rem-1px)] md:rounded-[calc(1.75rem-1px)] lg:rounded-[30px] border border-white/10" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#FFFFFF0D,transparent_65%)]" />
              </div>

              <div className="relative p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 text-white">
                <p className="text-sm sm:text-base md:text-lg lg:text-xl font-[family-name:var(--font-inter)] text-white/85 leading-relaxed mb-4 sm:mb-5 md:mb-6">
                  Thank you for helping us share this special Havana nights celebration with loved ones near and far. Your support means the world to us!
                </p>

                {/* Decorative Line */}
                <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4 my-4 sm:my-5 md:my-6">
                  <div className="h-px w-8 sm:w-12 md:w-16 lg:w-20 bg-white/20" />
                  <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-white/40 rounded-full" />
                  <div className="h-px w-8 sm:w-12 md:w-16 lg:w-20 bg-white/20" />
                </div>

                <div className="text-center">
                  <span className="block text-lg sm:text-xl md:text-2xl lg:text-3xl font-[family-name:var(--font-ephesis)] text-[#FDDBB2] font-normal">
                    – Sinead Gloria L. Heussaff –
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Hashtags Section */}
        <motion.div
          className="text-center mt-8 sm:mt-10 md:mt-12 pb-8 sm:pb-10 md:pb-12"
          variants={fadeInUp}
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-5">
            <a
              href="https://www.instagram.com/explore/tags/SineadsHavanaSoirée18/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#FDDBB2] hover:text-white transition-colors text-sm sm:text-base md:text-lg font-[family-name:var(--font-inter)] tracking-wide"
            >
              #SineadsHavanaSoirée18
            </a>
            <span className="text-white/40">•</span>
            <a
              href="https://www.instagram.com/explore/tags/SineadGlowsInHavana/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#FDDBB2] hover:text-white transition-colors text-sm sm:text-base md:text-lg font-[family-name:var(--font-inter)] tracking-wide"
            >
              #SineadGlowsInHavana
            </a>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
