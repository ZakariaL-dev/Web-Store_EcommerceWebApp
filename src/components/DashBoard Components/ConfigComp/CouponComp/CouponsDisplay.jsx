"use client";

// Utils
import { HandeResults } from "@/lib/HandeResults";

// Stores
import { useCouponStore } from "@/utils/CouponStore";

// Date FNS
import { format } from "date-fns";

// React
import { useEffect } from "react";

// React Icons
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";


const CouponsDisplay = ({ setEditingCoupon }) => {
  const { Coupons, getAllCoupons, deleteCoupon } = useCouponStore();
  useEffect(() => {
    getAllCoupons();
  }, [getAllCoupons]);

  if (!Coupons) {
    return <div className="my-5 mx-2">Loading Coupons....</div>;
  }

  const DisplayTime = (t) => {
    if (!t) return "N/A";
    const time = t.split("T", 1);
    return format(new Date(time), "MMM dd, yyy");
  };

  const handleDelete = async (id) => {
    const { success, message } = await deleteCoupon(id);
    HandeResults(success, message);
  };

  if (Coupons.length === 0) {
    return (
      <div className="text-center py-10 text-gray-400">
        No coupons found. Create one above!
      </div>
    );
  }

  return (
    <div className="my-5 mx-2">
      {/*  */}
      {Coupons.map((c) => {
        return (
          <div
            key={c._id}
            className="flex items-center justify-between bg-white rounded-lg p-3 border-2 border-gray-300 mb-2.5"
          >
            <div className="flex gap-3 items-center">
              <div
                className={`w-3 h-3 rounded-full ${c.expired ? "bg-red-700" : "bg-emerald-600"}`}
              ></div>
              <div className="text-gray-600">
                <h1 className="font-semibold">{c.code}</h1>
                <p className="text-sm">
                  {c.discount} • {c.expired ? "Expired: " : "Expires: "}
                  {DisplayTime(c.expireDate)}
                </p>
              </div>
            </div>
            {/*  */}
            <div className="flex items-center gap-1.5">
              <CiEdit
                className="text-[20px] cursor-pointer text-gray-500 hover:text-blue-800"
                onClick={() => {
                  setEditingCoupon(c);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              />

              <RiDeleteBin6Line
                className="text-[20px] cursor-pointer text-gray-500 hover:text-red-800"
                onClick={() => handleDelete(c._id)}
              />
            </div>
          </div>
        );
      })}
      {/*  */}
    </div>
  );
};

export default CouponsDisplay;
