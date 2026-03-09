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
    <div className="grid md:grid-cols-[4fr_1fr] grid-cols-1 p-3 border-b-2 border-slate-200">
      <div className="flex items-start gap-4 w-full">
        <Image
          src={product.previewImages[0]}
          alt={product.title}
          width={150}
          height={200}
          className="rounded-lg"
        ></Image>
        <div>
          <h1 className="md:text-2xl text-lg font-semibold mb-2 ">
            {product.title}
          </h1>
          <p className="md:text-lg text-2xs text-gray-500 mb-3">
            {product.description}
          </p>
          {/* bigger screens */}
          <Button
            className="py-5 md:flex gap-3 items-center hidden"
            disabled={addLoad}
            onClick={handleAddtoCart}
          >
            {addLoad ? (
              <>
                <Spinner /> Moving to Cart ....
              </>
            ) : (
              "Move to Cart"
            )}
          </Button>
          {/* smaller screens */}
          <div className="md:hidden block">
            {product.status === "on sale" ? (
              <div className="space-x-4 ">
                <span className="font-bold line-through text-slate-300">
                  {product.price} Dz
                </span>
                <span className="font-bold text-red-700">
                  {(
                    product.price -
                    (product.price * product.discount) / 100
                  ).toFixed(2)}{" "}
                  Dz
                </span>
              </div>
            ) : (
              <p className="font-bold text-gray-500">{product.price} Dz</p>
            )}
          </div>
        </div>
      </div>
      {/* bigger screens */}
      <div className="text-right w-full md:block hidden">
        {product.status === "on sale" ? (
          <div className="space-x-4 ">
            <span className="font-bold line-through text-slate-300">
              {product.price} Dz
            </span>
            <span className="font-bold text-red-700">
              {(
                product.price -
                (product.price * product.discount) / 100
              ).toFixed(2)}{" "}
              Dz
            </span>
          </div>
        ) : (
          <p className="font-bold text-gray-500 text-right">
            {product.price} Dz
          </p>
        )}
        <Button
          variant={"ghost"}
          className="text-red-800 hover:text-red-600 hover:bg-red-100 mt-2.5"
          onClick={onRemove}
        >
          Remove
        </Button>
      </div>
      {/* smaller screens */}
      <div className="grid grid-cols-2 md:hidden mt-3 gap-4">
        <Button
          variant={"ghost"}
          className="text-red-800 bg-red-100 hover:text-red-600 hover:bg-red-200 py-5"
          onClick={onRemove}
        >
          Remove
        </Button>
        <Button
          className="py-5 md:flex gap-3 items-center"
          disabled={addLoad}
          onClick={handleAddtoCart}
        >
          {addLoad ? (
            <>
              <Spinner /> Moving to Cart ....
            </>
          ) : (
            "Move to Cart"
          )}
        </Button>
      </div>
    </div>
  );
};

export default AccountWishCard;
