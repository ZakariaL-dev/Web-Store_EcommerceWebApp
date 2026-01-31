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
import { Spinner } from "@/components/ui/spinner";

// Stores
import { useCouponStore } from "@/utils/CouponStore";
import { useUserStore } from "@/utils/UserStore";

// React
import { useState } from "react";

// Utils
import { HandeResults } from "@/lib/HandeResults";

const StoreCouponDialogue = ({ OpenStatus, OpenToggle, onApplySuccess }) => {
  const { currentUser } = useUserStore();
  const { validateCoupon } = useCouponStore();
  const [Coupon, setCoupon] = useState("");

  const [loading, setLoading] = useState(false);

  if (!currentUser) {
    OpenToggle(false);
    HandeResults(false, "Please login to add items to cart");
    return;
  }

  const handleCheckCode = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { success, message, discount } = await validateCoupon(Coupon);

    HandeResults(success, message);

    if (success === true) {
      onApplySuccess({ code: Coupon, discount: discount });
      setCoupon("");
      OpenToggle(false);
    }
    setLoading(false);
  };

  return (
    <Dialog open={OpenStatus} onOpenChange={OpenToggle}>
      <form>
        <DialogContent className="max-w-6xl">
          <DialogHeader>
            <DialogTitle>Apply Coupon</DialogTitle>
          </DialogHeader>
          {/* user name */}
          <div className="flex items-center justify-center my-4 h-10">
            <Input
              name="name"
              value={Coupon}
              onChange={(e) => setCoupon(e.target.value)}
              placeholder="Enter Your Code"
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              type="submit"
              disabled={loading}
              onClick={(e) => handleCheckCode(e)}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <Spinner /> Applying...
                </div>
              ) : (
                "Apply Code"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default StoreCouponDialogue;
