"use client";

// Shadcn Comp
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Spinner } from "../ui/spinner";
import { Badge } from "../ui/badge";
import Rating from "../ui/rating";
import { Button } from "../ui/button";

// Stores
import { useUtilityStore } from "@/utils/UtilsStore";
import { useUserStore } from "@/utils/UserStore";
import { useReviewStore } from "@/utils/ReviewStore";
import { useCartStore } from "@/utils/CartStore";

// Utils
import { HandeResults } from "@/lib/HandeResults";

// React
import { useEffect, useState } from "react";

// Next
import Image from "next/image";


const AccountCompareTable = ({ products }) => {
  const StatusSwitch = (stts) => {
    switch (stts) {
      case "normal":
        return <Badge variant={"outline"}>Normal</Badge>;
      case "on sale":
        return (
          <Badge variant={"outline"} className="text-red-600 border">
            On Sale
          </Badge>
        );
      case "new":
        return (
          <Badge variant={"outline"} className="text-green-800">
            New
          </Badge>
        );
      default:
        break;
    }
  };
  const getTotalQuantity = (items) => {
    return items.reduce((accumulator, currentItem) => {
      return accumulator + currentItem.quantity;
    }, 0);
  };

  const { removeFromList } = useUtilityStore();
  const { currentUser } = useUserStore();
  const { addToCart } = useCartStore();

  const [addingId, setAddingId] = useState(null);
  const [removingId, setRemovingId] = useState(null);

  const handleRemove = async (itemId) => {
    if (!currentUser) {
      HandeResults(false, "Please login to add items to cart");
      return;
    }
    setRemovingId(itemId);

    const userId = currentUser._id || currentUser.id;
    const { success, message } = await removeFromList(
      userId,
      itemId,
      "compare",
    );

    HandeResults(success, message);
    setRemovingId(null);
  };

  const handleAddtoCart = async (product) => {
    if (!currentUser) {
      HandeResults(false, "Please login to add items to cart");
      return;
    }
    setAddingId(product._id);

    const userId = currentUser._id || currentUser.id;

    const { success, message } = await addToCart(userId, product, {
      color: product.colors ? product.colors[0] : "",
      size: product.sizes ? product.sizes[0] : "",
      quantity: 1,
    });
    HandeResults(success, message);

    if (success === true) {
      handleRemove(product._id);
    }

    setAddingId(null);
  };

  const { reviews, getAllReviews } = useReviewStore();

  useEffect(() => {
    getAllReviews();
  }, [getAllReviews]);

  const getProductRating = (productId) => {
    const productReviews = reviews.filter(
      (r) =>
        r &&
        r.product &&
        (r.product._id === productId || r.product === productId),
    );

    if (productReviews.length === 0) return 0;

    const totalRating = productReviews.reduce(
      (acc, item) => item.rating + acc,
      0,
    );
    return Number((totalRating / productReviews.length).toFixed(1));
  };

  return (
    <div className="w-full border-2 border-gray-600 rounded-2xl">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="w-[100px] text-center text-xl whitespace-normal">
              Comparison Criteria
            </TableHead>
            {products.map((p) => {
              return (
                <TableHead
                  key={p._id}
                  className="w-[300px] whitespace-normal text-center"
                >
                  <div className="flex flex-col items-center">
                    <Image
                      src={p.previewImages[0]}
                      alt={p.title}
                      width={90}
                      height={90}
                      className="rounded-lg my-2"
                    ></Image>
                    <div>
                      <h1 className="text-lg font-semibold mb-2">{p.title}</h1>
                    </div>
                  </div>
                </TableHead>
              );
            })}
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* desc */}
          <TableRow>
            <TableCell className="font-medium">Description</TableCell>
            {products.map((p) => (
              <TableCell
                key={p._id}
                className="w-[300px] whitespace-normal px-3"
              >
                {p.description}
              </TableCell>
            ))}
          </TableRow>
          {/* status */}
          <TableRow>
            <TableCell className="font-medium">Status</TableCell>
            {products.map((p) => (
              <TableCell key={p._id} className="w-[300px] text-center py-3">
                {StatusSwitch(p.status)}
              </TableCell>
            ))}
          </TableRow>
          {/* $$$ */}
          <TableRow>
            <TableCell className="font-medium">Price</TableCell>
            {products.map((p) => (
              <TableCell
                key={p._id}
                className="w-[300px] text-center py-3 font-bold"
              >
                {p.status === "on sale" ? (
                  <h1 className="text-red-500">
                    {(p.price - (p.price * p.discount) / 100).toFixed(2)}
                    Dz
                  </h1>
                ) : (
                  <h1>{p.price} Dz</h1>
                )}
              </TableCell>
            ))}
          </TableRow>
          {/* discount */}
          <TableRow>
            <TableCell className="font-medium">Discount</TableCell>
            {products.map((p) => (
              <TableCell
                key={p._id}
                className="w-[300px] text-center py-3 font-bold"
              >
                {p.status === "on sale" ? (
                  <h1 className="text-red-500">{p.discount} %</h1>
                ) : (
                  <h1>--</h1>
                )}
              </TableCell>
            ))}
          </TableRow>
          {/* rating */}
          <TableRow>
            <TableCell className="font-medium">Rating</TableCell>
            {products.map((p) => {
              const rating = getProductRating(p._id);
              return (
                <TableCell key={p._id} className="w-[300px] text-center py-3">
                  {rating === 0 && (
                    <span className="text-gray-400 text-sm">No ratings</span>
                  )}

                  {rating > 0 && (
                    <div className="flex justify-center items-center flex-col gap-1.5">
                      <Rating value={rating} readOnly />
                      <span className="text-xs block">({rating})</span>
                    </div>
                  )}
                </TableCell>
              );
            })}
          </TableRow>
          {/* Qnt */}
          <TableRow>
            <TableCell className="font-medium">Quantity</TableCell>
            {products.map((p) => (
              <TableCell key={p._id} className="w-[300px] text-center py-3">
                {getTotalQuantity(p.variants) > 0 ? (
                  <>
                    <span className="text-green-500 font-bold text-lg">
                      {getTotalQuantity(p.variants)}
                    </span>{" "}
                    in Stock
                  </>
                ) : (
                  <span className="text-red-500 font-semibold">
                    Out of Stock
                  </span>
                )}
              </TableCell>
            ))}
          </TableRow>
          {/* Action Btn */}
          <TableRow>
            <TableCell className="font-medium">Actions</TableCell>
            {products.map((p) => (
              <TableCell key={p._id} className="w-[300px] text-center py-3">
                <div className="flex flex-col gap-4">
                  {addingId === p._id ? (
                    <Button className="flex gap-3 items-center" disabled={true}>
                      <Spinner /> Moving to Cart ....
                    </Button>
                  ) : (
                    <Button onClick={() => handleAddtoCart(p)}>
                      Move to Cart
                    </Button>
                  )}
                  {/*  */}
                  {removingId === p._id ? (
                    <Button
                      className="flex gap-3 items-center text-white "
                      disabled={true}
                    >
                      <Spinner /> Removing from List ....
                    </Button>
                  ) : (
                    <Button
                      variant={"outline"}
                      className="text-red-800 hover:text-red-600 hover:bg-red-100"
                      onClick={() => handleRemove(p._id)}
                    >
                      Remove From List
                    </Button>
                  )}
                </div>
              </TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default AccountCompareTable;
