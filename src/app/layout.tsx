import type { Metadata } from "next";
import { Cormorant_Garamond, Lato } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-lato",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ritik & Archi — Wedding Invitation",
  description:
    "Join us in celebrating the wedding of Ritik and Archi. RSVP, view the event schedule, location, and share in our joy.",
  openGraph: {
    title: "Ritik & Archi — Wedding Invitation",
    description: "You are cordially invited to celebrate our special day.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${lato.variable}`}>
      <body className="bg-ivory text-charcoal antialiased">{children}</body>
    </html>
  );
}
