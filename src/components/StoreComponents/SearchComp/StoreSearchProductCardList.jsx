"use client";

// Shadcn Comp
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Badge } from "@/components/ui/badge";
import Rating from "@/components/ui/rating";

// React
import { useEffect, useState } from "react";

// Next
import Link from "next/link";
import Image from "next/image";

// Stores
import { useUtilityStore } from "@/utils/UtilsStore";
import { useReviewStore } from "@/utils/ReviewStore";
import { useCartStore } from "@/utils/CartStore";
import { useUserStore } from "@/utils/UserStore";

// React Icons
import { MdCompareArrows } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa6";
import { RiHeart3Fill } from "react-icons/ri";

// Utils
import { HandeResults } from "@/lib/HandeResults";


const StoreSearchProductCardList = ({ product }) => {
  const { addToCart } = useCartStore();
  const { currentUser } = useUserStore();
  const [loading, setLoading] = useState(false);
  const { reviews, getAllReviews } = useReviewStore();

  useEffect(() => {
    getAllReviews();
  }, [getAllReviews]);

  const ProductReviews = reviews.filter(
    (r) => r && r.product._id === product._id,
  );
  const totalRating = ProductReviews.reduce(
    (acc, item) => item.rating + acc,
    0,
  );
  const averageRating =
    ProductReviews.length > 0 ? totalRating / ProductReviews.length : 0;

  const globalRating = Number(averageRating.toFixed(1));

  const handleAction = (e) => {
    e.preventDefault();
    e.stopPropagation();
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
      className={`w-full m-4 h-64 flex rounded-2xl overflow-hidden transition-all duration-200 ease-in-out hover:shadow-xl`}
    >
      <div className="relative overflow-hidden w-40">
        <Image
          src={product.previewImages?.find(
            (img) => img && img.includes("http"),
          )}
          alt="product"
          fill
          className="object-cover rounded-l-2xl transition-all ease-in-out hover:scale-115"
        ></Image>
        {product.status === "new" ? (
          <Badge className="absolute top-1 left-1">New</Badge>
        ) : (
          <></>
        )}
        {product.status === "on sale" ? (
          <Badge className="absolute top-1 left-1 bg-red-700">On Sale</Badge>
        ) : (
          <></>
        )}
      </div>
      <div className="p-3 flex flex-col justify-around w-full bg-white">
        <div>
          <h1 className="text-xl mb-1 font-bold">{product.title}</h1>
          <h1 className="text-sm mb-4">{product.description}</h1>

          {/*  */}
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
          {/*  */}
          <div className="flex gap-3">
            <Rating value={globalRating} readOnly />
            <p className="border-l-2 border-gray-400 pl-3">
              <span className="font-semibold">{ProductReviews.length}</span>{" "}
              rates
            </p>
          </div>
        </div>
        <div className="flex gap-3 items-center justify-between">
          <Button
            onClick={(e) => {
              HandleSubmitToCart(e);
            }}
          >
            {loading ? (
              <div className="flex items-center gap-3 justify-center">
                <Spinner />
                <h1>Adding Product ....</h1>
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

export default StoreSearchProductCardList;
