import "@/app/globals.css";

// My Components
import DashNavBar from "@/components/DashBoard Components/Navigation/DashNavBar";
import DashSideBar from "@/components/DashBoard Components/Navigation/DashSideBar";
import UserSync from "@/components/StoreComponents/UserSync";
import { SidebarProvider } from "@/components/ui/sidebar";

// Shadcn Comp
import { Toaster } from "@/components/ui/sonner";

// Utils
import { auth } from "@/lib/auth";

export const metadata = {
  title: {
    default: "DashBoard",
    template: "%s | DashBoard",
  },
  description: "Admin Dashboard Control Panel",
  icons: {
    icon: "/favicon.avif",
    apple: "/favicon.avif",
  },
};

export default async function DashLayout({ children }) {
  const session = await auth();
  return (
    <html>
      <body>
        <SidebarProvider>
          <UserSync id={session?.user?.id} />

          <DashNavBar user={session?.user} />
          <DashSideBar />
          <main className="flex w-full mt-[61px] p-3">
            {children}
            <Toaster position="top-right" />
          </main>
        </SidebarProvider>
      </body>
    </html>
  );
}
