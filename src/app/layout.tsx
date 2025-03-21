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

{
  /* <meta property="og:type" content="website" />
<meta property="og:url" content="https://asteriuz.github.io/ContractFiller/" />
<meta property="og:title" content="Contract Filler" />
<meta property="og:description" content="Preencha contratos de forma rápida e segura usando um modelo pré-definido." />
<meta property="og:image" content="https://metatags.io/images/meta-tags.png" />

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image" />
<meta property="twitter:url" content="https://asteriuz.github.io/ContractFiller/" />
<meta property="twitter:title" content="Contract Filler" />
<meta property="twitter:description" content="Preencha contratos de forma rápida e segura usando um modelo pré-definido." />
<meta property="twitter:image" content="https://metatags.io/images/meta-tags.png" /> */
}

export const metadata: Metadata = {
  title: "Contract Filler",
  description:
    "Preencha contratos de forma rápida e segura usando um modelo pré-definido.",
  openGraph: {
    type: "website",
    url: "https://asteriuz.github.io/ContractFiller/",
    title: "Contract Filler",
    description:
      "Preencha contratos de forma rápida e segura usando um modelo pré-definido.",
    images: [
      {
        url: "https://asteriuz.github.io/ContractFiller/thumb.png",
        width: 1920,
        height: 1080,
        alt: "Contract Filler Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contract Filler",
    description:
      "Preencha contratos de forma rápida e segura usando um modelo pré-definido.",
    images: ["https://asteriuz.github.io/ContractFiller/thumb.png"],
  },
  alternates: {
    canonical: "https://asteriuz.github.io/ContractFiller/",
  },
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
      >
        <main className="relative mx-auto min-h-screen max-w-7xl sm:px-4 lg:px-8">
          {children}
        </main>
      </body>
    </html>
  );
}
