import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vision'AI're - Analyse IA de votre site web",
  description: "Obtenez une analyse IA complète de votre site web en 7-10 minutes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
