"use client";

// Shadcn Comp
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";

// Stores
import { useConfigureStore } from "@/utils/ConfigStore";

// Date FNS
import { format } from "date-fns";

// React
import { useState } from "react";


const ContentPageUpdate = ({ OpenStatus, OpenToggle, page }) => {
  const { updateConfigure } = useConfigureStore();

  const [updatedPage, setUpdatedPage] = useState({
    description: page?.description,
    updated: page?.updated,
  });

  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    setLoading(true);
    const UpdatedContent = {
      ...updatedPage,
      updated: format(new Date(), "MMM dd, yyy"),
    };

    const { success, message } = await updateConfigure(
      process.env.NEXT_PUBLIC_Store_Config,
      UpdatedContent,
      "contents",
      page?._id,
    );

    if (!success) {
      toast.error(message, {
        duration: 4000,
        style: {
          background: "oklch(70.4% 0.191 22.216)",
          color: "oklch(50.5% 0.213 27.518)",
        },
      });
    } else if (success) {
      toast.success("Page updated!", {
        duration: 4000,
        style: {
          background: "oklch(92.5% 0.084 155.995)",
          color: "oklch(69.6% 0.17 162.48)",
        },
      });
      OpenToggle(null)
    }
    setLoading(false);
  };
  return (
    <Dialog open={OpenStatus} onOpenChange={OpenToggle}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{page?.title}</DialogTitle>
        </DialogHeader>

        <div
          contentEditable
          suppressContentEditableWarning
          spellCheck="true"
          onBlur={(e) =>
            setUpdatedPage({
              ...updatedPage,
              description: e.currentTarget.innerText,
            })
          }
          className="outline-none focus:outline-none text-[16px] leading-relaxed h-[400px] cursor-text border-y-2 py-2 overflow-y-scroll"
        >
          {updatedPage.description}
        </div>
        <footer className="text-right">
          <Button
            className="bg-green-600 hover:bg-green-800 px-8"
            onClick={handleUpdate}
            disabled={loading}
          >
            {loading ? <Spinner /> : "Save Changes"}
          </Button>
        </footer>
      </DialogContent>
    </Dialog>
  );
};

export default ContentPageUpdate;
