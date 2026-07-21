import type { Metadata } from "next";
import { Newsreader, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { SmoothScroll } from "@/components/layout/smooth-scroll";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { PersonJsonLd } from "@/components/seo/person-json-ld";
import { SITE_URL } from "@/lib/site";
import { profile } from "@/data/profile";

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["300", "400", "500", "600"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const title = "Dr Dattatraya Vhatkar — Chief Scientist, CSIR-CSIO";
const description =
  "Dr Dattatraya Vhatkar, Chief Scientist at CSIR-CSIO — thirty-two years of sensor and instrumentation research for agrionics, pre- and post-harvest technologies, and applied electronics.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: title,
    template: `%s — ${profile.name}`,
  },
  description,
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title,
    description,
    url: SITE_URL,
    siteName: profile.name,
    type: "profile",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${newsreader.variable} ${inter.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <PersonJsonLd />
        <a
          href="#main-content"
          className="fixed left-4 top-4 z-[100] -translate-y-24 bg-accent px-4 py-2 font-mono text-[12px] uppercase tracking-wider text-accent-foreground transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <SmoothScroll />
          <SiteHeader />
          <main id="main-content" className="flex-1 pt-16">
            {children}
          </main>
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
