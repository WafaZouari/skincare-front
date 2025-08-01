import "./globals.css";

export const metadata = {
  title: {
    default: "GlowGuide | AI Skincare Advisor",
    template: "%s | GlowGuide"
  },
  description: "Get personalized skincare recommendations powered by AI",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://your-app-name.onrender.com"),
  openGraph: {
    title: "GlowGuide | AI Skincare Advisor",
    description: "Get personalized skincare recommendations powered by AI",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://your-app-name.onrender.com",
    siteName: "GlowGuide",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
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
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900 antialiased flex flex-col">
        <div className="flex-1">
          {children}
        </div>
        <footer className="py-6 mt-auto bg-white/80 backdrop-blur-sm border-t border-gray-200">
          <div className="container mx-auto px-4 max-w-7xl">
            <p className="text-sm text-gray-600 text-center">
              © {new Date().getFullYear()} GlowGuide. All recommendations are AI-generated and not medical advice.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
