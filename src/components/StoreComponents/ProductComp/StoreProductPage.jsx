"use client";

import { Button } from "@/components/ui/button";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import Rating from "@/components/ui/rating";
import { FaRegHeart } from "react-icons/fa";
import { MdCompareArrows } from "react-icons/md";
import { FaRegShareSquare } from "react-icons/fa";
import StoreFeaturedProducts from "@/components/StoreComponents/ProductComp/StoreFeaturedProducts";
import { useEffect, useState } from "react";
import StoreProductCounter from "./StoreProductCounter";
import { useCartStore } from "@/utils/CartStore";
import { useUserStore } from "@/utils/UserStore";
import { Spinner } from "@/components/ui/spinner";
import { RiHeart3Fill } from "react-icons/ri";
import { useUtilityStore } from "@/utils/UtilsStore";
import StoreProductReview from "./StoreProductReview";
import { useReviewStore } from "@/utils/ReviewStore";
import { MdOutlineReport } from "react-icons/md";
import StorePRDialogue from "../StorePRDialogue";
import { HandeResults } from "@/lib/HandeResults";

const StoreProductPage = ({ current }) => {
  //
  const [displayImg, setDisplayImg] = useState(current.previewImages[0]);
  const handleBigImg = (i) => {
    setDisplayImg(current.previewImages[i]);
  };

  //
  const getStockFor = (color, size) => {
    const variant = current.variants.find(
      (v) => v.color === color && v.size === size,
    );
    return variant ? variant.quantity : 0;
  };

  //add to cart
  const { addToCart } = useCartStore();
  const { currentUser } = useUserStore();
  const [loading, setLoading] = useState(false);
  const [ProductVariants, setProductVariants] = useState({
    color: "",
    size: "",
    quantity: 1,
  });

  // Inside StoreProductPage component

  // 1. Get unique colors available
  const availableColors = [...new Set(current.variants.map((v) => v.color))];

  // 2. Filter sizes based on selected color
  const availableSizes = current.variants
    .filter((v) => v.color === ProductVariants.color)
    .map((v) => v.size);

  // 3. Find the exact variant to get its specific quantity
  const selectedVariant = current.variants.find(
    (v) => v.color === ProductVariants.color && v.size === ProductVariants.size,
  );

  const stockLimit = selectedVariant ? selectedVariant.quantity : 0;

  const HandleSubmitToCart = async () => {
    if (!currentUser) {
      HandeResults(false, "Please login to add items to cart");
      return;
    }

    if (!ProductVariants.color || !ProductVariants.size) {
      HandeResults(false, "Please select a color and size first");

      return;
    }

    if (stockLimit <= 0) {
      HandeResults(false, "This variant is out of stock");
      return;
    }

    setLoading(true);

    const userId = currentUser._id || currentUser.id;

    const { success, message } = await addToCart(
      userId,
      current,
      ProductVariants,
    );

    HandeResults(success, message);
    setLoading(false);
  };

  // add to favorites
  const { wishlist, toggleWishlist, compareList, toggleCompare } =
    useUtilityStore();
  const isFavorite =
    wishlist?.some((id) => String(id) === String(current._id)) || false;
  const handleToggleFavorite = async () => {
    if (!currentUser) {
      HandeResults(false, "Please login to add items to cart");
      return;
    }

    const userId = currentUser._id || currentUser.id;

    const { success, message } = await toggleWishlist(userId, current._id);

    HandeResults(success, message);
  };

  // add to compare list
  const isInCompare =
    compareList?.some((id) => String(id) === String(current._id)) || false;

  const handleToggleCompare = async () => {
    if (!currentUser) {
      HandeResults(false, "Please login to add items to cart");
      return;
    }
    const userId = currentUser._id || currentUser.id;
    const { success, message } = await toggleCompare(userId, current._id);
    HandeResults(success, message);
  };

  const { reviews, getAllReviews } = useReviewStore();

  useEffect(() => {
    getAllReviews();
  }, [getAllReviews]);

  const ProductReviews = reviews.filter(
    (r) => r && r.product._id === current._id,
  );
  const totalRating = ProductReviews.reduce(
    (acc, item) => item.rating + acc,
    0,
  );
  const averageRating =
    ProductReviews.length > 0 ? totalRating / ProductReviews.length : 0;

  const globalRating = Number(averageRating.toFixed(1));

  const [PRDialogue, setPRDialogue] = useState(false);

  return (
    <div className="mt-24 max-w-7xl mx-auto mb-6">
      {/* product display */}
      <div className="flex gap-4 mb-10 lg:flex-row flex-col ">
        {/* pics */}
        <div className="flex gap-3.5">
          <div>
            {current.previewImages.map((img, i) => {
              const isSelected = displayImg === img;
              return (
                <div
                  key={i}
                  style={{ backgroundImage: `url(${img})` }}
                  className={`bg-cover bg-center w-20 h-20 rounded-xl mb-3 cursor-pointer transition-all ease-in-out duration-300 hover:scale-110 hover:shadow-xl ${
                    isSelected
                      ? "border-2 border-slate-600"
                      : "border border-slate-400"
                  } `}
                  onClick={() => handleBigImg(i)}
                ></div>
              );
            })}
          </div>
          <div
            style={{ backgroundImage: `url(${displayImg})` }}
            className="bg-cover bg-center w-156 h-156 rounded-2xl border-2 border-gray-700"
          ></div>
        </div>
        {/* writings */}
        <div>
          <header className="flex items-center justify-between">
            <h1 className="text-3xl font-semibold py-3">{current.title}</h1>
            {/* report product */}
            <MdOutlineReport
              className="text-3xl duration-300 ease-in-out transition-all text-red-600 hover:text-red-800 cursor-pointer hover:bg-red-100 p-1 rounded-md"
              onClick={() => setPRDialogue(true)}
            />
          </header>
          <div>
            <p className="text-lg mb-2">{current.description}</p>
            <div className="flex gap-3">
              <Rating value={globalRating} readOnly />
              <p className="border-l-2 border-gray-400 pl-3">
                <span className="font-semibold pr-2">
                  {ProductReviews.length}
                </span>
                rates
              </p>
            </div>
          </div>
          {current.status === "on sale" ? (
            <div className="flex gap-4 my-5 text-xl">
              <h1 className="mb-3 font-bold line-through text-slate-300">
                {current.price} Dz
              </h1>
              <h1 className="mb-3 font-bold text-red-700">
                {(
                  current.price -
                  (current.price * current.discount) / 100
                ).toFixed(2)}
                Dz
              </h1>
            </div>
          ) : (
            <h1 className="mb-3 font-bold text-gray-500 text-xl py-3">
              {current.price} Dz
            </h1>
          )}
          <div className="mb-3 w-fit">
            <h2 className="text-xl font-semibold pb-2">Color</h2>
            <NativeSelect
              className="w-48"
              value={ProductVariants.color}
              onChange={(e) => {
                const selectedColor = e.target.value;
                const isValidSizeForNewColor = current.variants.some(
                  (v) =>
                    v.color === selectedColor &&
                    v.size === ProductVariants.size,
                );

                const nextSize = isValidSizeForNewColor
                  ? ProductVariants.size
                  : "";
                const newMaxStock = getStockFor(selectedColor, nextSize);

                setProductVariants((prev) => ({
                  ...prev,
                  color: selectedColor,
                  size: nextSize,
                  quantity:
                    prev.quantity > newMaxStock
                      ? Math.max(1, newMaxStock)
                      : prev.quantity,
                }));
              }}
            >
              <NativeSelectOption value="">Select Color</NativeSelectOption>
              {availableColors.map((color, i) => (
                <NativeSelectOption key={i} value={color}>
                  {color}
                </NativeSelectOption>
              ))}
            </NativeSelect>
          </div>
          <div className="mb-3 w-fit">
            <h2 className="text-xl font-semibold py-2">Size</h2>
            <NativeSelect
              className="w-48"
              value={ProductVariants.size}
              onChange={(e) => {
                const selectedSize = e.target.value;
                const newMaxStock = getStockFor(
                  ProductVariants.color,
                  selectedSize,
                );

                setProductVariants((prev) => ({
                  ...prev,
                  size: selectedSize,
                  quantity:
                    prev.quantity > newMaxStock
                      ? Math.max(1, newMaxStock)
                      : prev.quantity,
                }));
              }}
            >
              <NativeSelectOption value="">Select Size</NativeSelectOption>
              {availableSizes.map((size, i) => (
                <NativeSelectOption key={i} value={size}>
                  {size}
                </NativeSelectOption>
              ))}
            </NativeSelect>
          </div>
          <div className="mb-8">
            <h2 className="text-xl font-semibold py-2">Quantity</h2>
            {stockLimit > 0 ? (
              <StoreProductCounter
                value={ProductVariants.quantity}
                onChange={(newQty) => {
                  setProductVariants({
                    ...ProductVariants,
                    quantity: newQty,
                  });
                }}
                max={stockLimit} // Use the specific stockLimit calculated on line 64
              />
            ) : (
              <span className="text-red-500 font-semibold">
                {ProductVariants.color && ProductVariants.size
                  ? "Out of Stock for this selection"
                  : "Please select Color & Size"}
              </span>
            )}
          </div>
          <div className="flex gap-3 items-center lg:justify-between flex-wrap justify-end lg:flex-nowrap">
            <Button
              className="w-10/12 py-6 mx-auto"
              onClick={HandleSubmitToCart}
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
            <div className="flex items-center ">
              {isFavorite ? (
                <Button
                  variant="ghost"
                  className="p-2 hover:text-red-900"
                  onClick={handleToggleFavorite}
                  asChild
                >
                  <RiHeart3Fill className="w-10 h-10 text-red-600 " />
                </Button>
              ) : (
                <Button
                  variant="ghost"
                  className="p-2"
                  onClick={handleToggleFavorite}
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
                onClick={handleToggleCompare}
                asChild
              >
                <MdCompareArrows className="w-9 h-9" />
              </Button>
              <Button variant="ghost" className="p-2" asChild>
                <FaRegShareSquare className="w-9 h-9" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Report Product */}
      {PRDialogue && (
        <StorePRDialogue
          OpenStatus={PRDialogue}
          OpenToggle={setPRDialogue}
          pId={current._id}
        />
      )}

      {/* reviews */}
      <StoreProductReview pId={current._id} pImage={current.previewImages[0]} />

      {/* other products */}
      <StoreFeaturedProducts />
    </div>
  );
};

export default StoreProductPage;
