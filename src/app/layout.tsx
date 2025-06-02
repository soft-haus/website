import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap"
});

export const metadata: Metadata = {
  title: "Softhaus - Criamos seu site ideal",
  description: "A Softhaus é especializada na criação de sites modernos, eficientes e sob medida. Transformamos suas ideias em realidade digital.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Performance: Preload the critical hero background image */}
        <link
          rel="preload"
          href="/background1.webp"
          as="image"
          type="image/webp"
        />
      </head>
      <body
        className={`${poppins.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
