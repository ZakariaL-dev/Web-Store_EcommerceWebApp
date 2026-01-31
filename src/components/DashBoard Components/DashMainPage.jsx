"use client";

// My Components
import { DashDate } from "@/components/DashBoard Components/DashDatePicker";
import DashStatsCard from "@/components/DashBoard Components/DashStatsCard";
import DashOrderCard from "@/components/DashBoard Components/OrdersComp/DashOrderCard";
import DashStockCard from "@/components/DashBoard Components/DashStockCard";
import DashTopSaleCard from "@/components/DashBoard Components/DashTopSaleCard";

// React Icons
import { BiSolidDetail } from "react-icons/bi";
import { GrMoney } from "react-icons/gr";
import { FaUsers } from "react-icons/fa";
import { AiFillProduct } from "react-icons/ai";

// React
import { useState } from "react";


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
  const Todaydetails = [
    {
      icon: GrMoney,
      title: "Today's Sales",
      value: "$25,000",
      stats: "+5%",
    },
    {
      icon: BiSolidDetail,
      title: "Today's Orders",
      value: "1,200",
      stats: "+5%",
    },
    {
      icon: FaUsers,
      title: "Today's Customers",
      value: "800",
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

          <div className="flex flex-wrap items-center gap-5 mt-2.5">
            {Totaldetails.map((c, i) => (
              <DashStatsCard className="" key={c.id || i} detail={c} />
            ))}
          </div>
        </div>
        {/*  */}
        <div className="mb-8">
          <h2 className="font-bold mb-2.5">Today&apos;s Details</h2>

          <div className="border-2  rounded-lg">
            <header className="flex flex-wrap justify-around items-center gap-5 border-b-2">
              {Todaydetails.map((c, i) => (
                <div
                  key={i}
                  className="flex items-center gap-5 p-4 rounded-md w-[30%]"
                >
                  <c.icon
                    size={40}
                    className="bg-gray-500 p-2 rounded-md text-slate-100"
                  />
                  <div>
                    <h1>{c.title}</h1>
                    <h2 className="text-xl font-bold">{c.value}</h2>
                    <p className="text-emerald-700">{c.stats}</p>
                  </div>
                </div>
              ))}
            </header>
            <main className="flex flex-wrap justify-between ">
              <DashOrderCard />
              <DashOrderCard />
              <DashOrderCard />
              <DashOrderCard />
              <DashOrderCard />
            </main>
          </div>
        </div>
        {/*  */}
        <div className="mb-8 flex items-start gap-5">
          <div className="w-[50%] border-2 rounded-lg pt-2">
            <h2 className="font-bold mb-2.5 px-5">Stock Threshold</h2>
            <main>
              <DashStockCard />
              <DashStockCard />
              <DashStockCard />
            </main>
          </div>
          <div className="w-[50%] border-2 rounded-lg pt-2">
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
