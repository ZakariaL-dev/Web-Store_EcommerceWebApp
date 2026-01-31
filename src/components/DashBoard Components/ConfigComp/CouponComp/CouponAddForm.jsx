"use client";

// Shadcn Comp
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Spinner } from "@/components/ui/spinner";

// Utils
import { HandeResults } from "@/lib/HandeResults";

// Stores
import { useCouponStore } from "@/utils/CouponStore";

// Lucide React
import { ChevronDownIcon } from "lucide-react";

// React
import { useState } from "react";

const CouponAddForm = ({ editingCoupon, setEditingCoupon }) => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(editingCoupon?.expireDate || "");

  const [NewCoupon, setNewCoupon] = useState({
    code: editingCoupon?.code || "",
    discount: editingCoupon?.discount || "",
    expireDate: date,
  });

  const { addNewCoupon, updateCoupon, getAllCoupons } = useCouponStore();
  const [Loading, setLoading] = useState(false);

  const handleSubmitCoupon = async (e) => {
    e.preventDefault();
    setLoading(true);

    let res;
    if (editingCoupon) {
      res = await updateCoupon(editingCoupon._id, NewCoupon);
    } else {
      res = await addNewCoupon(NewCoupon);
    }

    HandeResults(res.success, res.message);

    if (res.success) {
      setNewCoupon({ code: "", discount: "", expireDate: "" });
      setDate("");
      setEditingCoupon(null); // Reset mode back to "Add"
    }
    setLoading(false);
    getAllCoupons();
  };

  const GenerateRandomCode = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";

    for (let i = 0; i < 8; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }

    setNewCoupon({ ...NewCoupon, code: result });
  };
  return (
    <div className="grid md:grid-cols-2 grid-cols-1 gap-4 my-2 bg-white p-3 rounded-lg mx-3">
      <div>
        <Label htmlFor="code" className="mb-2">
          Coupon Code
        </Label>
        <div className="relative">
          <Input
            id="code"
            placeholder="Enter or Generate Code"
            value={NewCoupon.code}
            onChange={(e) =>
              setNewCoupon({ ...NewCoupon, code: e.target.value })
            }
          />
          <Button
            className="bg-gray-400 hover:bg-gray-600 text-sm absolute right-0"
            onClick={GenerateRandomCode}
          >
            Generate Code
          </Button>
        </div>
      </div>

      <div>
        <Label htmlFor="discount" className="mb-2">
          Discount
        </Label>
        <Input
          id="discount"
          placeholder="e.g 20% or Free Delivery"
          value={NewCoupon.discount}
          onChange={(e) =>
            setNewCoupon({ ...NewCoupon, discount: e.target.value })
          }
        />
      </div>

      <div>
        <Label htmlFor="date" className="mb-2">
          Expiry Date
        </Label>
        <Popover open={open} onOpenChange={setOpen} id="date">
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              id="date"
              className="w-full justify-between font-normal"
            >
              {date
                ? new Date(date).toLocaleDateString("en-GB", {
                    timeZone: "UTC",
                  })
                : "Select a Date"}
              <ChevronDownIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              captionLayout="dropdown"
              onSelect={(date) => {
                setDate(date);
                setOpen(false);
                setNewCoupon({ ...NewCoupon, expireDate: date });
              }}
            />
          </PopoverContent>
        </Popover>
      </div>

      <footer className="space-x-3">
        <Button
          className="mt-5 bg-green-600 hover:bg-green-700"
          onClick={handleSubmitCoupon}
          disabled={Loading}
        >
          {Loading ? (
            <Spinner />
          ) : editingCoupon ? (
            "Update Coupon"
          ) : (
            "Add Coupon"
          )}
        </Button>
        {editingCoupon && (
          <Button
            className={"bg-red-700 hover:bg-red-500"}
            onClick={() => setEditingCoupon(null)}
          >
            Cancel
          </Button>
        )}
      </footer>
    </div>
  );
};

export default CouponAddForm;
