"use client";

// Shadcn Comp
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Spinner } from "../ui/spinner";
import { NativeSelect, NativeSelectOption } from "../ui/native-select";

// React Icons
import { FiEdit } from "react-icons/fi";
import { MdProductionQuantityLimits } from "react-icons/md";
import { TbEyeSearch, TbUserExclamation } from "react-icons/tb";
import { GoClock } from "react-icons/go";
import { BsExclamationTriangle } from "react-icons/bs";
import { FaRegCheckCircle } from "react-icons/fa";

// Stores
import { useReportStore } from "@/utils/ReportStore";
import { useUserStore } from "@/utils/UserStore";

// React
import { useEffect, useState, useMemo } from "react";


const AccountReports = () => {
  const { ProductReports, UserReports, fetchReports } = useReportStore();
  const [Type, setType] = useState("");
  const { currentUser } = useUserStore();

  useEffect(() => {
    fetchReports("products");
    fetchReports("users");
  }, [fetchReports]);

  const filteredReports = useMemo(() => {
    let baseData = [];
    if (Type === "users") baseData = UserReports;
    else if (Type === "products") baseData = ProductReports;
    else baseData = [...UserReports, ...ProductReports];
    return baseData
      .filter((report) => report.reportedBy?._id === currentUser?._id)
      .map((report) => {
        const isProduct = "product" in report;
        return {
          id: report._id,
          title: isProduct
            ? report.product.title
            : report.reportedUser.userName,
          cause: report.reason,
          other: report.OtherReason,
          comment: report.comment,
          date: report.timeOfReport,
          status: report.status,
          icon: isProduct ? MdProductionQuantityLimits : TbUserExclamation,
          type: isProduct ? "product" : "user",
        };
      });
  }, [Type, ProductReports, UserReports, currentUser]);

  const counts = useMemo(() => {
    return {
      pending: filteredReports.filter((r) => r.status === "pending").length,
      progress: filteredReports.filter((r) =>
        ["underReview", "reviewed"].includes(r.status),
      ).length,
      resolved: filteredReports.filter((r) =>
        ["resolved", "action_taken"].includes(r.status),
      ).length,
    };
  }, [filteredReports]);

  const reportsCount = [
    {
      title: "Pending",
      count: counts.pending,
      icon: (
        <GoClock className="w-8 h-8 p-1.5 text-yellow-700 bg-amber-100 rounded-md" />
      ),
    },
    {
      title: "Under Review",
      count: counts.progress,
      icon: (
        <BsExclamationTriangle className="w-8 h-8 p-1.5 text-cyan-700 bg-cyan-100 rounded-md" />
      ),
    },
    {
      title: "Resolved",
      count: counts.resolved,
      icon: (
        <MdProductionQuantityLimits className="w-8 h-8 p-1.5 text-emerald-700 bg-emerald-100 rounded-md" />
      ),
    },
  ];

  const StatusSwitch = (sts) => {
    switch (sts) {
      case "resolved":
        return (
          <Badge
            className={
              "text-emerald-600 border-emerald-600 bg-emerald-50 text-xs"
            }
          >
            <FaRegCheckCircle className="mr-l text-lg" />
            The Problem is resolved
          </Badge>
        );

      case "action_taken":
        return (
          <Badge
            className={
              "text-emerald-600 border-emerald-600 bg-emerald-50 text-xs"
            }
          >
            <FaRegCheckCircle className="mr-l text-lg" />
            Action Taken
          </Badge>
        );

      case "pending":
        return (
          <Badge
            className={"text-amber-400 border-amber-600 bg-amber-50 text-xs"}
          >
            <Spinner />
            Waiting To review
          </Badge>
        );

      case "underReview":
        return (
          <Badge className={"border-blue-600 text-blue-600 bg-blue-50 text-xs"}>
            <TbEyeSearch className="mr-l text-lg" />
            Under Review
          </Badge>
        );

      case "reviewed":
        return (
          <Badge className={"border-blue-600 text-blue-600 bg-blue-50 text-xs"}>
            <TbEyeSearch className="mr-l text-lg" />
            Under Review
          </Badge>
        );

      default:
        return null;
    }
  };

  if (!ProductReports || !UserReports) {
    return (
      <div className="flex h-32 items-center justify-center text-muted-foreground">
        Loading reports...
      </div>
    );
  }

  return (
    <>
      <header className="flex items-center justify-between mb-5">
        <h1 className="text-4xl font-bold">
          Total Reports:{" "}
          <span className="text-gray-400">{filteredReports.length}</span>
        </h1>
        <NativeSelect
          className="w-[180px]"
          value={Type}
          onChange={(e) => setType(e.target.value)}
        >
          <NativeSelectOption value="">All Reports</NativeSelectOption>
          <NativeSelectOption value="users">Users Reports</NativeSelectOption>
          <NativeSelectOption value="products">
            Products Reports
          </NativeSelectOption>
        </NativeSelect>
      </header>
      {/* card counts */}
      <div className="flex gap-4 mb-6">
        {reportsCount.map((rc, i) => {
          return (
            <Card key={i} className="w-full max-w-xs">
              <CardHeader>
                <CardTitle>{rc.title}</CardTitle>
                <CardDescription className="text-2xl font-bold">
                  {rc.count}
                </CardDescription>
                <CardAction>{rc.icon}</CardAction>
              </CardHeader>
            </Card>
          );
        })}
      </div>
      {/* reports diplay */}
      <main className="w-full border-2 rounded-xl">
        {filteredReports.map((r) => {
          console.log(r);

          return (
            <div
              key={r.id}
              className="flex justify-between items-start py-3 px-4 transition-all ease-in-out duration-200 hover:bg-gray-100 border-b-2 border-gray-300 last:border-0 first:rounded-t-xl last:rounded-b-xl"
            >
              <div className="w-full">
                <div className="flex items-center justify-between mb-2 w-full">
                  <div className="flex items-center gap-4">
                    <r.icon className="text-red-800 text-xl" />
                    <h1 className="font-bold">
                      {r.cause === "Other" ? r.other : r.cause}
                    </h1>
                  </div>
                  {StatusSwitch(r.status)}
                </div>
                <p className="mb-1 pr-3">{r.comment}</p>
                <div className="flex items-center gap-4 mb-3 text-sm text-gray-400 font-semibold">
                  <h1>{r.title}</h1>
                  <p className="flex items-center gap-1">
                    <GoClock />
                    {r.date}
                  </p>
                </div>
              </div>
              {/* <div className="flex flex-col items-center">
                <Button
                  variant="ghost"
                  className="p-2 hover:bg-gray-200 text-blue-600 hover:text-blue-800"
                  asChild
                >
                  <FiEdit className="w-8 h-8" />
                </Button>
                <Button
                  variant="ghost"
                  className="p-2 hover:bg-gray-200 text-red-600 hover:text-red-800"
                  asChild
                >
                  <MdOutlineDeleteForever className="w-9 h-9" />
                </Button>
              </div> */}
            </div>
          );
        })}
      </main>
    </>
  );
};

export default AccountReports;
