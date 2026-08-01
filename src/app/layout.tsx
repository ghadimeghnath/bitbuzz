import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";
import { cn } from "@/lib/utils";
import BackToTop from "@/components/BackToTop";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "BITBUZZ 8.0 - THINK • CREATE • TRANSFORM",
  description: "An immersive digital event experience for higher secondary students.",
  icons: {
    icon: "/logo-3.png",
    shortcut: "/logo-3.png",
    apple: "/logo-3.png",
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
      className={cn("h-full", "antialiased", montserrat.variable, "font-sans")}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground overflow-x-hidden selection:bg-brand-golden-yellow selection:text-brand-navy">
        <LenisProvider>
          {children}
          <BackToTop />
        </LenisProvider>
      </body>
    </html>
  );
}