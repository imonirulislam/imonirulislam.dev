import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Monirul Islam | Systems & Software Engineer",
    template: "%s | Monirul Islam",
  },
  description:
    "Systems and Software Engineer specializing in high-performance Node.js architectures, AWS infrastructure, and bare metal orchestration.",
  keywords: [
    "Monirul Islam",
    "Software Engineer",
    "Systems Engineer",
    "Node.js",
    "AWS",
    "DevOps",
    "Bare Metal",
    "Linux",
    "TypeScript",
    "React",
    "Next.js",
  ],
  authors: [{ name: "Monirul Islam", url: "https://imonirulislam.dev" }],
  creator: "Monirul Islam",
  metadataBase: new URL("https://imonirulislam-dev.pages.dev"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://imonirulislam-dev.pages.dev",
    title: "Monirul Islam | Systems & Software Engineer",
    description:
      "Systems and Software Engineer specializing in high-performance Node.js architectures, AWS infrastructure, and bare metal orchestration.",
    siteName: "Monirul Islam Portfolio",
    images: [
      {
        url: "/og-image.png", // We might need to generate this or use a placeholder
        width: 1200,
        height: 630,
        alt: "Monirul Islam - Systems & Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Monirul Islam | Systems & Software Engineer",
    description:
      "Building robust systems and scalable infrastructure. Specialist in Node.js, AWS, and Linux internals.",
    images: ["/og-image.png"],
    creator: "@imonirulislam", // Assuming handle/placeholder
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} selection:bg-primary selection:text-primary-foreground relative antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="grid-pattern pointer-events-none fixed inset-0 -z-10 opacity-[0.4]" />
          <div className="relative flex min-h-screen flex-col">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
