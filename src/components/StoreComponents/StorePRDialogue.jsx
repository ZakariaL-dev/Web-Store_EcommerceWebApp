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
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";

// Date FNS
import { format } from "date-fns";

// Stores
import { useReportStore } from "@/utils/ReportStore";
import { useUserStore } from "@/utils/UserStore";

// React
import { useState } from "react";


const StorePRDialogue = ({ OpenStatus, OpenToggle, pId }) => {
  const { currentUser } = useUserStore();
  const { submitReport } = useReportStore();

  const PRarray = [
    "Incorrect or Misleading Information",
    "Pricing Error",
    "Image Issue",
    "Incorrect Category",
    "Duplicate Listing",
    "Broken Links",
    "Discount Code Not Working",
    "Other",
  ];

  const [newReport, setnewReport] = useState({
    reportedBy: currentUser._id,
    product: pId,
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

    const { success, message } = await submitReport("products", reportToSubmit);

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

  if (!currentUser) {
    OpenToggle(false);
    toast.error("Please login to add items to cart", {
      duration: 4000,
      style: {
        background: "oklch(70.4% 0.191 22.216)",
        color: "oklch(50.5% 0.213 27.518)",
      },
    });
    return;
  }
  return (
    <Dialog open={OpenStatus} onOpenChange={OpenToggle}>
      <form>
        <DialogContent className="max-w-6xl">
          <DialogHeader>
            <DialogTitle>Report a Product Issue</DialogTitle>
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
                {PRarray.map((pr, i) => {
                  return (
                    <NativeSelectOption key={i} value={pr}>
                      {pr}
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
                    placeholder="What is the Problem ?"
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
                placeholder="Type your issu here."
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

export default StorePRDialogue;
