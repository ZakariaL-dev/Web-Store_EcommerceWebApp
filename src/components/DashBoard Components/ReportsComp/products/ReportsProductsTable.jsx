"use client";

// Shadcn Comp
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Stores
import { useReportStore } from "@/utils/ReportStore";

// React
import { useEffect, useState } from "react";

// React Icons
import { FaCaretRight, FaRegCheckCircle } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { TbEyeSearch } from "react-icons/tb";

// My Components
import DashReportStatus from "../DashReportStatus";

// Next
import { useRouter } from "next/navigation";


const ReportsProductsTable = () => {
  const router = useRouter();

  const { ProductReports, fetchReports } = useReportStore();
  useEffect(() => {
    fetchReports("products");
  }, [fetchReports]);

  const [StatusDialogue, setStatusDialogue] = useState(false);

  const [ReportId, setReportId] = useState(null);
  const [ReportStatus, setReportStatus] = useState(null);

  const StatusSwitch = (sts) => {
    switch (sts) {
      case "resolved":
        return (
          <Badge
            className={
              "text-emerald-600 border-emerald-600 bg-emerald-50 text-xs p-1.5"
            }
          >
            <FaRegCheckCircle className="mr-l text-lg" />
            The Problem is resolved
          </Badge>
        );

      case "pending":
        return (
          <Badge
            className={
              "text-amber-400 border-amber-600 bg-amber-50 text-xs p-1.5"
            }
          >
            <Spinner />
            Waiting To review
          </Badge>
        );

      case "underReview":
        return (
          <Badge
            className={"border-blue-600 text-blue-600 bg-blue-50 text-xs p-1.5"}
          >
            <TbEyeSearch className="mr-l text-lg" />
            Under Review
          </Badge>
        );

      default:
        return null;
    }
  };

  if (!ProductReports) {
    return (
      <div className="flex h-32 items-center justify-center text-muted-foreground">
        Loading reports...
      </div>
    );
  }
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="w-[120px]">Report ID</TableHead>
            <TableHead className="min-w-[200px]">Customer</TableHead>
            <TableHead>Cause</TableHead>
            <TableHead>Comment</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ProductReports.length > 0 ? (
            ProductReports.map((p) => {
              return (
                <TableRow key={p._id}>
                  <TableCell className={"w-[200px]"}>
                    <h1 className="font-medium text-blue-700 mb-2">
                      PR-#{p._id.slice(-6)}
                    </h1>
                    <p className="font-semibold">{p.product.title}</p>
                  </TableCell>

                  {/* Improved Customer Cell */}
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarImage
                          src={p.reportedBy.profileImage}
                          alt={p.reportedBy.userName}
                        />
                        <AvatarFallback>{p.reportedBy.userName}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold leading-none">
                          {p.reportedBy.userName}
                        </span>
                        <span className="text-xs text-muted-foreground mt-1">
                          {p.reportedBy.email}
                        </span>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="capitalize whitespace-normal">
                    <span className="text-sm">
                      {p.reason === "Other" ? p.OtherReason : p.reason}
                    </span>
                  </TableCell>

                  <TableCell>
                    <span className="text-sm whitespace-normal">
                      {p.comment}
                    </span>
                  </TableCell>

                  <TableCell>{StatusSwitch(p.status)}</TableCell>

                  <TableCell className="whitespace-normal text-sm">
                    {p.timeOfReport}
                  </TableCell>

                  {/* Aligned Actions */}
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-blue-600 hover:text-blue-800 hover:bg-gray-200"
                        onClick={() => {
                          setReportId(p._id);
                          setReportStatus(p.status);
                          setStatusDialogue(true);
                        }}
                      >
                        <FiEdit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 hover:bg-gray-300"
                        onClick={() =>
                          router.push(`/products/${p.product.slug}`)
                        }
                      >
                        <FaCaretRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell>No products reports found</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {StatusDialogue && (
        <DashReportStatus
          OpenStatus={StatusDialogue}
          OpenToggle={setStatusDialogue}
          type={"products"}
          rid={ReportId}
          sts={ReportStatus}
        />
      )}
    </div>
  );
};

export default ReportsProductsTable;
