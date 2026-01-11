import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Fini - Finanzas Personales",
  description: "Registra tus gastos e ingresos de forma rápida y sencilla",
  
  // Configuración de íconos para PWA
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/fini-logo.png", sizes: "192x192", type: "image/png" },
      { url: "/fini-logo.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/fini-logo.png", sizes: "180x180", type: "image/png" },
    ],
  },

  // Configuración para iOS (iPhone/iPad)
  appleWebApp: {
    capable: true,
    title: "Fini",
    statusBarStyle: "black-translucent",
  },

  // Theme color para la barra de navegación
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#cfd73f" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],

  // Viewport para PWA
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },

  // Manifest
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${manrope.variable} antialiased font-manrope`}
      >
        {children}
      </body>
    </html>
  );
}
