// Shadcn Comp
import { Button } from "@/components/ui/button";

// Next
import Image from "next/image";

// My Components
import StoreProductCounter from "../ProductComp/StoreProductCounter";

// Stores
import { useCartStore } from "@/utils/CartStore";
import { useUserStore } from "@/utils/UserStore";


const StoreCartCard = ({ item, onRemove }) => {
  const { updateQuantity } = useCartStore();
  const { currentUser } = useUserStore();

  const product = item.product;

  const matchingVariant = product.variants?.find(
    (v) => v.size === item.size && v.color === item.color,
  );

  const maxStock = matchingVariant ? matchingVariant.quantity : 10;

  const handleQtyChange = async (newQty) => {
    const userId = currentUser._id || currentUser.id;
    await updateQuantity(userId, item._id, newQty);
  };

  return (
    <div className="flex items-start justify-between p-3 border-b-2 border-slate-200">
      <div className="flex items-start gap-4">
        <Image
          src={product.previewImages[0]}
          alt={product.title}
          width={100}
          height={100}
          className="rounded-lg object-cover"
        />
        <div>
          <h1 className="text-lg font-bold mb-2 line-clamp-1">
            {product.title}
          </h1>
          <p className="text-sm text-gray-500 mb-3">
            {item.color || "Standard"} / {item.size || "Default"}
          </p>
          <div className="flex items-center gap-3">
            <StoreProductCounter
              value={item.quantity}
              onChange={handleQtyChange}
              max={maxStock}
            />
          </div>
        </div>
      </div>

      <div className="text-right">
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

export default StoreCartCard;
