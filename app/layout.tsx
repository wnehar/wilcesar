import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OBSIDIAN GT | L'abonnement automobile ultime",
  description: "Conduisez des véhicules de prestige sur notre circuit intégré ou sur route. Abonnements mensuels et stages de conduite.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className="h-full antialiased dark"
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-obsidian text-white overflow-x-hidden selection:bg-white selection:text-black">
        {children}
      </body>
    </html>
  );
}
