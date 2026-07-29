import type { Metadata } from "next";
import { Inter, Space_Grotesk, Bebas_Neue, Geist } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const bebasNeue = Bebas_Neue({
  weight: "400",
  variable: "--font-bebas-neue",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BITBUZZ 8.0 - THINK • CREATE • TRANSFORM",
  description: "An immersive digital event experience for higher secondary students.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", inter.variable, spaceGrotesk.variable, bebasNeue.variable, "font-sans", geist.variable)}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground overflow-x-hidden selection:bg-neon-green selection:text-black">
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
