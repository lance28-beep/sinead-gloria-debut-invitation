import type React from "react"
import type { Metadata } from "next"
import { Great_Vibes, Inter, Crimson_Text, Ephesis } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Navbar } from "@/components/navbar"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const greatVibes = Great_Vibes({ subsets: ["latin"], weight: "400", variable: "--font-serif" })
const crimsonText = Crimson_Text({ 
  subsets: ["latin"], 
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-crimson" 
})
const ephesis = Ephesis({ 
  subsets: ["latin"], 
  weight: "400",
  variable: "--font-ephesis" 
})

export const metadata: Metadata = {
  title: "Sinead Gloria L. Heussaff - Debut Invitation",
  description:
    "You're invited to the debut of Sinead Gloria L. Heussaff! Join us on December 26, 2025 at Grandballroom Hall, Sugarland Hotel, Araneta Street, Barangay Singcang, Bacolod City, Negros Occidental. RSVP, read our love story, view our gallery, and leave a message for the couple.",
  keywords:
    "Sinead Gloria L. Heussaff debut, Filipino debut, RSVP, debut gallery, debut message wall, debut invitation, 2025 debuts, love story, guestbook, debut registry, debut details, debut venues Grandballroom Hall, Sugarland Hotel, #sinead-gloria-debut-invitation",
  authors: [
    { name: "Sinead Gloria L. Heussaff" },
  ],
  creator: "Sinead Gloria L. Heussaff",
  publisher: "Sinead Gloria L. Heussaff",
  formatDetection: {
    email: false,
    address: false,
    telephone: true,
  },
  metadataBase: new URL("https://sinead-gloria-debut-invitation.vercel.app/"),
  alternates: {
    canonical: "https://sinead-gloria-debut-invitation.vercel.app/",
  },
  icons: {
    icon: [
      { url: "/favicon_io/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon_io/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/favicon_io/favicon.ico",
    apple: "/favicon_io/apple-touch-icon.png",
    other: [
      {
        rel: "android-chrome-192x192",
        url: "/favicon_io/android-chrome-192x192.png",
      },
      {
        rel: "android-chrome-512x512",
        url: "/favicon_io/android-chrome-512x512.png",
      },
    ],
  },
  manifest: "/favicon_io/site.webmanifest",
  openGraph: {
      title: "Sinead Gloria L. Heussaff Debut | December 26, 2025",
    description:
      "Celebrate the debut of Sinead Gloria L. Heussaff on December 26, 2025 at Grandballroom Hall, Sugarland Hotel, Araneta Street, Barangay Singcang, Bacolod City, Negros Occidental. Discover our love story, RSVP, view the gallery, and leave your wishes!",
    url: "https://SineadGloria-debut-invitation.vercel.app/",
    siteName: "Sinead Gloria L. Heussaff Debut ",
    locale: "en_PH",
    type: "website",
    images: [
      {
        url: "https://sinead-gloria-debut-invitation.vercel.app/Details/image.png",
        width: 1200,
        height: 630,
        alt: "Sinead Gloria L. Heussaff Debut Invitation - December 26, 2025",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sinead Gloria L. Heussaff Debut Invitation",
    description:
      "You're invited to the debut of Sinead Gloria L. Heussaff! December 26, 2025. RSVP, view our gallery, and leave a message! #sinead-gloria-debut-invitation",
    images: ["https://sinead-gloria-debut-invitation.vercel.app/Details/image.png"],
    creator: "@sineadglorialheussaf",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-site-verification",
  },
  other: {
    "application/ld+json": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Event",
      name: "Sinead Gloria L. Heussaff Debut",
      startDate: "2026-02-14T14:00:00+08:00",
      endDate: "2026-02-14T22:00:00+08:00",
      eventStatus: "https://schema.org/EventScheduled",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      location: [
        {
          "@type": "Place",
          name: "Grandballroom Hall, Sugarland Hotel",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Araneta Street, Brgy. Singcang, Bacolod City",
            addressLocality: "Bacolod City",
            addressRegion: "Negros Occidental",
            postalCode: "5000",
            addressCountry: "PH",
          },
        },
      ],
      image: ["https://sinead-gloria-debut-invitation.vercel.app/Details/image.png"],
      description:
        "You're invited to the debut of Sinead Gloria L. Heussaff! Join us on December 26, 2025 at Grandballroom Hall, Sugarland Hotel, Araneta Street, Barangay Singcang, Bacolod City, Negros Occidental. RSVP, read our love story, view our gallery, and leave a message for the couple.",
      organizer: {
        "@type": "Person",
        name: "Sinead Gloria L. Heussaff",
      },
      offers: {
        "@type": "Offer",
        url: "https://sinead-gloria-debut-invitation.vercel.app/",
        availability: "https://schema.org/InStock",
        price: "0",
        priceCurrency: "PHP",
      },
            eventHashtag: "#sinead-gloria-debut-invitation",
    }),
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#0A3428" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Fugaz+One&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=WindSong:wght@400;500&display=swap" rel="stylesheet" />
        <link rel="preload" as="image" href="/mobile-background/DSCF2614-min.jpg" media="(max-width: 767px)" />
        <link rel="preload" as="image" href="/desktop-background/DSCF2444-min.jpg" media="(min-width: 768px)" />
      </head>
      <body className={`${inter.variable} ${greatVibes.variable} ${crimsonText.variable} ${ephesis.variable} font-inter antialiased text-foreground`}>
        <Navbar />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
