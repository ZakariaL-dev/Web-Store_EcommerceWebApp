import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";

// Shadcn Comp
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "Web Store",
    template: "%s | Web Store",
  },
  description: "An Ecommerce website demo",
  icons: {
    icon: "/favicon.avif",
    apple: "/favicon.avif",
  },
};

export default function RootLayout({ children }) {
  return (
    <html>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
