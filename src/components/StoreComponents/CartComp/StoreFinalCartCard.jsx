"use client";

// Shadcn Comp
import { Button } from "@/components/ui/button";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";

// Next
import Image from "next/image";

// My Components
import StoreProductCounter from "../ProductComp/StoreProductCounter";

// Stores
import { useCartStore } from "@/utils/CartStore";
import { useUserStore } from "@/utils/UserStore";


const StoreFinalCartCard = ({ item, onRemove }) => {
  const { updateQuantity, updateVariant } = useCartStore();
  const { currentUser } = useUserStore();
  const userId = currentUser._id || currentUser.id;
  const product = item.product;

  const matchingVariant = product.variants?.find(
    (v) => v.size === item.size && v.color === item.color
  );

  const maxStock = matchingVariant ? matchingVariant.quantity : 10;

  const handleQtyChange = async (newQty) => {
    const userId = currentUser._id || currentUser.id;
    await updateQuantity(userId, item._id, newQty);
  };

  const availableSizes = item.product.variants
    .filter((v) => v.color === item.color)
    .map((v) => v.size);

  return (
    <div className="flex items-start justify-between p-3 border-b-2 border-slate-200 w-full">
      <div className="flex items-start gap-4">
        <Image
          src={product.previewImages[0]}
          alt={product.title}
          width={100}
          height={100}
          className="rounded-lg object-cover"
        />
        <div>
          <h1 className="sm:text-lg text-2xs font-bold mb-2 line-clamp-1">
            {product.title}
          </h1>
          <div className="sm:hidden block mb-2">
            {product.status === "on sale" ? (
              <h1 className="font-bold text-lg">
                {(
                  product.price -
                  (product.price * product.discount) / 100
                ).toFixed(2)}
                Dz
              </h1>
            ) : (
              <h1 className="font-bold text-lg">{product.price} Dz</h1>
            )}
          </div>
          <div className="text-sm text-gray-500 mb-3 flex items-center gap-2.5">
            <NativeSelect
              className="w-32"
              value={item.color}
              onChange={(e) => {
                const newColor = e.target.value;

                const sizeExistsForColor = product.variants.some(
                  (v) => v.color === newColor && v.size === item.size,
                );

                const nextSize = sizeExistsForColor ? item.size : "";

                updateVariant(userId, item._id, newColor, nextSize);
              }}
            >
              <NativeSelectOption value="">Color</NativeSelectOption>
              {[...new Set(item.product.variants.map((v) => v.color))].map(
                (c, i) => (
                  <NativeSelectOption key={i} value={c}>
                    {c}
                  </NativeSelectOption>
                ),
              )}
            </NativeSelect>
            <p className="text-xl font-semibold">/</p>
            <NativeSelect
              value={item.size}
              className="w-32"
              onChange={(e) =>
                updateVariant(userId, item._id, item.color, e.target.value)
              }
            >
              <NativeSelectOption value="">Size</NativeSelectOption>
              {availableSizes.map((size, i) => (
                <NativeSelectOption key={i} value={size}>
                  {size}
                </NativeSelectOption>
              ))}
            </NativeSelect>
          </div>
          <div className="flex items-center gap-3">
            <StoreProductCounter
              value={item.quantity}
              onChange={handleQtyChange}
              max={maxStock}
            />
            <Button
              variant={"ghost"}
              className="text-red-800 hover:text-red-600 hover:bg-red-100 sm:hidden block"
              onClick={onRemove}
            >
              Remove
            </Button>
          </div>
        </div>
      </div>

      <div className="text-right sm:block hidden">
        {/* <h1 className="mb-2 font-bold text-slate-800">{product.price} Dz</h1> */}
        {product.status === "on sale" ? (
          <h1 className="font-bold text-lg">
            {(product.price - (product.price * product.discount) / 100).toFixed(
              2,
            )}
            Dz
          </h1>
        ) : (
          <h1 className="font-bold text-lg">{product.price} Dz</h1>
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

export default StoreFinalCartCard;
