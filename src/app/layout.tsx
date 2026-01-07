import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/components/providers/AuthProvider";
import { CartSync } from "@/components/cart/CartSync";
import { ConditionalNavbar } from "@/components/layout/ConditionalNavbar";
import { ConditionalFooter } from "@/components/layout/ConditionalFooter";
import { Toaster } from "react-hot-toast";
import { ClientOnly } from "@/components/ui/ClientOnly"; // Import the hydration fix
import { cn } from "@/core/utils/cn";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-heading",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "J&M HORIZONZ | Editorial Fashion",
  description: "High-end fashion brand defining the horizon of style.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} overflow-x-hidden h-full`} suppressHydrationWarning>
      <body className={cn(inter.className, 'h-full min-h-screen flex flex-col bg-black text-white overflow-x-hidden')}>
        <AuthProvider>
          <CartProvider>
            {/* 
                HYDRATION FIX: 
                Wraps CartSync and Navbar in ClientOnly to prevent 
                Server/Client attribute mismatches (e.g. session state, cart counts)
            */}
            <ClientOnly>
              <CartSync />
              <ConditionalNavbar />
            </ClientOnly>

            <div className="flex-1 flex flex-col w-full">
              {children}
            </div>

            {/* Footer - Always visible except on auth/admin pages */}
            <ConditionalFooter />
            <Toaster position="bottom-right" />
          </CartProvider>
        </AuthProvider>

        {/* SVG Noise Filter for Film Grain Effect */}
        <svg className="absolute pointer-events-none opacity-0 invisible">
          <filter id="noiseFilter">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.6"
              numOctaves="3"
              stitchTiles="stitch"
            />
          </filter>
        </svg>
      </body>
    </html>
  );
}
