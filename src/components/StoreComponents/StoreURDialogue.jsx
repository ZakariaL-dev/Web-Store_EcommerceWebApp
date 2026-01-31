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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "../ui/textarea";
import { useReportStore } from "@/utils/ReportStore";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";

// React
import { useState } from "react";

// Date FNS
import { format } from "date-fns";


const StoreURDialogue = ({ OpenStatus, OpenToggle, UId, reportedU }) => {
  const { submitReport } = useReportStore();

  const URarray = [
    "Fraud or Scam",
    "Harassment or Inappropriate Content",
    "Report Manipulation",
    "Abusive Behavior and language",
    "Spam / Advertising",
    "Hate Speech",
    "Off-Topic",
    "Other",
  ];

  const [newReport, setnewReport] = useState({
    reportedBy: UId,
    reportedUser: reportedU,
    reason: "",
    OtherReason: "",
    comment: "",
    timeOfReport: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmitReport = async (e) => {
    e.preventDefault();
    setLoading(true);

    const reportToSubmit = {
      ...newReport,
      timeOfReport: format(new Date(), "E: dd/MM/yyyy - HH:mm:ss"),
    };

    const { success, message } = await submitReport("users", reportToSubmit);

    if (success === "warning") {
      toast.warning(message, {
        duration: 4000,
        style: {
          background: "oklch(87.9% 0.169 91.605)",
          color: "oklch(55.3% 0.195 38.402)",
        },
      });
      setLoading(false);
      return;
    } else if (success === false) {
      toast.error(message, {
        duration: 4000,
        style: {
          background: "oklch(70.4% 0.191 22.216)",
          color: "oklch(50.5% 0.213 27.518)",
        },
      });
      setLoading(false);
      OpenToggle(false);
      return;
    } else if (success === true) {
      toast.success(message, {
        duration: 4000,
        style: {
          background: "oklch(92.5% 0.084 155.995)",
          color: "oklch(69.6% 0.17 162.48)",
        },
      });
      setLoading(false);
      OpenToggle(false);
    }
  };

  //   if (!currentUser) {
  //     OpenToggle(false);
  //     toast.error("Please login to add items to cart", {
  //       duration: 4000,
  //       style: {
  //         background: "oklch(70.4% 0.191 22.216)",
  //         color: "oklch(50.5% 0.213 27.518)",
  //       },
  //     });
  //     return;
  //   }
  return (
    <Dialog open={OpenStatus} onOpenChange={OpenToggle}>
      <form>
        <DialogContent className="max-w-6xl">
          <DialogHeader>
            <DialogTitle>Report a User</DialogTitle>
          </DialogHeader>
          {/* Reason */}
          <div className="grid gap-4 mt-3">
            <div className="grid gap-3">
              <Label htmlFor="reason">Reason for Report</Label>
              <NativeSelect
                id="reason"
                value={newReport.reason}
                onChange={(e) =>
                  setnewReport({
                    ...newReport,
                    reason: e.target.value,
                  })
                }
              >
                <NativeSelectOption value="">
                  Select a reason
                </NativeSelectOption>
                {URarray.map((ur, i) => {
                  return (
                    <NativeSelectOption key={i} value={ur}>
                      {ur}
                    </NativeSelectOption>
                  );
                })}
              </NativeSelect>
              {/* Other */}
              {newReport.reason === "Other" && (
                <>
                  <Label htmlFor="otherR" className={"mt-2"}>
                    Please specify *
                  </Label>
                  <Input
                    id="otherR"
                    placeholder="Describe the reason"
                    value={newReport.OtherReason}
                    onChange={(e) =>
                      setnewReport({
                        ...newReport,
                        OtherReason: e.target.value,
                      })
                    }
                  />
                </>
              )}
            </div>
          </div>
          {/* comment */}
          <div className="grid gap-4 mb-3">
            <div className="grid gap-3">
              <Label htmlFor="message">Comment</Label>
              <Textarea
                placeholder="Provide specific details about the incident...."
                id="message"
                value={newReport.comment}
                onChange={(e) =>
                  setnewReport({
                    ...newReport,
                    comment: e.target.value,
                  })
                }
              />
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
                  <Spinner /> Submitting...
                </div>
              ) : (
                "Submit Report"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default StoreURDialogue;
