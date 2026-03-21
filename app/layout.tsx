import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { LanguageProvider } from "@/contexts/LanguageContext"
import { Footer } from "@/components/footer"
import "./globals.css"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://hishamandfarida.site"),
  title: "Welcome to Our Beginning",
  description: "Celebrating the start of our journey together",
  generator: "Digitiva",
  openGraph: {
    url: "https://hishamandfarida.site/",
    type: "website",
    title: "Welcome to Our Beginning",
    description: "Celebrating the start of our journey together",
    images: [
      {
        url: "https://hishamandfarida.site/invitation-design-arabic.jpg",
        width: 1200,
        height: 630,
        alt: "Our Wedding Invitation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Welcome to Our Beginning",
    description: "Celebrating the start of our journey together",
    images: ["https://hishamandfarida.site/invitation-design-arabic.jpg"],
  },
  icons: {
    icon: "/invitation-design-arabic.jpg",
    apple: "/invitation-design-arabic.jpg",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        {/* ✅ Open Graph tags for Facebook & WhatsApp previews */}
        <meta property="og:url" content="https://hishamandfarida.site/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Welcome to Our Beginning" />
        <meta property="og:description" content="Celebrating the start of our journey together" />
        <meta
          property="og:image"
          content="https://hishamandfarida.site/invitation-design-arabic.jpg"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Our Wedding Invitation" />
        {/* Removed invalid fb:app_id since it's not needed for basic sharing */}

        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Welcome to Our Beginning" />
        <meta name="twitter:description" content="Celebrating the start of our journey together" />
        <meta name="twitter:image" content="https://hishamandfarida.site/invitation-design-arabic.jpg" />

        {/* Preload critical images for immediate loading */}
        <link
          rel="preload"
          href="/invitation-design-arabic.jpg"
          as="image"
          type="image/jpg"
        />
        {/* Preload GIF with high priority to eliminate lag on Netlify */}
        <link
          rel="preload"
          href="/invitation-design.gif"
          as="image"
          type="image/gif"
        />
        {/* Preconnect to domains for faster loading */}
        {/* Preload Google Fonts */}
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&display=swap"
          as="style"
        />
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} ${playfair.variable}`}>
        <LanguageProvider>
          <Suspense fallback={null}>
            {children}
            <Footer />
          </Suspense>
          <Analytics />
        </LanguageProvider>
      </body>
    </html>
  )
}