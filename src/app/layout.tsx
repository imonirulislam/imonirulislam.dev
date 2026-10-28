import type { Metadata } from "next";
import { Space_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { GlobalEffects } from "@/components/global-effects";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
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
    "OMNI_ROOT",
  ],
  authors: [{ name: "Monirul Islam", url: "https://imonirulislam.dev" }],
  creator: "Monirul Islam",
  metadataBase: new URL("https://imonirulislam.dev"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://imonirulislam.dev",
    title: "Monirul Islam | Systems & Software Engineer",
    description:
      "Systems and Software Engineer specializing in high-performance Node.js architectures, AWS infrastructure, and bare metal orchestration.",
    siteName: "Monirul Islam Portfolio",
    images: [
      {
        url: "/og-image.png",
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
    creator: "@imonirulislam",
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
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(sessionStorage.getItem("MI_BOOTED"))document.documentElement.dataset.booted="1"}catch(e){}`,
          }}
        />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${spaceMono.variable} selection:bg-pop-yellow relative antialiased selection:text-black`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <GlobalEffects />
          <div className="grid-pattern pointer-events-none fixed inset-0 -z-10 opacity-[0.15]" />
          <div className="relative flex min-h-screen flex-col">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
