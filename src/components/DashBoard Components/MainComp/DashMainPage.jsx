"use client";

// My Components
import { DashDate } from "@/components/DashBoard Components/DashDatePicker";

// React Icons
import { BiSolidDetail } from "react-icons/bi";
import { GrMoney } from "react-icons/gr";
import { FaUsers } from "react-icons/fa";
import { AiFillProduct } from "react-icons/ai";

// React
import { useState } from "react";
import DashStatsCard from "./DashStatsCard";
import DashStockCard from "./DashStockCard";
import DashTopSaleCard from "./DashTopSaleCard";
import DashTodayDetails from "./DashTodayDetails";
import DashStockNotify from "./DashStockNotify";

const DashMainPage = () => {
  const Totaldetails = [
    {
      icon: GrMoney,
      title: "Total Sales",
      value: "$25,000",
      stats: "+5%",
    },
    {
      icon: BiSolidDetail,
      title: "Total Orders",
      value: "1,200",
      stats: "+5%",
    },
    { icon: FaUsers, title: "Total Customers", value: "800", stats: "+5%" },
    {
      icon: AiFillProduct,
      title: "Total Products",
      value: "350",
      stats: "+5%",
    },
  ];

  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();

  const formatDate = (date) => {
    if (!date) return "";
    return date.toDateString().slice(0, 10);
  };

  const dateRangeDisplay =
    fromDate && toDate
      ? `${formatDate(fromDate)} - ${formatDate(toDate)}`
      : "Select Date Range";

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-5">
        <div>
          <h1 className="font-bold text-3xl">DashBoard</h1>
          <p className="text-md">
            Quickly Review what is going on in your store
          </p>
        </div>
        <div className="flex gap-2 items-center">
          from:
          <DashDate selected={fromDate} onDateChange={setFromDate} />
          to:
          <DashDate selected={toDate} onDateChange={setToDate} />
        </div>
      </div>
      {/*  */}
      <div>
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <h2 className="font-bold">Overall Details</h2>
            <p className="text-md text-gray-400">{dateRangeDisplay}</p>
          </div>
          <div className="grid grid-cols-4 gap-5 mt-2.5 w-full">
            {Totaldetails.map((c, i) => (
              <DashStatsCard className="" key={c.id || i} detail={c} />
            ))}
          </div>
        </div>
        {/*  */}
        <DashTodayDetails />
        {/*  */}
        <div className="mb-8 grid grid-cols-2 gap-5">
          <DashStockNotify />
          <div className="border-2 rounded-lg pt-2">
            <div className="flex items-center justify-between mb-2.5 px-5 ">
              <h2 className="font-bold">Top Selling Products</h2>
              <p className="text-md text-gray-400">{dateRangeDisplay}</p>
            </div>
            <main>
              <DashTopSaleCard />
              <DashTopSaleCard />
              <DashTopSaleCard />
            </main>
          </div>
        </div>
        {/*  */}
      </div>
    </div>
  );
};

export default DashMainPage;
