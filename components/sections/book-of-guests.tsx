"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Loader2,
  Mail,
  MessageSquare,
  Heart,
  User,
} from "lucide-react";

interface Guest {
  Name: string;
  Email: string;
  RSVP: string;
  Guest: string;
  Message: string;
}

export function BookOfGuests() {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalGuests, setTotalGuests] = useState(0);

  const getInitials = (name: string) => {
    if (!name) return "?";
    const parts = name.trim().split(/\s+/).filter(Boolean).slice(0, 2);
    return parts.map((p) => p[0]?.toUpperCase()).join("") || "?";
  };

  const fetchGuests = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/guests", { cache: "no-store" });

      if (!response.ok) {
        throw new Error("Failed to fetch guest list");
      }

      const data: Guest[] = await response.json();

      // Filter only attending guests and normalize Guest field
      const attendingGuests = data
        .filter((guest) => guest.RSVP === "Yes")
        .map((guest) => ({
          ...guest,
          Guest: guest.Guest || "1", // Ensure Guest field exists
        }));

      // Calculate total guests by summing the Guest column values
      const totalGuestCount = attendingGuests.reduce((sum, guest) => {
        const guestCount = parseInt(String(guest.Guest)) || 1;
        return sum + guestCount;
      }, 0);

      setGuests(attendingGuests);
      setTotalGuests(totalGuestCount);
    } catch (error: any) {
      console.error("Failed to load guests:", error);
      setError(error?.message || "Failed to load guest list");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchGuests();

    // Set up event listener for RSVP updates
    const handleRsvpUpdate = () => {
      // Add a small delay to allow Google Sheets to update
      setTimeout(() => {
        fetchGuests();
      }, 2000);
    };

    window.addEventListener("rsvpUpdated", handleRsvpUpdate);

    return () => {
      window.removeEventListener("rsvpUpdated", handleRsvpUpdate);
    };
  }, []);

  return (
    <div
      id="guests"
      className="relative z-[55] isolate bg-[#1B0D05] py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28 overflow-hidden"
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
        <p className="text-[0.65rem] sm:text-xs md:text-sm uppercase tracking-[0.25em] sm:tracking-[0.3em] md:tracking-[0.35em] text-[#FDDBB2]/70 mb-2 sm:mb-3 md:mb-4">Celebrating Together</p>
        <h2 className="fugaz-one-regular text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-white mb-4 sm:mb-6 md:mb-8 uppercase tracking-[0.1em] sm:tracking-[0.12em] md:tracking-[0.15em]">
          Book of Guests
        </h2>

        <p className="text-sm sm:text-base md:text-lg lg:text-xl font-[family-name:var(--font-inter)] text-white/85 max-w-2xl mx-auto leading-relaxed tracking-wide px-2 sm:px-4">
          Join us in celebrating the beautiful souls who will make our Havana nights unforgettable. Each name represents a cherished presence in our journey.
        </p>
      </div>

      {/* Guests content */}
      <div className="relative z-20">
        {/* Stats card */}
        <div className="mb-6 sm:mb-8 md:mb-10 lg:mb-12 px-2 sm:px-3 md:px-4 lg:px-6">
          <div className="relative max-w-3xl mx-auto group">
            <div className="absolute -inset-1 sm:-inset-2 rounded-2xl sm:rounded-[28px] md:rounded-[36px] bg-gradient-to-br from-[#FD9210]/25 via-transparent to-transparent blur-3xl opacity-70 group-hover:opacity-100 transition-opacity" />

            <div className="relative bg-white/5 backdrop-blur-2xl rounded-xl sm:rounded-2xl md:rounded-[28px] lg:rounded-[32px] border border-white/15 shadow-[0_35px_90px_rgba(0,0,0,0.65)] overflow-hidden">
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-px rounded-[calc(1rem-1px)] sm:rounded-[calc(1.5rem-1px)] md:rounded-[calc(1.75rem-1px)] lg:rounded-[30px] border border-white/10" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#FFFFFF0D,transparent_65%)]" />
              </div>

              {/* Content */}
              <div className="relative z-10 p-4 sm:p-6 md:p-8 lg:p-10 text-white">
                <div className="mb-3 sm:mb-4 md:mb-6">
                  <h3 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-[family-name:var(--font-inter)] font-semibold text-white leading-tight sm:leading-normal">
                    {totalGuests} {totalGuests === 1 ? "Guest" : "Guests"} Joining Our Celebration
                  </h3>
                  <p className="text-[0.65rem] sm:text-xs md:text-sm lg:text-base text-white/70 font-[family-name:var(--font-inter)] mt-0.5 sm:mt-1">
                    {guests.length}{" "}
                    {guests.length === 1 ? "RSVP confirmed" : "RSVPs confirmed"}
                  </p>
                </div>
                <p className="text-xs sm:text-sm md:text-base lg:text-lg text-white/85 font-[family-name:var(--font-inter)] leading-relaxed">
                  Your presence makes our Havana nights celebration even more special. We're grateful for each and every one of you!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Guest list container */}
        <div className="max-w-5xl mx-auto px-2 sm:px-3 md:px-4 lg:px-6 xl:px-8">
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
                      <span className="text-white font-[family-name:var(--font-inter)] text-sm sm:text-base md:text-lg tracking-[0.15em] sm:tracking-[0.2em] uppercase">
                        Loading guests...
                      </span>
                    </div>
                  </div>
                ) : error ? (
                  <div className="flex items-center justify-center py-12 sm:py-16 md:py-20 lg:py-24">
                    <div className="text-center px-2">
                      <MessageSquare className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-red-300 mx-auto mb-3 sm:mb-4" />
                      <p className="text-red-200 font-[family-name:var(--font-inter)] text-sm sm:text-base md:text-lg mb-2">
                        {error}
                      </p>
                    </div>
                  </div>
                ) : guests.length === 0 ? (
                  <div className="flex items-center justify-center py-12 sm:py-16 md:py-20 lg:py-24">
                    <div className="text-center px-2">
                      <div className="bg-white/10 backdrop-blur-sm w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 border border-white/20">
                        <Heart className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-[#FDDBB2]" />
                      </div>
                      <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-[family-name:var(--font-inter)] font-semibold text-white mb-1.5 sm:mb-2">
                        No guests have RSVP'd yet
                      </h3>
                      <p className="text-xs sm:text-sm md:text-base text-white/70 font-[family-name:var(--font-inter)] max-w-md mx-auto leading-relaxed">
                        Be the first to RSVP and help us kick off this magical celebration!
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2 sm:space-y-3 md:space-y-4 relative z-10">
                    {guests.map((guest, index) => (
                      <div
                        key={index}
                        className="group relative bg-white/5 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5 lg:p-6 border border-white/15 hover:border-white/25 transition-all duration-300 hover:shadow-lg hover:bg-white/8"
                      >
                        <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 md:gap-4">
                          {/* Avatar */}
                          <div className="relative h-9 w-9 sm:h-10 sm:w-10 md:h-12 md:w-12 lg:h-14 lg:w-14 flex-shrink-0">
                            <div className="h-full w-full rounded-full bg-white/10 backdrop-blur-sm text-[#FDDBB2] flex items-center justify-center font-[family-name:var(--font-inter)] font-semibold shadow-md ring-1 sm:ring-2 ring-white/20 border border-white/20 text-xs sm:text-sm md:text-base">
                              {getInitials(guest.Name)}
                            </div>
                          </div>

                          {/* Guest Info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-3">
                              <div className="flex-1 pr-12 sm:pr-0 min-w-0">
                                <h4 className="font-[family-name:var(--font-inter)] text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-white mb-0.5 sm:mb-1 group-hover:text-[#FDDBB2] transition-colors duration-200 truncate sm:break-words">
                                  {guest.Name}
                                </h4>
                                {guest.Email && guest.Email !== "Pending" && (
                                  <div className="flex items-center text-[0.65rem] sm:text-xs md:text-sm text-white/70 mt-0.5">
                                    <Mail className="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-4 md:w-4 mr-1 sm:mr-1.5 text-[#FDDBB2] flex-shrink-0" />
                                    <span className="font-[family-name:var(--font-inter)] break-all text-[0.65rem] sm:text-xs md:text-sm">
                                      {guest.Email}
                                    </span>
                                  </div>
                                )}
                              </div>
                              {/* Guest count badge */}
                              <div className="absolute right-2.5 top-2.5 sm:static sm:right-auto sm:top-auto flex items-center gap-1 sm:gap-1.5 md:gap-2">
                                <User className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 text-[#FDDBB2] flex-shrink-0" />
                                <span className="inline-flex items-center justify-center px-2 sm:px-2.5 md:px-3 py-0.5 sm:py-1 bg-white/10 backdrop-blur-sm text-white rounded-full text-[0.65rem] sm:text-xs md:text-sm font-[family-name:var(--font-inter)] font-semibold border border-white/20 whitespace-nowrap">
                                  {guest.Guest
                                    ? parseInt(String(guest.Guest)) || 1
                                    : 1}{" "}
                                  {parseInt(String(guest.Guest || "1")) === 1
                                    ? "guest"
                                    : "guests"}
                                </span>
                              </div>
                            </div>

                            {/* Message */}
                            {guest.Message && (
                              <div className="mt-2 sm:mt-3 md:mt-4 pt-2 sm:pt-3 md:pt-4 border-t border-white/15">
                                <div className="flex items-start gap-1.5 sm:gap-2 md:gap-3">
                                  <MessageSquare className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 text-[#FDDBB2] flex-shrink-0 mt-0.5" />
                                  <p className="text-[0.65rem] sm:text-xs md:text-sm lg:text-base text-white/85 font-[family-name:var(--font-inter)] leading-relaxed italic flex-1">
                                    "{guest.Message}"
                                  </p>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
