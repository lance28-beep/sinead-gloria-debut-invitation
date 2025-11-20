"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import { Home, MessageCircle, MapPin, Users, Calendar, HelpCircle } from "lucide-react";
import Dock from "./Dock";

const navLinks = [
  { href: "#hero", label: "Home", icon: Home },
  { href: "#messages", label: "Messages", icon: MessageCircle },
  { href: "#details", label: "Details", icon: MapPin },
  { href: "#entourage", label: "Entourage", icon: Users },
  { href: "#guest-list", label: "RSVP", icon: Calendar },
  { href: "#faq", label: "FAQ", icon: HelpCircle },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("#home");

  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    const onScroll = () => {
      if (rafIdRef.current != null) return;
      rafIdRef.current = window.requestAnimationFrame(() => {
        rafIdRef.current = null;
        setIsScrolled(window.scrollY > 50);
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      if (rafIdRef.current != null) cancelAnimationFrame(rafIdRef.current);
      window.removeEventListener("scroll", onScroll as EventListener);
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const sectionIds = navLinks.map((l) => l.href.substring(1));
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          const topMost = visible[0];
          if (topMost.target && topMost.target.id) {
            const newActive = `#${topMost.target.id}`;
            setActiveSection((prev) => (prev === newActive ? prev : newActive));
          }
        }
      },
      {
        root: null,
        rootMargin: "-20% 0px -70% 0px",
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Smooth scroll handler for dock items
  const handleSmoothScroll = (href: string) => {
    if (href.startsWith("#")) {
      const targetId = href.slice(1);
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
        // Update URL hash without jumping
        if (typeof history !== "undefined") {
          history.replaceState(null, "", href);
        }
      }
    }
  };

  // Create dock items for mobile navigation - Optimized for iPhone SE
  const dockItems = useMemo(
    () =>
      navLinks.map((link) => {
        const Icon = link.icon;
        return {
          icon: <Icon size={18} strokeWidth={2.5} className="text-[#FD9210]" />,
          label: link.label,
          onClick: () => handleSmoothScroll(link.href),
        };
      }),
    [],
  );

  return (
    <>
      <nav
        className={`sticky top-0 z-50 transition-all duration-500 ease-out ${
          isScrolled
            ? "bg-[#6A391B]/95 shadow-lg border-b border-[#FD9210]/30"
            : "bg-[#6A391B]/85 border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-5 md:px-7 lg:px-10 relative">
          <div className="flex items-center h-14 sm:h-16 md:h-14 md:justify-between">
            {/* Logo/Brand Section - Optimized for iPhone SE */}
            <Link href="#hero" className="flex-shrink-0 group relative z-10">
              <div className="flex items-center gap-1.5 sm:gap-2.5 md:gap-3">


                {/* Names - Always in a row */}
                <div className="flex flex-row items-center gap-1">
                  <span className="text-sm sm:text-base md:text-lg lg:text-xl font-[family-name:var(--font-crimson)] font-bold text-[#FD9210] group-hover:text-white transition-all duration-300 tracking-[0.1em] sm:tracking-[0.15em] md:tracking-[0.2em] uppercase leading-tight drop-shadow-md">
                  Sinead Gloria L. Heussaf
                  </span>
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex gap-1.5 lg:gap-3 items-center">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3 lg:px-5 py-2 text-xs lg:text-sm font-[family-name:var(--font-crimson)] font-semibold tracking-[0.15em] transition-all duration-300 relative group rounded-full border ${
                      isActive
                        ? "text-white border-white/70 bg-[#FD9210]/30 shadow-lg shadow-black/20"
                        : "text-white/80 border-transparent hover:text-white hover:border-white/40 hover:bg-white/10"
                    }`}
                  >
                    {link.label}
                    <span
                      className={`absolute -bottom-1 left-4 right-4 h-0.5 bg-[#54A658] rounded-full transition-all duration-300 ${
                        isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                      }`}
                    />
                  </Link>
                );
              })}
            </div>

          </div>
        </div>
      </nav>

      {/* Mobile Dock Navigation - Fixed at bottom of viewport, optimized for iPhone SE */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-[100] pointer-events-none pb-safe">
        <Dock
          items={dockItems}
          panelHeight={64}
          baseItemSize={44}
          magnification={58}
          distance={140}
          className="bg-[#6A391B]/95 backdrop-blur-lg pointer-events-auto shadow-2xl border-t border-[#FD9210]/25"
        />
      </div>
    </>
  );
}
