"use client";

// Shadcn Comp
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

// Stores
import { useCartStore } from "@/utils/CartStore";
import { useUserStore } from "@/utils/UserStore";

// My Components
import StoreFinalCartCard from "./StoreFinalCartCard";
import StoreCouponDialogue from "./StoreCouponDialogue";

// React Icons
import { TbShoppingCartExclamation } from "react-icons/tb";

// React
import { useMemo, useState } from "react";

// Next
import { useRouter } from "next/navigation";

// Utils
import { HandeResults } from "@/lib/HandeResults";


const StoreCartPage = () => {
  const {
    cart,
    removeFromCart,
    syncToCheckout,
    setCheckout,
    appliedCoupon,
    setAppliedCoupon,
  } = useCartStore();
  const { currentUser } = useUserStore();
  const router = useRouter();

  const [OpenCoupon, setOpenCoupon] = useState(false);

  // 1. State to track IDs of selected items
  const [selectedItemIds, setSelectedItemIds] = useState([]);

  // 2. Logic to handle individual selection
  const toggleSelection = (itemId) => {
    setSelectedItemIds((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId],
    );
  };

  // 3. Logic to handle "Select All"
  const toggleSelectAll = () => {
    if (selectedItemIds.length === cart.length) {
      setSelectedItemIds([]);
    } else {
      setSelectedItemIds(cart.map((item) => item._id));
    }
  };

  // 4. Calculate Checkout Summary dynamically
  const { subtotal, checkoutList } = useMemo(() => {
    const selectedProducts = cart.filter((item) =>
      selectedItemIds.includes(item._id),
    );

    const total = selectedProducts.reduce((acc, item) => {
      const price =
        item.product.status === "on sale"
          ? item.product.price -
            (item.product.price * item.product.discount) / 100
          : item.product.price;
      return acc + price * item.quantity;
    }, 0);

    return {
      subtotal: total,
      checkoutList: selectedProducts,
    };
  }, [cart, selectedItemIds]);

  const deliveryFee = subtotal > 0 ? 600 : 0;
  //

  const handleRemove = async (itemId) => {
    const userId = currentUser._id || currentUser.id;
    const { success, message } = await removeFromCart(userId, itemId);

    HandeResults(success, message);
  };

  const handleUpdateCheckout = async () => {
    const userId = currentUser._id || currentUser.id;
    const selectedProducts = cart.filter((item) =>
      selectedItemIds.includes(item._id),
    );

    // Validation: Check if any selected item is missing color or size
    const isIncomplete = selectedProducts.some(
      (item) => !item.color || !item.size,
    );

    if (isIncomplete) {
      HandeResults("warning", "Please select both color and size for all items !!!");
      return;
    }

    const { success, message } = await syncToCheckout(userId, selectedProducts);

    HandeResults(success, message);
  };

  const handleProceed = async () => {
    const userId = currentUser._id || currentUser.id;
    const selectedProducts = cart.filter((item) =>
      selectedItemIds.includes(item._id),
    );

    // 1. Sync to DB first
    const res = await syncToCheckout(userId, selectedProducts);

    if (res.success) {
      setCheckout(selectedProducts);
      router.push("/cart/checkout");
    } else {
      HandeResults(false, "Failed to prepare checkout");
    }
  };

  const finalTotal = useMemo(() => {
    let baseSum = subtotal + deliveryFee;

    if (appliedCoupon) {
      const discountStr = appliedCoupon.discount.toString().toLowerCase();

      if (discountStr.includes("%")) {
        const percentage = parseFloat(discountStr) / 100;
        baseSum = baseSum - baseSum * percentage;
      } else if (discountStr === "free delivery") {
        baseSum = baseSum - deliveryFee;
      } else {
        baseSum = baseSum - parseFloat(discountStr);
      }
    }

    return Math.max(0, baseSum);
  }, [subtotal, deliveryFee, appliedCoupon]);

  return (
    <div className="cartpage">
      <div>
        <header>
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-3 ">
              <Checkbox
                checked={
                  selectedItemIds.length === cart.length && cart.length > 0
                }
                onCheckedChange={toggleSelectAll}
                className="sm:w-6 sm:h-6"
              />
              <p className="sm:text-lg text-xs">
                {selectedItemIds.length} Items Selected
              </p>
            </div>
            {selectedItemIds.length != 0 && (
              <div className="flex items-center">
                <Button
                  variant={"link"}
                  className="text-red-800 hover:text-red-600 sm:text-lg text-xs"
                >
                  Remove
                </Button>
                <p className="sm:text-xl text-xs font-semibold text-indigo-900">
                  |
                </p>
                <Button
                  variant={"link"}
                  className="text-red-300 hover:text-red-400 sm:text-lg text-xs"
                >
                  Move to wishlist
                </Button>
              </div>
            )}
          </div>
          <Separator />
        </header>
        <main>
          {cart.map((item) => {
            return (
              <div key={item._id} className="flex items-center gap-3">
                <Checkbox
                  checked={selectedItemIds.includes(item._id)}
                  onCheckedChange={() => toggleSelection(item._id)}
                  className="sm:w-6 sm:h-6"
                />
                <StoreFinalCartCard
                  item={item}
                  onRemove={() => handleRemove(item._id)}
                />
              </div>
            );
          })}
        </main>
        <footer className="flex items-center justify-end gap-3 py-4">
          <Button variant={"outline"}>Continue Shopping</Button>
          <Button onClick={handleUpdateCheckout}>Update Checkout Cart</Button>
        </footer>
      </div>
      {/*  */}
      <div>
        <header className="sm:text-2xl text-lg font-bold p-3">
          Checkout Cart Summary
        </header>
        {selectedItemIds.length === 0 && (
          <div className="h-68 flex flex-col items-center justify-center gap-5">
            <TbShoppingCartExclamation className="text-8xl" />
            <p className="max-w-3xl font-semibold">
              No Product Added to Checkout Cart
            </p>
          </div>
        )}
        <Separator />
        <main className="py-3">
          <div className="w-full flex items-center justify-between px-6">
            <h1>Subtotal</h1>
            <p className="font-bold text-gray-600">{subtotal.toFixed(2)} Dz</p>
          </div>
          <div className="w-full flex items-center justify-between px-6">
            <h1>Coupon Discount</h1>
            {appliedCoupon ? (
              <div className="flex flex-col items-end">
                <p className="font-bold text-green-600">
                  -{appliedCoupon.discount}
                </p>
                <Button
                  variant="link"
                  className="h-auto p-0 text-xs text-red-500"
                  onClick={() => setAppliedCoupon(null)}
                >
                  Remove ({appliedCoupon.code})
                </Button>
              </div>
            ) : (
              <Button
                variant={"link"}
                className="font-bold text-blue-600 px-0"
                onClick={() => setOpenCoupon(true)}
              >
                Apply Coupon
              </Button>
            )}
          </div>
          <div className="w-full flex items-center justify-between px-6">
            <h1>Delivery Fee</h1>
            <p
              className={`font-bold ${appliedCoupon?.discount.toLowerCase() === "free delivery" ? "text-gray-400 line-through" : "text-green-600"}`}
            >
              +{deliveryFee}.00 Dz
            </p>
          </div>
        </main>
        {/* <Separator /> */}
        <footer className="py-2">
          <div className="w-full flex items-center justify-between px-6">
            <h1 className="text-xl font-bold">Total Amount</h1>
            <p className="font-bold text-gray-600">
              {finalTotal.toFixed(2)} Dz
            </p>
          </div>
          <div className="w-full py-4 text-right">
            <Button
              disabled={selectedItemIds.length === 0}
              onClick={handleProceed}
            >
              Proceed To Checkout
            </Button>
          </div>
        </footer>

        {/* Coupon Dialogue */}
        {OpenCoupon && (
          <StoreCouponDialogue
            OpenStatus={OpenCoupon}
            OpenToggle={setOpenCoupon}
            onApplySuccess={(couponData) => setAppliedCoupon(couponData)}
          />
        )}
      </div>
    </div>
  );
};

export default StoreCartPage;
