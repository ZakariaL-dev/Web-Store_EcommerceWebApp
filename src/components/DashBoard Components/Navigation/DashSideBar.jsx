"use client";

// React Icons
import { LuArrowRightToLine } from "react-icons/lu";
import { LuLayoutDashboard } from "react-icons/lu";
import { IoPersonOutline } from "react-icons/io5";
import { MdReportGmailerrorred } from "react-icons/md";
import { TbReportMoney } from "react-icons/tb";
import { IoSettingsOutline } from "react-icons/io5";
import { GrConfigure } from "react-icons/gr";
import { MdOutlineAnalytics } from "react-icons/md";
import { BsBoxSeam } from "react-icons/bs";
import { MdOutlineStarOutline } from "react-icons/md";

// Shadcn Comp
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

// Lucide React
import { ChevronDown } from "lucide-react";

// React
import { useState } from "react";


// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/admin/dashboard",
    icon: LuLayoutDashboard,
    groups: [],
  },
  {
    title: "Orders",
    url: "/admin/dashboard/orders",
    icon: TbReportMoney,
    groups: [],
  },
  {
    title: "Products",
    url: "/admin/dashboard/products",
    icon: BsBoxSeam,
    groups: [],
  },
  {
    title: "Customers",
    url: "/admin/dashboard/customers",
    icon: IoPersonOutline,
    groups: [],
  },
  {
    title: "Analytics",
    url: "/admin/dashboard/analyses",
    icon: MdOutlineAnalytics,
    groups: [],
  },
  {
    title: "Reviews",
    url: "/admin/dashboard/reviews",
    icon: MdOutlineStarOutline,
    groups: [],
  },
  {
    title: "Reports",
    icon: MdReportGmailerrorred,
    groups: [
      ["Customers", "/admin/dashboard/reports?r=customers"],
      ["Products", "/admin/dashboard/reports?r=products"],
      // ["Store FeedBacks", "/admin/dashboard/reports?r=feedbacks"],
    ],
  },
  {
    title: "Account Settings",
    url: "/admin/dashboard/settings",
    icon: IoSettingsOutline,
    groups: [],
  },
  {
    title: "Configure",
    url: "/admin/dashboard/configure",
    icon: GrConfigure,
    groups: [],
  },
];

const DashSideBar = () => {
  const { open, setOpen } = useSidebar();

  const [CollpOpen, setCollpOpen] = useState(true);
  return (
    <Sidebar className="mt-[61px] h-screen" collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) =>
                item.groups.length === 0 ? (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ) : (
                  <Collapsible
                    key={item.title}
                    open={CollpOpen}
                    onOpenChange={setCollpOpen}
                    className="group/collapsible"
                  >
                    <SidebarMenuItem>
                      <CollapsibleTrigger className="cursor-pointer" asChild>
                        <SidebarMenuButton>
                          <item.icon />
                          <span>{item.title}</span>
                          <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenu>
                          {item.groups.map((g, i) => (
                            <SidebarMenuItem key={i} className="ml-4">
                              <SidebarMenuButton asChild>
                                <a href={g[1]}>
                                  <span>{g[0]}</span>
                                </a>
                              </SidebarMenuButton>
                            </SidebarMenuItem>
                          ))}
                        </SidebarMenu>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                ),
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t mb-16 lg:block hidden">
        <SidebarMenu>
          <SidebarMenuItem>
            <Button
              variant="outline"
              className={`w-8 transition-transform duration-300 ${
                open ? "rotate-180" : []
              }`}
              onClick={() => {
                setOpen(!open);
                setCollpOpen(false);
              }}
            >
              <LuArrowRightToLine />
            </Button>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};
export default DashSideBar;
