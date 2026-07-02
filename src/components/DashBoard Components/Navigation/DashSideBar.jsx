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
import { BsBoxSeam, BsExclamation } from "react-icons/bs";
import { MdOutlineStarOutline } from "react-icons/md";
import { BsPersonExclamation } from "react-icons/bs";
import { TbUserExclamation } from "react-icons/tb";

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

// custom icon
const BsBoxExclamation = (props) => (
  <div className="relative inline-block align-middle" {...props}>
    <BsBoxSeam className="text-gray-700" />
    <div className="absolute -bottom-1 -right-1.5 w-2 h-3 bg-slate-50"></div>
    <BsExclamation className="absolute -bottom-1.5 -right-2 w-4 h-4 text-gray-700 " />
  </div>
);

// Menu items
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
      {
        title: "Customers",
        url: "/admin/dashboard/reports?r=customers",
        icon: TbUserExclamation,
      },
      {
        title: "Products",
        url: "/admin/dashboard/reports?r=products",
        icon: BsBoxExclamation,
      },
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
                                <a href={g.url}>
                                  <>
                                    <g.icon />
                                    <p>{g.title}</p>
                                  </>
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
