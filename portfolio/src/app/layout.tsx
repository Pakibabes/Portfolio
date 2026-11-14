import type { Metadata, Viewport } from "next";
import "@fontsource/syne/400.css";
import "@fontsource/syne/600.css";
import "@fontsource/syne/700.css";
import "@fontsource/syne/800.css";
import "@fontsource/space-mono/400.css";
import "@fontsource/space-mono/700.css";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#07060c",
};

export const metadata: Metadata = {
  title: "John Lyster T. Arbiol — Portfolio",
  description:
    "Full-stack developer passionate about building scalable web applications and AI-integrated experiences. 3rd-year CS student at CIT-U.",
  keywords: [
    "John Lyster Arbiol",
    "Full Stack Developer",
    "Web Developer",
    "Portfolio",
    "React",
    "Next.js",
    "AI",
  ],
  authors: [{ name: "John Lyster T. Arbiol" }],
  openGraph: {
    title: "John Lyster T. Arbiol — Portfolio",
    description:
      "Full-stack developer building AI-integrated web applications.",
    type: "website",
    locale: "en_US",
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-void text-text overflow-x-hidden">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:rounded-lg focus:bg-panel focus:px-4 focus:py-2 focus:font-mono focus:text-sm focus:text-cyan"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
