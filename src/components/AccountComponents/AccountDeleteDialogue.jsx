"use client";

// Shadcn Comp
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Spinner } from "../ui/spinner";

// React Icons
import { AiOutlineUserDelete } from "react-icons/ai";


export function AccountDeleteDialogue({
  OpenStatus,
  OpenToggle,
  Delete,
  loading,
}) {
  return (
    <Dialog open={OpenStatus} onOpenChange={OpenToggle}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Delete Account</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete your account? This action cannot be
            undone and all your data will be permanently removed.
          </DialogDescription>
        </DialogHeader>
        <div className="bg-red-100 border-2 border-red-700 text-red-500 py-4 px-3 rounded-xl text-sm">
          ⚠️ Warning: This will permanently delete your account and all
          associated data.
        </div>
        <DialogFooter className="sm:justify-between ">
          <DialogClose asChild>
            <Button type="button" variant="secondary" className={"w-[43%]"}>
              Close
            </Button>
          </DialogClose>
          <Button
            type="submit"
            disabled={loading}
            onClick={Delete}
            className={"bg-red-600 hover:bg-red-400 w-[57%]"}
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <Spinner /> Deleting...
              </div>
            ) : (
              <>
                <AiOutlineUserDelete />
                Confirme Delete Profile
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
