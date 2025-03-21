import type { Metadata } from "next";
import { Inter, Source_Serif_4 } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const sourceSerif = Source_Serif_4({
  weight: ["400", "600"],
  subsets: ["latin"],
  variable: "--font-source-serif",
});

export const metadata: Metadata = {
  title: "Contract Filler",
  description: "Preencha contratos de forma rápida e segura usando um modelo pré-definido.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`${inter.variable} ${sourceSerif.variable} font-inter min-h-screen bg-gradient-to-br bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.1),rgba(255,255,255,0))] from-neutral-50 to-neutral-100 text-neutral-900 antialiased transition-colors duration-200 dark:bg-gradient-to-br dark:from-neutral-900 dark:to-neutral-950 dark:text-neutral-100`}
        // className={`${inter.variable} ${sourceSerif.variable} font-inter min-h-screen bg-black`}
        // className={`min-h-screen bg-black`}
      >
        <main className="relative mx-auto min-h-screen max-w-7xl sm:px-4 lg:px-8">
          {children}
        </main>
      </body>
    </html>
  );
}
