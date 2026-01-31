import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";

// My Components
import StoreNavBar from "@/components/StoreComponents/NavComp/StoreNavBar";
import StoreFooter from "@/components/StoreComponents/NavComp/StoreFooter";
import AccountSideBar from "@/components/AccountComponents/AccountSideBar";
import AccountUserWrapper from "@/components/AccountComponents/AccountUserWrapper";
import UserSync from "@/components/StoreComponents/UserSync";

// Shadcn Comp
import { Toaster } from "@/components/ui/sonner";

// Utils
import { auth } from "@/lib/auth";

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

export default async function RootLayout({ children }) {
  const session = await auth();

  return (
    <html>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <UserSync id={session?.user?.id} />

        <StoreNavBar user={session?.user} />
        <AccountUserWrapper email={session?.user?.id}>
          <main className="w-full flex gap-5 items-start mt-24 max-w-7xl mx-auto mb-6">
            <AccountSideBar user={session?.user} />
            {children}
          </main>
        </AccountUserWrapper>
        <StoreFooter />
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
