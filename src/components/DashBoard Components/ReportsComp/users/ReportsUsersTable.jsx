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
import { FaRegCheckCircle } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { TbEyeSearch } from "react-icons/tb";

// My Components
import DashReportStatus from "../DashReportStatus";


const ReportsUsersTable = () => {
  const { UserReports, fetchReports } = useReportStore();
  useEffect(() => {
    fetchReports("users");
  }, [fetchReports]);

  const [StatusDialogue, setStatusDialogue] = useState(false);

  const [ReportId, setReportId] = useState(null);
  const [ReportStatus, setReportStatus] = useState(null);

  if (!UserReports) {
    return (
      <div className="flex h-32 items-center justify-center text-muted-foreground">
        Loading reports...
      </div>
    );
  }

  const StatusSwitch = (sts) => {
    switch (sts) {
      case "action_taken":
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

      case "reviewed":
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

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="w-[120px]">Report ID</TableHead>
            <TableHead className="min-w-40">Reporter</TableHead>
            <TableHead className="min-w-40">Reported Customer</TableHead>
            <TableHead>Cause</TableHead>
            <TableHead>Comment</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {UserReports.length > 0 ? (
            UserReports.map((u) => {
              return (
                <TableRow key={u._id}>
                  <TableCell className="font-medium text-blue-700">
                    CR-#{u._id.slice(-6)}
                  </TableCell>

                  {/* Improved Customer Cell */}
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarImage
                          src={u.reportedBy.profileImage}
                          alt={u.reportedBy.userName}
                        />
                        <AvatarFallback>{u.reportedBy.userName}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold leading-none">
                          {u.reportedBy.userName}
                        </span>
                        <span className="text-xs text-muted-foreground mt-1">
                          {u.reportedBy.email}
                        </span>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarImage
                          src={u.reportedUser.profileImage}
                          alt={u.reportedUser.userName}
                        />
                        <AvatarFallback>
                          {u.reportedUser.userName}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold leading-none">
                          {u.reportedUser.userName}
                        </span>
                        <span className="text-xs text-muted-foreground mt-1">
                          {u.reportedUser.email}
                        </span>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="capitalize whitespace-normal">
                    <span className="text-sm">
                      {u.reason === "Other" ? u.OtherReason : u.reason}
                    </span>
                  </TableCell>

                  <TableCell>
                    <span className="text-sm whitespace-normal text-wrap">
                      {u.comment}
                    </span>
                  </TableCell>

                  <TableCell>{StatusSwitch(u.status)}</TableCell>

                  <TableCell className="whitespace-normal text-sm">
                    {u.timeOfReport}
                  </TableCell>

                  {/* Aligned Actions */}
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-blue-600 hover:text-blue-800 hover:bg-gray-200"
                        onClick={() => {
                          setReportId(u._id);
                          setReportStatus(u.status);
                          setStatusDialogue(true);
                        }}
                      >
                        <FiEdit className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell>No users reports found</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {StatusDialogue && (
        <DashReportStatus
          OpenStatus={StatusDialogue}
          OpenToggle={setStatusDialogue}
          type={"users"}
          rid={ReportId}
          sts={ReportStatus}
        />
      )}
    </div>
  );
};

export default ReportsUsersTable;
