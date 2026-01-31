"use client";

// Shadcn Comp
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Rating from "@/components/ui/rating";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Utils
import { HandeResults } from "@/lib/HandeResults";

// Stores
import { useReviewStore } from "@/utils/ReviewStore";

// Next
import { useRouter } from "next/navigation";

// React
import { useEffect } from "react";

// React Icons
import { FaCaretRight } from "react-icons/fa6";
import { MdOutlineDeleteForever } from "react-icons/md";


const DashReviewsTable = () => {
  const router = useRouter();

  const { reviews, getAllReviews, deleteReview } = useReviewStore();
  useEffect(() => {
    getAllReviews();
  }, [getAllReviews]);

  const handleDeleteReview = async (id) => {
    const { success, message } = await deleteReview(id);
    HandeResults(success, message);
  };

  if (!reviews) {
    return (
      <div className="flex h-32 items-center justify-center text-muted-foreground">
        Loading Reviews...
      </div>
    );
  }
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="w-[210px]">
              UserName / email / Product name
            </TableHead>
            <TableHead className="w-40">Rating / Date / Id</TableHead>
            <TableHead className="w-[250px]">Title / Comment</TableHead>
            <TableHead className="text-right w-[180px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reviews.length > 0 ? (
            reviews.map((r) => {
              return (
                <TableRow key={r._id}>
                  {/* Customer Cell */}
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarImage
                          src={r.user.profileImage}
                          alt={r.name.slice(0, 2)}
                        />
                        <AvatarFallback>{r.name.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h1 className="font-bold text-sm">{r.name}</h1>
                        <p className="text-sm font-light">{r.user.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <p className="font-semibold">for: </p>
                      <h1 className="my-2 font-bold text-sm underline text-gray-600">
                        {r.product.title}
                      </h1>
                    </div>
                  </TableCell>

                  {/* Contact Info - Stacked layout */}
                  <TableCell className="space-y-1.5">
                    <Rating size={17} value={r.rating} readOnly />
                    <h1 className="font-semibold">{r.timeOfSubmit}</h1>
                    <h1>
                      Id:{" "}
                      <span className="font-medium text-blue-700">
                        #{r._id.slice(-6)}
                      </span>
                    </h1>
                  </TableCell>

                  <TableCell className="text-sm whitespace-normal">
                    <h1 className="font-semibold text-lg">{r.title}</h1>
                    <h1 className="whitespace-normal">{r.comment}</h1>
                  </TableCell>

                  {/* Actions aligned to the right */}
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-red-600 hover:bg-red-100 hover:text-red-700"
                        onClick={() => handleDeleteReview(r._id)}
                      >
                        <MdOutlineDeleteForever className="h-7 w-7" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 hover:bg-gray-300"
                        onClick={() => router.push(`/products/${r.product.slug}`)}
                      >
                        <FaCaretRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell>No reviews found</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default DashReviewsTable;
