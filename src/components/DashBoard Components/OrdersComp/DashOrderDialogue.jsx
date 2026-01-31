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
import { Spinner } from "@/components/ui/spinner";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";

// React
import { useState } from "react";


const DashOrderDialogue = ({
  OpenStatus,
  OpenToggle,
  Update,
  loading,
  Id,
  payment,
  status,
}) => {
  const [Status, setStatus] = useState(status);
  const [PaymentStatus, setPaymentStatus] = useState(payment);

  return (
    <Dialog open={OpenStatus} onOpenChange={OpenToggle}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Update Order #{Id}</DialogTitle>
        </DialogHeader>
        {/*  */}
        <div className="my-4">
          <Label className={"text-[16px]"}>Status</Label>
          <NativeSelect
            className={"my-3"}
            value={Status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <NativeSelectOption value="pending">
              Order In progress
            </NativeSelectOption>
            <NativeSelectOption value="delivered">
              Order is Delivered
            </NativeSelectOption>
            <NativeSelectOption value="canceled">
              Cancel Order
            </NativeSelectOption>
          </NativeSelect>
          {/*  */}
          <Label className={"text-[16px]"}>Payment Status</Label>
          <RadioGroup
            className={"flex items-center my-3"}
            value={String(PaymentStatus)}
            onValueChange={(val) => setPaymentStatus(val === "true")}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="true" id="paid" />
              <Label htmlFor="paid">Paid</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="false" id="notPaid" />
              <Label htmlFor="notPaid">Not Paid</Label>
            </div>
          </RadioGroup>
        </div>
        {/*  */}
        <DialogFooter className="sm:justify-between ">
          <DialogClose asChild>
            <Button type="button" variant="secondary" className={"w-[43%]"}>
              Close
            </Button>
          </DialogClose>
          <Button
            type="button"
            disabled={loading}
            onClick={() =>
              Update({
                status: Status,
                paymentStatus: PaymentStatus,
              })
            }
            className={"bg-amber-600 hover:bg-amber-400 w-[57%]"}
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <Spinner /> Updating...
              </div>
            ) : (
              <>Update Order Status</>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DashOrderDialogue;
