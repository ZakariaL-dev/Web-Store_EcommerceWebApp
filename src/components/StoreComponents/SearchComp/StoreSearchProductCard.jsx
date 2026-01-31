"use client";

// Shadcn Comp
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

// Next
import Image from "next/image";
import Link from "next/link";

// React Icons
import { MdCompareArrows } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa6";
import { RiHeart3Fill } from "react-icons/ri";

// React
import { useState } from "react";

// Stores
import { useUserStore } from "@/utils/UserStore";
import { useCartStore } from "@/utils/CartStore";
import { useUtilityStore } from "@/utils/UtilsStore";

// Utils
import { HandeResults } from "@/lib/HandeResults";

const StoreSearchProductCard = ({ product }) => {
  const { addToCart } = useCartStore();
  const { currentUser } = useUserStore();
  const [loading, setLoading] = useState(false);

  const handleAction = (e) => {
    e.preventDefault(); // Prevents the Link from triggering
    e.stopPropagation(); // Stops the click from bubbling up to the Link
  };

  const HandleSubmitToCart = async (e) => {
    handleAction(e);
    if (!currentUser) {
      HandeResults(false, "Please login to add items to cart");
      return;
    }
    setLoading(true);

    const userId = currentUser._id || currentUser.id;

    const { success, message } = await addToCart(userId, product, {
      color: product.colors ? product.colors[0] : "",
      size: product.sizes ? product.sizes[0] : "",
      quantity: 1,
    });
    HandeResults(success, message);
    setLoading(false);
  };

  // add to favorites
  const { wishlist, toggleWishlist, compareList, toggleCompare } =
    useUtilityStore();
  const isFavorite =
    wishlist?.some((id) => String(id) === String(product._id)) || false;
  const handleToggleFavorite = async (e) => {
    handleAction(e);
    if (!currentUser) {
      HandeResults(false, "Please login to add items to cart");
      return;
    }

    const userId = currentUser._id || currentUser.id;

    const { success, message } = await toggleWishlist(userId, product._id);

    HandeResults(success, message);
  };

  // add to compare list
  const isInCompare =
    compareList?.some((id) => String(id) === String(product._id)) || false;

  const handleToggleCompare = async (e) => {
    handleAction(e);
    if (!currentUser) {
      HandeResults(false, "Please login to add items to cart");
      return;
    }
    const userId = currentUser._id || currentUser.id;
    const { success, message } = await toggleCompare(userId, product._id);

    HandeResults(success, message);
  };

  return (
    <Link
      href={`/products/${product.slug}`}
      className=" m-4 border-2 border-gray-300 w-full overflow-hidden rounded-2xl h-[388px] transition-all ease-in-out hover:shadow-xl group flex flex-col"
    >
      <div className="relative h-full">
        <Image
          src={product.previewImages[0]}
          alt={product.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        ></Image>
        {product.status === "new" && (
          <Badge className="absolute top-1 left-1">New</Badge>
        )}
        {product.status === "on sale" && (
          <Badge className="absolute top-1 left-1 bg-red-700">On Sale</Badge>
        )}
      </div>

      <div className="p-3 transition-all ease-in-out group-hover:-translate-y-14 bg-white z-10 h-20">
        <h1 className="text-lg mb-1 font-bold truncate">{product.title}</h1>
        {product.status === "on sale" ? (
          <div className="flex gap-4">
            <p className="mb-3 font-bold line-through text-slate-300">
              {product.price} Dz
            </p>
            <p className="mb-3 font-bold text-red-700">
              {(
                product.price -
                (product.price * product.discount) / 100
              ).toFixed(2)}
              Dz
            </p>
          </div>
        ) : (
          <p className="mb-3 font-bold text-gray-500">{product.price} Dz</p>
        )}
        <div className="flex gap-3 items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            variant="outline"
            onClick={(e) => {
              HandleSubmitToCart(e);
            }}
          >
            {loading ? (
              <div className="flex items-center gap-3 justify-center">
                <Spinner />
                <h1>Adding ....</h1>
              </div>
            ) : (
              "Add To Cart"
            )}
          </Button>
          <div className="flex items-center">
            {isFavorite ? (
              <Button
                variant="ghost"
                className="p-2 hover:text-red-900"
                onClick={(e) => handleToggleFavorite(e)}
                asChild
              >
                <RiHeart3Fill className="w-10 h-10 text-red-600 " />
              </Button>
            ) : (
              <Button
                variant="ghost"
                className="p-2"
                onClick={(e) => handleToggleFavorite(e)}
                asChild
              >
                <FaRegHeart className="w-9 h-9" />
              </Button>
            )}
            <Button
              variant="ghost"
              className={`p-2 ${
                isInCompare
                  ? "text-blue-600 hover:text-blue-800 bg-blue-50"
                  : ""
              }`}
              onClick={(e) => handleToggleCompare(e)}
              asChild
            >
              <MdCompareArrows className="w-9 h-9" />
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default StoreSearchProductCard;
