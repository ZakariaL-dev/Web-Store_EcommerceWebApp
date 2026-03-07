"use client";

// My Components
import CouponSystem from "@/components/DashBoard Components/ConfigComp/CouponSystem";
import DeliverySystem from "@/components/DashBoard Components/ConfigComp/DeliverySystem";
import Events from "@/components/DashBoard Components/ConfigComp/Events";
import MainBanner from "@/components/DashBoard Components/ConfigComp/MainBanner";
import PagesContent from "@/components/DashBoard Components/ConfigComp/PagesContent";
import SearchFilters from "@/components/DashBoard Components/ConfigComp/SearchFilters";

// Shadcn Comp
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// React Icons
import { RiDiscountPercentLine } from "react-icons/ri";
import { RiProfileLine } from "react-icons/ri";
import { MdEventNote } from "react-icons/md";
import { PiFlagBannerFold } from "react-icons/pi";
import { CiDeliveryTruck } from "react-icons/ci";
import { TbFilterSearch } from "react-icons/tb";

// React
import { useEffect, useState } from "react";

// Stores
import { useConfigureStore } from "@/utils/ConfigStore";


const AdminConfigComp = () => {
  const [activeTab, setActiveTab] = useState("coupon");
  
  const { config, fetchConfigure } = useConfigureStore();
  
    useEffect(() => {
      fetchConfigure(activeTab);
    }, [activeTab, fetchConfigure]);

    useEffect(() => {
      if (config) {
      }
    }, [config]);

  return (
    <div className="flex flex-col w-full my-3">
      <header className="flex items-center justify-between mx-3 mb-4">
        <h1 className="text-xl font-bold">Store Configuration</h1>
      </header>
      <Tabs
        defaultValue="coupon"
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList variant="line">
          <TabsTrigger value="coupon">
            <RiDiscountPercentLine />
            Coupon System
          </TabsTrigger>
          <TabsTrigger value="banners">
            <PiFlagBannerFold />
            Main Page Banners
          </TabsTrigger>
          <TabsTrigger value="events">
            <MdEventNote />
            Store Events
          </TabsTrigger>
          <TabsTrigger value="delivery">
            <CiDeliveryTruck />
            Delivery Bureaus & Fees
          </TabsTrigger>
          <TabsTrigger value="contents">
            <RiProfileLine />
            Page Content
          </TabsTrigger>
          <TabsTrigger value="filters">
            <TbFilterSearch />
            Search Filters
          </TabsTrigger>
        </TabsList>
        <TabsContent className="p-2" value="coupon">
          <CouponSystem />
        </TabsContent>
        <TabsContent className="p-2" value="banners">
          <MainBanner/>
        </TabsContent>
        <TabsContent className="p-2" value="events">
          <Events/>
        </TabsContent>
        <TabsContent className="p-2" value="delivery">
          <DeliverySystem />
        </TabsContent>
        <TabsContent className="p-2" value="contents">
          <PagesContent/>
        </TabsContent>
        <TabsContent className="p-2" value="filters">
          <SearchFilters/>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminConfigComp;
