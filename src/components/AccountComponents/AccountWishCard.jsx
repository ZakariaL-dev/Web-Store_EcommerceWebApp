"use client";

// Shadcn Comp
import { Button } from "@/components/ui/button";
import { Spinner } from "../ui/spinner";

// Next
import Image from "next/image";

// React
import { useState } from "react";

// Stores
import { useUserStore } from "@/utils/UserStore";
import { useCartStore } from "@/utils/CartStore";

// Utils
import { HandeResults } from "@/lib/HandeResults";


const AccountWishCard = ({ product, onRemove }) => {
  const { addToCart } = useCartStore();
  const { currentUser } = useUserStore();
  const [addLoad, setAddLoad] = useState(false);

  const handleAddtoCart = async () => {
    if (!currentUser) {
      HandeResults(false, "Please login to add items to cart");
      return;
    }
    setAddLoad(true);

    const userId = currentUser._id || currentUser.id;

    const { success, message } = await addToCart(userId, product, {
      color: product.colors ? product.colors[0] : "",
      size: product.sizes ? product.sizes[0] : "",
      quantity: 1,
    });
    HandeResults(success, message);

    if (success === true) {
      onRemove();
    }

    setAddLoad(false);
  };
  return (
    <div className="flex items-start justify-between p-3 border-b-2 border-slate-200">
      <div className="flex items-start gap-4">
        <Image
          src={product.previewImages[0]}
          alt={product.title}
          width={150}
          height={200}
          className="rounded-lg"
        ></Image>
        <div>
          <h1 className="text-2xl font-semibold mb-2">{product.title}</h1>
          <p className="text-lg text-gray-500 mb-3">{product.description}</p>
          <div className="flex items-center gap-3">
            {addLoad ? (
              <Button className="py-5 flex gap-3 items-center" disabled={true}>
                <Spinner /> Moving to Cart ....
              </Button>
            ) : (
              <Button className="py-5" onClick={handleAddtoCart}>
                Move to Cart
              </Button>
            )}
          </div>
        </div>
      </div>
      {/*  */}
      <div className="text-right">
        {product.status === "on sale" ? (
          <div className="flex gap-4">
            <p className="mb-3 font-bold line-through text-slate-300">
              {product.price} Dz
            </p>
            <p className="mb-3 font-bold text-red-700">
              {(
                product.price -
                (product.price * product.discount) / 100
              ).toFixed(2)}{" "}
              Dz
            </p>
          </div>
        ) : (
          <p className="mb-3 font-bold text-gray-500">{product.price} Dz</p>
        )}
        <Button
          variant={"ghost"}
          className="text-red-800 hover:text-red-600 hover:bg-red-100"
          onClick={onRemove}
        >
          Remove
        </Button>
      </div>
    </div>
  );
};

export default AccountWishCard;
