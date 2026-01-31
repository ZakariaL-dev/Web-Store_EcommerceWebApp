// React Icons
import { FaArrowTrendUp } from "react-icons/fa6";
import { FaArrowTrendDown } from "react-icons/fa6";
import { IoBagCheckOutline } from "react-icons/io5";
import { BsPeople } from "react-icons/bs";
import { TbPercentage } from "react-icons/tb";
import { LiaMoneyBillWaveSolid } from "react-icons/lia";
import { TbActivityHeartbeat } from "react-icons/tb";
import { IoIosStats } from "react-icons/io";
import { TbShoppingCartExclamation } from "react-icons/tb";

// My Components
import { DashAnalyseChart } from "./DashAnalyseChart";
import { DashAnalysePieChart } from "./DashAnalysePieChart";

// Shadcn Comp
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";

const DashAnalytics = () => {
  const averageStats = [
    {
      name: "Total Revenue",
      number: "$245,678",
      icon: (
        <FaArrowTrendUp className="text-4xl bg-blue-200 p-2 rounded-lg text-blue-800" />
      ),
    },
    {
      name: "Total Orders",
      number: "1 278",
      icon: (
        <IoBagCheckOutline className="text-4xl bg-emerald-200 p-2 rounded-lg text-emerald-800" />
      ),
    },
    {
      name: "Total Customers",
      number: "218",
      icon: (
        <BsPeople className="text-4xl bg-stone-200 p-2 rounded-lg text-stone-800" />
      ),
    },
    {
      name: "Conversion Rate",
      number: "3.8%",
      icon: (
        <TbPercentage className="text-4xl bg-orange-200 p-2 rounded-lg text-orange-800" />
      ),
    },
  ];
  const smallStats = [
    {
      name: "Avg. Order Value",
      number: "$197",
      icon: (
        <LiaMoneyBillWaveSolid className="text-4xl bg-indigo-200 p-2 rounded-lg text-indigo-800" />
      ),
    },
    {
      name: "Customer LTV",
      number: "$298",
      icon: (
        <TbActivityHeartbeat className="text-4xl bg-teal-200 p-2 rounded-lg text-teal-800" />
      ),
    },
    {
      name: "Return Rate",
      number: "3.8%",
      icon: (
        <IoIosStats className="text-4xl bg-red-200 p-2 rounded-lg text-red-800" />
      ),
    },
    {
      name: "Cart Abandonment",
      number: "32.8%",
      icon: (
        <TbShoppingCartExclamation className="text-4xl bg-amber-200 p-2 rounded-lg text-amber-800" />
      ),
    },
  ];
  return (
    <div>
      {/* average stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-5 mb-4">
        {averageStats.map((as, i) => {
          return (
            <div
              key={i}
              className="border-2 p-4 rounded-2xl bg-slate-50 flex items-center justify-between transition-all ease-in-out duration-500 hover:shadow-xl hover:bg-slate-100 hover:-translate-y-1.5 hover:scale-105"
            >
              <div>
                <p>{as.name}</p>
                <h1 className="text-xl font-bold">{as.number}</h1>
              </div>
              {as.icon}
            </div>
          );
        })}
      </div>
      {/* small stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-5 mb-8">
        {smallStats.map((as, i) => {
          return (
            <div
              key={i}
              className="border-2 py-2 px-4 rounded-2xl bg-slate-50 flex items-center gap-4 transition-all ease-in-out duration-500 hover:shadow-lg hover:bg-slate-100 hover:-translate-y-1"
            >
              {as.icon}
              <div>
                <p className="text-sm">{as.name}</p>
                <h1 className="text-lg font-bold">{as.number}</h1>
              </div>
            </div>
          );
        })}
      </div>
      {/* charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-5 mb-5">
        <DashAnalyseChart />
        <DashAnalysePieChart />
      </div>
      <div className="px-5 mb-5">
        <Card className="px-5">
          <CardTitle>Top Selling Products</CardTitle>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="text-gray-500">
                  <TableHead>Product</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Sales</TableHead>
                  <TableHead>Revenue</TableHead>
                  <TableHead>Performance</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-bold">
                    Wireless Headphones
                  </TableCell>
                  <TableCell>Accessories</TableCell>
                  <TableCell className="font-medium">1250</TableCell>
                  <TableCell className="font-medium">$45 187</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={90} /> <span>90%</span>
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashAnalytics;
