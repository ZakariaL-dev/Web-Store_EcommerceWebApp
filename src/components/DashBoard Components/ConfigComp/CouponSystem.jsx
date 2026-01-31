"use client";

// React
import { useState } from "react";

// My Components
import CouponAddForm from "./CouponComp/CouponAddForm";
import CouponsDisplay from "./CouponComp/CouponsDisplay";

const CouponSystem = () => {
  const [editingCoupon, setEditingCoupon] = useState(null);
  return (
    <div className="w-full border-2 rounded-lg p-3 bg-slate-50">
      <header className="text-lg mb-3 font-semibold">
        {editingCoupon ? "Edit Coupon" : "Coupon Management"}
      </header>
      <CouponAddForm
        key={editingCoupon?._id || "new-coupon"}
        editingCoupon={editingCoupon}
        setEditingCoupon={setEditingCoupon}
      />

      <CouponsDisplay setEditingCoupon={setEditingCoupon} />
    </div>
  );
};

export default CouponSystem;
