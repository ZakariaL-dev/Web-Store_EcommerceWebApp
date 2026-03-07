"use client";

import DashOrderCard from "./DashOrderCard";

// React Icons
import { BiSolidDetail } from "react-icons/bi";
import { GrMoney } from "react-icons/gr";
import { FaUsers } from "react-icons/fa";
import { useOrderStore } from "@/utils/OrderStore";
import { useEffect } from "react";
import { format } from "date-fns";

const DashTodayDetails = () => {
  const { orders, getAllOrders } = useOrderStore();
  useEffect(() => {
    getAllOrders();
  }, [getAllOrders]);

  if (!orders) return;

  // in an actual web site you need to ajust it
  // const todayDate = format(new Date(), "yyy-mm-dd")

  const TodayOrders = orders.filter((order) =>
    order.createdAt.startsWith("2026-02-04"),
  );

  const totals = TodayOrders.reduce(
    (acc, order) => {
      // 1. Add the order's total amount
      acc.totalMoney += order.totalAmount;

      // 2. Sum the quantities of all products in this order
      const orderQuantity = order.products.reduce(
        (sum, p) => sum + p.quantity,
        0,
      );
      acc.totalProducts += orderQuantity;

      return acc;
    },
    { totalMoney: 0, totalProducts: 0 },
  );

  const Todaydetails = [
    {
      icon: GrMoney,
      title: "Today's Sales",
      value: totals.totalMoney.toFixed(2) + " Dz",
      stats: "+5%",
    },
    {
      icon: BiSolidDetail,
      title: "Today's Orders",
      value: TodayOrders.length,
      stats: "+5%",
    },
    {
      icon: FaUsers,
      title: "Today's Sold Products",
      value: totals.totalProducts,
      stats: "+5%",
    },
  ];

  return (
    <div className="mb-8">
      <h2 className="font-bold text-xl mb-2.5">Today&apos;s Details</h2>

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
                {/* <p className="text-emerald-700">{c.stats}</p> */}
              </div>
            </div>
          ))}
        </header>
        <main className="flex flex-wrap justify-between ">
          {TodayOrders.map((to) => {
            return <DashOrderCard key={to._id} order={to} />;
          })}
        </main>
      </div>
    </div>
  );
};

export default DashTodayDetails;
