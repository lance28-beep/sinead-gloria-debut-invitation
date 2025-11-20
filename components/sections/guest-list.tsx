"use client";

import { useState, useEffect, useRef } from "react";
import { Section } from "@/components/section";
import { Button } from "@/components/ui/button";
import {
  Search,
  CheckCircle,
  XCircle,
  AlertCircle,
  User,
  Mail,
  MessageSquare,
  RefreshCw,
  X,
  Heart,
  Sparkles,
  Phone,
  UserPlus,
} from "lucide-react";

interface Guest {
  Name: string;
  Email: string;
  RSVP: string;
  Guest: string;
  Message: string;
}

export function GuestList() {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [filteredGuests, setFilteredGuests] = useState<Guest[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [requestSuccess, setRequestSuccess] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [hasResponded, setHasResponded] = useState(false);
  const [showRequestModal, setShowRequestModal] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    Name: "",
    Email: "",
    RSVP: "",
    Guest: "1",
    Message: "",
  });

  // Request form state
  const [requestFormData, setRequestFormData] = useState({
    Name: "",
    Email: "",
    Phone: "",
    Guest: "1",
    Message: "",
  });

  const searchRef = useRef<HTMLDivElement>(null);

  // Fetch all guests on component mount
  useEffect(() => {
    fetchGuests();
  }, []);

  // Filter guests based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredGuests([]);
      setIsSearching(false);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = guests.filter((guest) =>
      guest.Name.toLowerCase().includes(query),
    );

    setFilteredGuests(filtered);
    setIsSearching(filtered.length > 0);
  }, [searchQuery, guests]);

  // Close search dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsSearching(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const fetchGuests = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/guests");
      if (!response.ok) {
        throw new Error("Failed to fetch guests");
      }
      const data = await response.json();
      setGuests(data);
    } catch (error) {
      console.error("Error fetching guests:", error);
      setError("Failed to load guest list");
      setTimeout(() => setError(null), 5000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchSelect = (guest: Guest) => {
    setSelectedGuest(guest);
    setSearchQuery(guest.Name);
    setIsSearching(false);

    // Set form data with existing guest info
    setFormData({
      Name: guest.Name,
      Email: guest.Email && guest.Email !== "Pending" ? guest.Email : "",
      RSVP: guest.RSVP || "",
      Guest: guest.Guest && guest.Guest !== "" ? guest.Guest : "1",
      Message: guest.Message || "",
    });

    // Check if guest has already responded
    setHasResponded(!!(guest.RSVP && guest.RSVP.trim() !== ""));

    // Show modal
    setShowModal(true);
  };

  const handleFormChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitRSVP = async () => {
    if (!selectedGuest) return;

    if (!formData.RSVP) {
      setError("Please select if you can attend");
      setTimeout(() => setError(null), 5000);
      return;
    }

    // Validate guest count if attending
    if (
      formData.RSVP === "Yes" &&
      (!formData.Guest || parseInt(formData.Guest) < 1)
    ) {
      setError("Please enter the number of guests (minimum 1)");
      setTimeout(() => setError(null), 5000);
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch("/api/guests", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "update",
          originalName: selectedGuest.Name,
          Name: formData.Name,
          Email: formData.Email || "Pending",
          RSVP: formData.RSVP,
          Guest: formData.RSVP === "Yes" ? formData.Guest || "1" : "0",
          Message: formData.Message,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit RSVP");
      }

      // Show success and close modal after delay
      setSuccess("Thank you for your response!");
      setHasResponded(true);

      // Trigger event to refresh Book of Guests
      window.dispatchEvent(new Event("rsvpUpdated"));

      // Close modal and reset after showing success
      setTimeout(() => {
        setShowModal(false);
        setSearchQuery("");
        setSelectedGuest(null);
        setSuccess(null);
        fetchGuests();
      }, 3000);
    } catch (error) {
      console.error("Error submitting RSVP:", error);
      setError("Failed to submit RSVP. Please try again.");
      setTimeout(() => setError(null), 5000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedGuest(null);
    setSearchQuery("");
    setFormData({ Name: "", Email: "", RSVP: "", Guest: "1", Message: "" });
    setHasResponded(false);
    setError(null);
  };

  const handleSubmitRequest = async () => {
    if (!requestFormData.Name) {
      setError("Name is required");
      setTimeout(() => setError(null), 5000);
      return;
    }

    setIsLoading(true);
    setError(null);
    setRequestSuccess(null);

    try {
      const response = await fetch("/api/guest-requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestFormData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit request");
      }

      setRequestSuccess("Request submitted! We'll review and get back to you.");

      // Close modal and reset after showing success
      setTimeout(() => {
        setShowRequestModal(false);
        setRequestFormData({
          Name: "",
          Email: "",
          Phone: "",
          Guest: "1",
          Message: "",
        });
        setSearchQuery("");
        setRequestSuccess(null);
      }, 3000);
    } catch (error) {
      console.error("Error submitting request:", error);
      setError("Failed to submit request. Please try again.");
      setTimeout(() => setError(null), 5000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseRequestModal = () => {
    setShowRequestModal(false);
    setRequestFormData({
      Name: "",
      Email: "",
      Phone: "",
      Guest: "1",
      Message: "",
    });
    setError(null);
    setRequestSuccess(null);
  };

  return (
    <Section
      id="guest-list"
      className="relative z-[60] isolate py-10 sm:py-12 md:py-16 lg:py-20 xl:py-24 bg-[#1B0D05] overflow-visible"
    >
      <div
        className="absolute inset-0 bg-cover bg-center opacity-60"
        style={{ backgroundImage: "url('/havana/woodbackground.png')" }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#140A03]/95 via-[#1F1207]/90 to-[#120902]/95" aria-hidden="true" />
      
      {/* Section Header */}
      <div className="relative z-10 text-center mb-8 sm:mb-12 md:mb-16 lg:mb-20 px-3 sm:px-4 md:px-6">
        <p className="text-[0.65rem] sm:text-xs md:text-sm uppercase tracking-[0.25em] sm:tracking-[0.3em] md:tracking-[0.35em] text-[#FDDBB2]/70 mb-2 sm:mb-3 md:mb-4">Your Response</p>
        <h2 className="fugaz-one-regular text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-white mb-4 sm:mb-6 md:mb-8 uppercase tracking-[0.1em] sm:tracking-[0.12em] md:tracking-[0.15em]">
          RSVP
        </h2>

        <div className="space-y-3 sm:space-y-4 md:space-y-5">
          <p className="text-sm sm:text-base md:text-lg lg:text-xl font-[family-name:var(--font-inter)] text-white/85 max-w-2xl mx-auto leading-relaxed tracking-wide px-2 sm:px-4">
            We're thrilled to celebrate this special moment with you! Your presence would make our Havana nights even more magical.
          </p>
          <p className="text-xs sm:text-sm md:text-base lg:text-lg font-[family-name:var(--font-inter)] text-white/80 max-w-xl mx-auto leading-relaxed tracking-wide px-2 sm:px-4">
            Kindly confirm your attendance by December 1
          </p>
        </div>
      </div>

      {/* Search Section */}
      <div className="relative z-10 max-w-3xl mx-auto px-3 sm:px-4 md:px-6">
        {/* Main card with elegant styling */}
        <div className="relative group">
          <div className="absolute -inset-2 rounded-[36px] bg-gradient-to-br from-[#FD9210]/25 via-transparent to-transparent blur-3xl opacity-70 group-hover:opacity-100 transition-opacity" />

          <div
            className="relative bg-white/5 backdrop-blur-2xl rounded-[32px] border border-white/15 shadow-[0_35px_90px_rgba(0,0,0,0.65)] overflow-visible"
            style={{ overflow: "visible" }}
          >
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-px rounded-[30px] border border-white/10" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#FFFFFF0D,transparent_65%)]" />
            </div>

            {/* Card content */}
            <div className="relative p-6 sm:p-8 md:p-10 lg:p-12 text-white">
              <div className="relative z-10 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="bg-white/10 backdrop-blur-sm p-2 rounded-xl shadow-lg border border-white/20">
                    <Search className="h-5 w-5 text-[#FDDBB2]" />
                  </div>
                  <div>
                    <label className="block text-base sm:text-lg font-semibold text-white font-[family-name:var(--font-inter)] mb-1">
                      Find Your Name
                    </label>
                    <p className="text-xs sm:text-sm text-white/70 font-[family-name:var(--font-inter)]">
                      Type as you search to see instant results
                    </p>
                  </div>
                </div>
                <div
                  ref={searchRef}
                  className="relative overflow-visible"
                  style={{ zIndex: 50 }}
                >
                  <div className="relative">
                    <Search className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-white/40 pointer-events-none transition-colors duration-200" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Type your name..."
                      className="w-full pl-10 sm:pl-14 pr-3 sm:pr-6 py-3.5 sm:py-5 border-2 border-white/20 focus:border-[#FDDBB2] rounded-xl sm:rounded-2xl text-sm sm:text-base md:text-lg font-[family-name:var(--font-inter)] placeholder:text-white/40 transition-all duration-300 hover:border-white/30 focus:ring-4 focus:ring-[#FDDBB2]/20 bg-white/10 backdrop-blur-sm shadow-inner focus:shadow-lg text-white"
                    />
                  </div>
                  {/* Autocomplete dropdown */}
                  {isSearching && filteredGuests.length > 0 && (
                    <div
                      className="absolute z-50 w-full mt-2 sm:mt-3 bg-[#1B0D05]/95 backdrop-blur-lg border border-white/20 rounded-xl shadow-2xl overflow-hidden"
                      style={{
                        position: "absolute",
                        top: "100%",
                        zIndex: 50,
                      }}
                    >
                      <div className="relative">
                        {filteredGuests.map((guest, index) => (
                          <button
                            key={index}
                            onClick={() => handleSearchSelect(guest)}
                            className="w-full px-4 sm:px-5 py-3.5 sm:py-4 text-left hover:bg-white/10 active:bg-white/15 transition-all duration-200 flex items-center gap-3 sm:gap-4 border-b border-white/10 last:border-b-0 group"
                          >
                            <div className="relative flex-shrink-0">
                              <div className="bg-white/10 backdrop-blur-sm p-1.5 sm:p-2 rounded-full shadow-md group-hover:shadow-lg transition-all duration-300 border border-white/20">
                                <User className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#FDDBB2]" />
                              </div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="font-semibold text-sm sm:text-base text-white font-[family-name:var(--font-inter)] group-hover:text-[#FDDBB2] transition-colors duration-200 truncate">
                                {guest.Name}
                              </div>
                              {guest.Email && guest.Email !== "Pending" && (
                                <div className="text-[10px] sm:text-xs text-white/60 font-[family-name:var(--font-inter)] truncate mt-0.5">
                                  {guest.Email}
                                </div>
                              )}
                            </div>
                            <div className="text-white/40 group-hover:text-[#FDDBB2] group-hover:translate-x-1 transition-all duration-200 flex-shrink-0">
                              <svg
                                className="w-4 h-4 sm:w-5 sm:h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 5l7 7-7 7"
                                />
                              </svg>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  {searchQuery && filteredGuests.length === 0 && (
                    <div
                      className="absolute z-50 w-full mt-2 sm:mt-3 bg-[#1B0D05]/95 backdrop-blur-lg border border-white/20 rounded-xl shadow-2xl overflow-hidden"
                      style={{
                        position: "absolute",
                        top: "100%",
                        zIndex: 50,
                      }}
                    >
                      <div className="p-4 sm:p-5">
                        <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                          <div className="bg-white/10 backdrop-blur-sm p-1.5 sm:p-2 rounded-xl flex-shrink-0 shadow-md border border-white/20">
                            <UserPlus className="h-4 w-4 sm:h-5 sm:w-5 text-[#FDDBB2]" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-sm sm:text-base text-white font-[family-name:var(--font-inter)] mb-1">
                              Not finding your name?
                            </h4>
                            <p className="text-xs sm:text-sm text-white/70 font-[family-name:var(--font-inter)] leading-relaxed">
                              We'd love to celebrate with you! Send a request to join our Havana nights celebration.
                            </p>
                          </div>
                        </div>
                        <Button
                          onClick={() => {
                            setRequestFormData({
                              ...requestFormData,
                              Name: searchQuery,
                            });
                            setShowRequestModal(true);
                          }}
                          className="w-full bg-white/10 hover:bg-white/15 text-white border border-white/20 py-2.5 sm:py-3 rounded-xl text-sm sm:text-base font-[family-name:var(--font-inter)] font-semibold shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] backdrop-blur-sm"
                        >
                          <UserPlus className="h-3 w-3 sm:h-4 sm:w-4 mr-2 inline" />
                          Request to Join
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RSVP Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-1.5 sm:p-3 md:p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-md sm:max-w-2xl mx-1.5 sm:mx-3 bg-[#1B0D05] rounded-xl sm:rounded-2xl md:rounded-3xl shadow-2xl border border-white/15 overflow-hidden animate-in zoom-in-95 duration-300 max-h-[98vh] flex flex-col">
            <div
              className="absolute inset-0 bg-cover bg-center opacity-40"
              style={{ backgroundImage: "url('/havana/woodbackground.png')" }}
              aria-hidden="true"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#140A03]/95 via-[#1F1207]/90 to-[#120902]/95" aria-hidden="true" />
            
            {/* Modal Header with Gradient */}
            <div className="relative bg-gradient-to-r from-[#1B0D05] via-[#2A1508] to-[#1B0D05] p-2.5 sm:p-4 md:p-6 lg:p-8 flex-shrink-0 border-b border-white/10">
              <div className="absolute inset-0 bg-gradient-to-br from-[#FDDBB2]/10 to-transparent"></div>
              <div className="relative flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 sm:gap-3 mb-1.5 sm:mb-2 md:mb-3">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20 flex-shrink-0">
                      <Heart className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 text-[#FDDBB2]" />
                    </div>
                    <h3 className="text-base sm:text-xl md:text-2xl lg:text-3xl font-[family-name:var(--font-inter)] font-semibold text-white truncate">
                      You're Invited!
                    </h3>
                  </div>
                  <div className="space-y-2 sm:space-y-3">
                    <p className="text-white/95 text-xs sm:text-sm md:text-base lg:text-lg font-[family-name:var(--font-inter)] leading-tight sm:leading-normal">
                      Dear{" "}
                      <span className="font-bold text-[#FDDBB2]">
                        {selectedGuest?.Name}
                      </span>
                      , we're delighted to invite you to celebrate this special Havana nights celebration with us!
                    </p>
                    <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-2.5 sm:px-3 py-1.5 sm:py-2 border border-white/20">
                      <User className="h-3 w-3 sm:h-4 sm:w-4 text-[#FDDBB2]" />
                      <p className="text-white text-[10px] sm:text-xs md:text-sm font-[family-name:var(--font-inter)] font-medium">
                        We have reserved{" "}
                        <span className="font-bold text-[#FDDBB2]">
                          {selectedGuest?.Guest || "1"}
                        </span>{" "}
                        seat
                        {selectedGuest?.Guest &&
                        parseInt(selectedGuest.Guest) > 1
                          ? "s"
                          : ""}{" "}
                        for you
                      </p>
                    </div>
                  </div>
                </div>
                {!hasResponded && (
                  <button
                    onClick={handleCloseModal}
                    className="text-white/80 hover:text-white transition-colors p-1 sm:p-2 hover:bg-white/10 rounded-full flex-shrink-0"
                  >
                    <X className="h-4 w-4 sm:h-5 sm:w-5" />
                  </button>
                )}
              </div>
            </div>

            {/* Modal Content */}
            <div className="relative p-2.5 sm:p-4 md:p-6 lg:p-8 overflow-y-auto flex-1 min-h-0 text-white">
              {hasResponded ? (
                // Thank you message for guests who already responded
                <div className="text-center py-3 sm:py-6 md:py-8">
                  <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-br from-[#FDDBB2]/20 to-[#FDDBB2]/10 rounded-full mb-3 sm:mb-4 md:mb-6 border border-[#FDDBB2]/30">
                    <CheckCircle className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 text-[#FDDBB2]" />
                  </div>
                  <h4 className="text-base sm:text-xl md:text-2xl font-[family-name:var(--font-inter)] font-semibold text-white mb-2 sm:mb-3">
                    Thank You for Responding!
                  </h4>
                  <p className="text-white/80 font-[family-name:var(--font-inter)] text-xs sm:text-sm md:text-base mb-3 sm:mb-4 md:mb-6 px-2">
                    We've received your RSVP and are thrilled to celebrate this special moment with you!
                  </p>
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-3 sm:p-4 md:p-6 border border-white/15 space-y-2.5 sm:space-y-3 md:space-y-4">
                    <div className="flex items-center justify-center gap-2 sm:gap-3 mb-1.5 sm:mb-2 md:mb-3">
                      {selectedGuest?.RSVP === "Yes" && (
                        <>
                          <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-[#FDDBB2]" />
                          <span className="text-sm sm:text-base md:text-lg font-semibold font-[family-name:var(--font-inter)] text-[#FDDBB2]">
                            You're Attending!
                          </span>
                        </>
                      )}
                      {selectedGuest?.RSVP === "No" && (
                        <>
                          <XCircle className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-white/60" />
                          <span className="text-sm sm:text-base md:text-lg font-semibold font-[family-name:var(--font-inter)] text-white/80">
                            Unable to Attend
                          </span>
                        </>
                      )}
                    </div>
                    {selectedGuest?.RSVP === "Yes" && selectedGuest?.Guest && (
                      <div className="bg-white/5 backdrop-blur-sm rounded-lg p-2.5 sm:p-3 md:p-4 border border-white/15">
                        <div className="text-center">
                          <p className="text-[10px] sm:text-xs md:text-sm text-white/70 font-[family-name:var(--font-inter)] mb-0.5 sm:mb-1 font-medium">
                            Number of Guests
                          </p>
                          <p className="text-xl sm:text-2xl md:text-3xl font-bold font-[family-name:var(--font-inter)] text-[#FDDBB2]">
                            {selectedGuest.Guest || "1"}
                          </p>
                        </div>
                      </div>
                    )}
                    {selectedGuest &&
                      selectedGuest.Message &&
                      selectedGuest.Message.trim() !== "" && (
                        <div className="pt-2 sm:pt-3 border-t border-white/15">
                          <p className="text-[10px] sm:text-xs md:text-sm text-white/80 font-[family-name:var(--font-inter)] italic px-1">
                            "{selectedGuest.Message}"
                          </p>
                        </div>
                      )}
                  </div>
                  <Button
                    onClick={handleCloseModal}
                    className="mt-3 sm:mt-4 md:mt-6 bg-white/10 hover:bg-white/15 text-white border border-white/20 px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 rounded-xl text-xs sm:text-sm md:text-base font-[family-name:var(--font-inter)] font-semibold backdrop-blur-sm"
                  >
                    Close
                  </Button>
                </div>
              ) : (
                // RSVP Form for guests who haven't responded
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmitRSVP();
                  }}
                  className="space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6"
                >
                  {/* Can you attend? */}
                  <div>
                    <label className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm md:text-lg font-semibold text-white mb-1.5 sm:mb-2 md:mb-4 font-[family-name:var(--font-inter)]">
                      <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 text-[#FDDBB2] flex-shrink-0" />
                      <span className="leading-tight">Can you attend? *</span>
                    </label>
                    <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4">
                      <button
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({ ...prev, RSVP: "Yes" }))
                        }
                        className={`relative p-2 sm:p-3 md:p-4 lg:p-6 rounded-xl sm:rounded-2xl border-2 sm:border-4 transition-all duration-300 ${
                          formData.RSVP === "Yes"
                            ? "border-[#FDDBB2] bg-[#FDDBB2]/10 shadow-lg scale-105 backdrop-blur-sm"
                            : "border-white/20 bg-white/5 hover:border-white/30 hover:shadow-md backdrop-blur-sm"
                        }`}
                      >
                        <div className="flex items-center justify-center gap-1.5 sm:gap-2 md:gap-3">
                          <CheckCircle
                            className={`h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 flex-shrink-0 ${
                              formData.RSVP === "Yes"
                                ? "text-[#FDDBB2]"
                                : "text-white/40"
                            }`}
                          />
                          <span
                            className={`text-xs sm:text-sm md:text-base lg:text-xl font-bold font-[family-name:var(--font-inter)] ${
                              formData.RSVP === "Yes"
                                ? "text-[#FDDBB2]"
                                : "text-white"
                            }`}
                          >
                            Yes!
                          </span>
                        </div>
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({ ...prev, RSVP: "No" }))
                        }
                        className={`relative p-2 sm:p-3 md:p-4 lg:p-6 rounded-xl sm:rounded-2xl border-2 sm:border-4 transition-all duration-300 ${
                          formData.RSVP === "No"
                            ? "border-white/40 bg-white/10 shadow-lg scale-105 backdrop-blur-sm"
                            : "border-white/20 bg-white/5 hover:border-white/30 hover:shadow-md backdrop-blur-sm"
                        }`}
                      >
                        <div className="flex items-center justify-center gap-1.5 sm:gap-2 md:gap-3">
                          <XCircle
                            className={`h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 flex-shrink-0 ${
                              formData.RSVP === "No"
                                ? "text-white/80"
                                : "text-white/40"
                            }`}
                          />
                          <span
                            className={`text-xs sm:text-sm md:text-base lg:text-xl font-bold font-[family-name:var(--font-inter)] ${
                              formData.RSVP === "No"
                                ? "text-white/90"
                                : "text-white"
                            }`}
                          >
                            Sorry, No
                          </span>
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Number of Guests - Only show when RSVP is "Yes" */}
                  {formData.RSVP === "Yes" && (
                    <div>
                      <label className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm md:text-lg font-semibold text-white mb-1.5 sm:mb-2 md:mb-3 font-[family-name:var(--font-inter)]">
                        <User className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 text-[#FDDBB2] flex-shrink-0" />
                        <span className="leading-tight">
                          Number of Guests *
                        </span>
                      </label>
                      <input
                        type="number"
                        name="Guest"
                        value={formData.Guest}
                        onChange={handleFormChange}
                        min="1"
                        required
                        placeholder="How many guests?"
                        className="w-full px-2.5 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 border-2 border-white/20 focus:border-[#FDDBB2] rounded-lg sm:rounded-xl text-xs sm:text-sm md:text-base font-[family-name:var(--font-inter)] placeholder:text-white/40 transition-all duration-300 focus:ring-2 sm:focus:ring-4 focus:ring-[#FDDBB2]/20 bg-white/10 backdrop-blur-sm text-white"
                      />
                    </div>
                  )}

                  {/* Message to the couple */}
                  <div>
                    <label className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm md:text-lg font-semibold text-white mb-1.5 sm:mb-2 md:mb-3 font-[family-name:var(--font-inter)]">
                      <MessageSquare className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 text-[#FDDBB2] flex-shrink-0" />
                      <span className="leading-tight">
                        Your Message to the Couple
                      </span>
                      <span className="text-[10px] sm:text-xs md:text-sm font-normal text-white/60">
                        (Optional)
                      </span>
                    </label>
                    <textarea
                      name="Message"
                      value={formData.Message}
                      onChange={handleFormChange}
                      placeholder="Share your excitement..."
                      rows={3}
                      className="w-full px-2.5 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 border-2 border-white/20 focus:border-[#FDDBB2] rounded-lg sm:rounded-xl text-xs sm:text-sm md:text-base font-[family-name:var(--font-inter)] placeholder:text-white/40 transition-all duration-300 focus:ring-2 sm:focus:ring-4 focus:ring-[#FDDBB2]/20 resize-none bg-white/10 backdrop-blur-sm text-white"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm md:text-lg font-semibold text-white mb-1.5 sm:mb-2 md:mb-3 font-[family-name:var(--font-inter)] flex-wrap">
                      <Mail className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 text-[#FDDBB2] flex-shrink-0" />
                      <span className="leading-tight">Your Email Address</span>
                      <span className="text-[10px] sm:text-xs md:text-sm font-normal text-white/60">
                        (Optional)
                      </span>
                    </label>
                    <input
                      type="email"
                      name="Email"
                      value={formData.Email}
                      onChange={handleFormChange}
                      placeholder="your.email@example.com"
                      className="w-full px-2.5 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 border-2 border-white/20 focus:border-[#FDDBB2] rounded-lg sm:rounded-xl text-xs sm:text-sm md:text-base font-[family-name:var(--font-inter)] placeholder:text-white/40 transition-all duration-300 focus:ring-2 sm:focus:ring-4 focus:ring-[#FDDBB2]/20 bg-white/10 backdrop-blur-sm text-white"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2 sm:pt-3 md:pt-4">
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-white/10 hover:bg-white/15 text-white border border-white/20 py-2.5 sm:py-3 md:py-3.5 lg:py-4 rounded-lg sm:rounded-xl text-xs sm:text-sm md:text-base lg:text-lg font-[family-name:var(--font-inter)] font-semibold shadow-xl transition-all duration-300 hover:shadow-2xl disabled:opacity-70 min-h-[40px] sm:min-h-[44px] md:min-h-[48px] backdrop-blur-sm"
                    >
                      {isLoading ? (
                        <div className="flex items-center justify-center gap-2 sm:gap-3">
                          <RefreshCw className="h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
                          <span className="text-xs sm:text-sm md:text-base">
                            Submitting...
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-2 sm:gap-3">
                          <Heart className="h-4 w-4 sm:h-5 sm:w-5" />
                          <span className="text-xs sm:text-sm md:text-base">
                            Submit RSVP
                          </span>
                        </div>
                      )}
                    </Button>
                  </div>
                </form>
              )}
            </div>

            {/* Enhanced Success Overlay */}
            {success && (
              <div className="absolute inset-0 bg-gradient-to-br from-[#1B0D05]/98 via-[#2A1508]/98 to-[#1B0D05]/98 backdrop-blur-md flex items-center justify-center z-50 animate-in fade-in duration-300 p-4">
                <div className="text-center p-4 sm:p-6 md:p-8 max-w-sm mx-auto">
                  {/* Enhanced Icon Circle */}
                  <div className="relative inline-flex items-center justify-center mb-3 sm:mb-4 md:mb-5 lg:mb-6">
                    {/* Animated rings */}
                    <div className="absolute inset-0 rounded-full border-2 sm:border-4 border-[#FDDBB2]/20 animate-ping" />
                    <div className="absolute inset-0 rounded-full border-2 border-[#FDDBB2]/30" />
                    {/* Icon container */}
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gradient-to-br from-[#FDDBB2] to-white rounded-full flex items-center justify-center shadow-xl">
                      <CheckCircle
                        className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-[#1B0D05]"
                        strokeWidth={2.5}
                      />
                    </div>
                  </div>

                  {/* Title */}
                  <h4 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-[family-name:var(--font-inter)] font-bold text-[#FDDBB2] mb-2 sm:mb-3 md:mb-4">
                    RSVP Confirmed!
                  </h4>

                  {/* Message based on RSVP response */}
                  {formData.RSVP === "Yes" && (
                    <div className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4 md:mb-5">
                      <p className="text-[#FDDBB2]/95 font-[family-name:var(--font-inter)] text-sm sm:text-base md:text-lg font-medium">
                        We're thrilled you'll be joining us!
                      </p>
                      <p className="text-[#FDDBB2]/80 font-[family-name:var(--font-inter)] text-xs sm:text-sm md:text-base">
                        Your response has been recorded
                      </p>
                    </div>
                  )}
                  {formData.RSVP === "No" && (
                    <p className="text-[#FDDBB2]/90 font-[family-name:var(--font-inter)] text-sm sm:text-base md:text-lg mb-3 sm:mb-4 md:mb-5">
                      We'll miss you, but thank you for letting us know.
                    </p>
                  )}
                  {!formData.RSVP && (
                    <p className="text-[#FDDBB2]/90 font-[family-name:var(--font-inter)] text-sm sm:text-base md:text-lg mb-3 sm:mb-4 md:mb-5">
                      Thank you for your response!
                    </p>
                  )}

                  {/* Subtle closing indicator */}
                  <div className="flex items-center justify-center gap-1.5 sm:gap-2 mt-3 sm:mt-4 md:mt-5">
                    <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-[#FDDBB2]/60 rounded-full animate-pulse" />
                    <p className="text-[#FDDBB2]/70 font-[family-name:var(--font-inter)] text-[10px] sm:text-xs md:text-sm">
                      This will close automatically
                    </p>
                    <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-[#FDDBB2]/60 rounded-full animate-pulse" />
                  </div>
                </div>
              </div>
            )}

            {/* Error message */}
            {error && !success && (
              <div className="px-2.5 sm:px-4 md:px-6 lg:px-8 pb-2.5 sm:pb-4 md:pb-6">
                <div className="bg-red-900/30 border-2 border-red-800/50 rounded-xl p-2.5 sm:p-3 md:p-4 backdrop-blur-sm">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-red-300 flex-shrink-0" />
                    <span className="text-red-200 font-semibold font-[family-name:var(--font-inter)] text-xs sm:text-sm">
                      {error}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Request to Join Modal */}
      {showRequestModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-1.5 sm:p-3 md:p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-md sm:max-w-2xl mx-1.5 sm:mx-3 bg-[#1B0D05] rounded-xl sm:rounded-2xl md:rounded-3xl shadow-2xl border border-white/15 overflow-hidden animate-in zoom-in-95 duration-300 max-h-[98vh] flex flex-col">
            <div
              className="absolute inset-0 bg-cover bg-center opacity-40"
              style={{ backgroundImage: "url('/havana/woodbackground.png')" }}
              aria-hidden="true"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#140A03]/95 via-[#1F1207]/90 to-[#120902]/95" aria-hidden="true" />
            
            {/* Modal Header with Gradient */}
            <div className="relative bg-gradient-to-r from-[#1B0D05] via-[#2A1508] to-[#1B0D05] p-2.5 sm:p-4 md:p-6 lg:p-8 flex-shrink-0 border-b border-white/10">
              <div className="absolute inset-0 bg-gradient-to-br from-[#FDDBB2]/10 to-transparent"></div>
              <div className="relative flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 sm:gap-3 mb-1.5 sm:mb-2 md:mb-3">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20 flex-shrink-0">
                      <UserPlus className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 text-[#FDDBB2]" />
                    </div>
                    <h3 className="text-base sm:text-xl md:text-2xl lg:text-3xl font-[family-name:var(--font-inter)] font-semibold text-white truncate">
                      Request to Join
                    </h3>
                  </div>
                  <p className="text-white/95 text-xs sm:text-sm md:text-base font-[family-name:var(--font-inter)] leading-tight sm:leading-normal">
                    {requestFormData.Name ? (
                      <>
                        Dear{" "}
                        <span className="font-bold text-[#FDDBB2]">
                          {requestFormData.Name}
                        </span>
                        , we'd love to celebrate with you! Send a request to join our Havana nights celebration.
                      </>
                    ) : (
                      <>We'd love to celebrate with you! Send a request to join our Havana nights celebration.</>
                    )}
                  </p>
                </div>
                <button
                  onClick={handleCloseRequestModal}
                  className="text-white/80 hover:text-white transition-colors p-1 sm:p-1.5 md:p-2 hover:bg-white/10 rounded-full flex-shrink-0"
                >
                  <X className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="relative p-2.5 sm:p-4 md:p-6 lg:p-8 overflow-y-auto flex-1 min-h-0 text-white">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmitRequest();
                }}
                className="space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6"
              >
                {/* Name */}
                <div>
                  <label className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm md:text-lg font-semibold text-white mb-1.5 sm:mb-2 md:mb-3 font-[family-name:var(--font-inter)]">
                    <User className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 text-[#FDDBB2] flex-shrink-0" />
                    <span className="leading-tight">Full Name *</span>
                  </label>
                  <input
                    type="text"
                    name="Name"
                    value={requestFormData.Name}
                    onChange={(e) =>
                      setRequestFormData({
                        ...requestFormData,
                        Name: e.target.value,
                      })
                    }
                    required
                    placeholder="Enter your full name"
                    className="w-full px-2.5 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 border-2 border-white/20 focus:border-[#FDDBB2] rounded-lg sm:rounded-xl text-xs sm:text-sm md:text-base font-[family-name:var(--font-inter)] placeholder:text-white/40 transition-all duration-300 focus:ring-2 sm:focus:ring-4 focus:ring-[#FDDBB2]/20 bg-white/10 backdrop-blur-sm text-white"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm md:text-lg font-semibold text-white mb-1.5 sm:mb-2 md:mb-3 font-[family-name:var(--font-inter)] flex-wrap">
                    <Mail className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 text-[#FDDBB2] flex-shrink-0" />
                    <span className="leading-tight">Email Address</span>
                    <span className="text-[10px] sm:text-xs md:text-sm font-normal text-white/60">
                      (Optional)
                    </span>
                  </label>
                  <input
                    type="email"
                    name="Email"
                    value={requestFormData.Email}
                    onChange={(e) =>
                      setRequestFormData({
                        ...requestFormData,
                        Email: e.target.value,
                      })
                    }
                    placeholder="your.email@example.com"
                    className="w-full px-2.5 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 border-2 border-white/20 focus:border-[#FDDBB2] rounded-lg sm:rounded-xl text-xs sm:text-sm md:text-base font-[family-name:var(--font-inter)] placeholder:text-white/40 transition-all duration-300 focus:ring-2 sm:focus:ring-4 focus:ring-[#FDDBB2]/20 bg-white/10 backdrop-blur-sm text-white"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm md:text-lg font-semibold text-white mb-1.5 sm:mb-2 md:mb-3 font-[family-name:var(--font-inter)] flex-wrap">
                    <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 text-[#FDDBB2] flex-shrink-0" />
                    <span className="leading-tight">Phone Number</span>
                    <span className="text-[10px] sm:text-xs md:text-sm font-normal text-white/60">
                      (Optional)
                    </span>
                  </label>
                  <input
                    type="tel"
                    name="Phone"
                    value={requestFormData.Phone}
                    onChange={(e) =>
                      setRequestFormData({
                        ...requestFormData,
                        Phone: e.target.value,
                      })
                    }
                    placeholder="+1 (555) 123-4567"
                    className="w-full px-2.5 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 border-2 border-white/20 focus:border-[#FDDBB2] rounded-lg sm:rounded-xl text-xs sm:text-sm md:text-base font-[family-name:var(--font-inter)] placeholder:text-white/40 transition-all duration-300 focus:ring-2 sm:focus:ring-4 focus:ring-[#FDDBB2]/20 bg-white/10 backdrop-blur-sm text-white"
                  />
                </div>

                {/* Number of Guests */}
                <div>
                  <label className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm md:text-lg font-semibold text-white mb-1.5 sm:mb-2 md:mb-3 font-[family-name:var(--font-inter)]">
                    <User className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 text-[#FDDBB2] flex-shrink-0" />
                    <span className="leading-tight">Number of Guests *</span>
                  </label>
                  <input
                    type="number"
                    name="Guest"
                    value={requestFormData.Guest}
                    onChange={(e) =>
                      setRequestFormData({
                        ...requestFormData,
                        Guest: e.target.value,
                      })
                    }
                    min="1"
                    required
                    placeholder="How many guests?"
                    className="w-full px-2.5 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 border-2 border-white/20 focus:border-[#FDDBB2] rounded-lg sm:rounded-xl text-xs sm:text-sm md:text-base font-[family-name:var(--font-inter)] placeholder:text-white/40 transition-all duration-300 focus:ring-2 sm:focus:ring-4 focus:ring-[#FDDBB2]/20 bg-white/10 backdrop-blur-sm text-white"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm md:text-lg font-semibold text-white mb-1.5 sm:mb-2 md:mb-3 font-[family-name:var(--font-inter)] flex-wrap">
                    <MessageSquare className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 text-[#FDDBB2] flex-shrink-0" />
                    <span className="leading-tight">Message</span>
                    <span className="text-[10px] sm:text-xs md:text-sm font-normal text-white/60">
                      (Optional)
                    </span>
                  </label>
                  <textarea
                    name="Message"
                    value={requestFormData.Message}
                    onChange={(e) =>
                      setRequestFormData({
                        ...requestFormData,
                        Message: e.target.value,
                      })
                    }
                    placeholder="Share why you'd like to join..."
                    rows={3}
                    className="w-full px-2.5 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 border-2 border-white/20 focus:border-[#FDDBB2] rounded-lg sm:rounded-xl text-xs sm:text-sm md:text-base font-[family-name:var(--font-inter)] placeholder:text-white/40 transition-all duration-300 focus:ring-2 sm:focus:ring-4 focus:ring-[#FDDBB2]/20 resize-none bg-white/10 backdrop-blur-sm text-white"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2 sm:pt-3 md:pt-4">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-white/10 hover:bg-white/15 text-white border border-white/20 py-2.5 sm:py-3 md:py-3.5 lg:py-4 rounded-lg sm:rounded-xl text-xs sm:text-sm md:text-base font-[family-name:var(--font-inter)] font-semibold shadow-xl transition-all duration-300 hover:shadow-2xl disabled:opacity-70 min-h-[40px] sm:min-h-[44px] md:min-h-[48px] backdrop-blur-sm"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center gap-2 sm:gap-3">
                        <RefreshCw className="h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
                        <span className="text-xs sm:text-sm md:text-base">
                          Submitting...
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2 sm:gap-3">
                        <UserPlus className="h-4 w-4 sm:h-5 sm:w-5" />
                        <span className="text-xs sm:text-sm md:text-base">
                          Send Request
                        </span>
                      </div>
                    )}
                  </Button>
                </div>
              </form>
            </div>

            {/* Enhanced Success Overlay */}
            {requestSuccess && (
              <div className="absolute inset-0 bg-gradient-to-br from-[#1B0D05]/98 via-[#2A1508]/98 to-[#1B0D05]/98 backdrop-blur-md flex items-center justify-center z-50 animate-in fade-in duration-300 p-4">
                <div className="text-center p-4 sm:p-6 md:p-8 max-w-sm mx-auto">
                  {/* Enhanced Icon Circle */}
                  <div className="relative inline-flex items-center justify-center mb-3 sm:mb-4 md:mb-5 lg:mb-6">
                    {/* Animated rings */}
                    <div className="absolute inset-0 rounded-full border-2 sm:border-4 border-[#FDDBB2]/20 animate-ping" />
                    <div className="absolute inset-0 rounded-full border-2 border-[#FDDBB2]/30" />
                    {/* Icon container */}
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gradient-to-br from-[#FDDBB2] to-white rounded-full flex items-center justify-center shadow-xl">
                      <CheckCircle
                        className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-[#1B0D05]"
                        strokeWidth={2.5}
                      />
                    </div>
                  </div>

                  {/* Title */}
                  <h4 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-[family-name:var(--font-inter)] font-bold text-[#FDDBB2] mb-2 sm:mb-3 md:mb-4">
                    Request Sent!
                  </h4>

                  {/* Message */}
                  <div className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4 md:mb-5">
                    <p className="text-[#FDDBB2]/95 font-[family-name:var(--font-inter)] text-sm sm:text-base md:text-lg font-medium">
                      We've received your request
                    </p>
                    <p className="text-[#FDDBB2]/85 font-[family-name:var(--font-inter)] text-xs sm:text-sm md:text-base">
                      We'll review it and get back to you soon
                    </p>
                  </div>

                  {/* Subtle closing indicator */}
                  <div className="flex items-center justify-center gap-1.5 sm:gap-2 mt-3 sm:mt-4 md:mt-5">
                    <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-[#FDDBB2]/60 rounded-full animate-pulse" />
                    <p className="text-[#FDDBB2]/70 font-[family-name:var(--font-inter)] text-[10px] sm:text-xs md:text-sm">
                      This will close automatically
                    </p>
                    <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-[#FDDBB2]/60 rounded-full animate-pulse" />
                  </div>
                </div>
              </div>
            )}

            {/* Error message */}
            {error && !requestSuccess && (
              <div className="px-2.5 sm:px-4 md:px-6 lg:px-8 pb-2.5 sm:pb-4 md:pb-6">
                <div className="bg-red-900/30 border-2 border-red-800/50 rounded-xl p-2.5 sm:p-3 md:p-4 backdrop-blur-sm">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-red-300 flex-shrink-0" />
                    <span className="text-red-200 font-semibold font-[family-name:var(--font-inter)] text-xs sm:text-sm">
                      {error}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Floating Status Messages (outside modals) */}
      {success && !showModal && !showRequestModal && !requestSuccess && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 max-w-md w-full mx-4">
          <div className="bg-green-50 border-2 border-green-200 rounded-xl p-3 sm:p-4 shadow-lg animate-in slide-in-from-top">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
              <span className="text-green-600 font-semibold font-[family-name:var(--font-crimson)] text-sm sm:text-base">
                {success}
              </span>
            </div>
          </div>
        </div>
      )}
    </Section>
  );
}
