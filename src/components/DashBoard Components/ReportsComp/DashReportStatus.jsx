"use client";

// Shadcn Comp
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import { Spinner } from "@/components/ui/spinner";

// Stores
import { useReportStore } from "@/utils/ReportStore";

// React
import { useState } from "react";

// Utils
import { HandeResults } from "@/lib/HandeResults";


const DashReportStatus = ({ OpenStatus, OpenToggle, type, rid, sts }) => {
  const { updateReport, fetchReports } = useReportStore();

  const [status, setStatus] = useState(sts);

  const ReportModule = {
    products: ["pending", "underReview", "resolved"],
    users: ["pending", "reviewed", "action_taken"],
  };

  const [loading, setLoading] = useState(false);

  const handleSubmitReport = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { success, message } = await updateReport(rid, status, type);

    HandeResults(success, message);

    if (success === true) {
      OpenToggle(false);
    }

    setLoading(false);

    fetchReports(type);
  };
  return (
    <Dialog open={OpenStatus} onOpenChange={OpenToggle}>
      <form>
        <DialogContent className="max-w-6xl">
          <DialogHeader>
            <DialogTitle>Change Report Status</DialogTitle>
          </DialogHeader>
          {/* Reason */}
          <div className="grid gap-4 mt-3">
            <div className="grid gap-3">
              <Label htmlFor="sts">Status</Label>
              <NativeSelect
                id="sts"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <NativeSelectOption value="">
                  Select a reason
                </NativeSelectOption>
                {ReportModule[type].map((r, i) => {
                  return (
                    <NativeSelectOption key={i} value={r}>
                      {r}
                    </NativeSelectOption>
                  );
                })}
              </NativeSelect>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              type="submit"
              disabled={loading}
              onClick={(e) => handleSubmitReport(e)}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <Spinner /> Updating...
                </div>
              ) : (
                "Update Status"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default DashReportStatus;
