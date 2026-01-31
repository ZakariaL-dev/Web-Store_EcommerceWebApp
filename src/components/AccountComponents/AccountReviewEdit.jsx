"use client";

// Shadcn Comp
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Rating from "../ui/rating";
import { Spinner } from "../ui/spinner";
import { Textarea } from "../ui/textarea";

// Stores
import { useReviewStore } from "@/utils/ReviewStore";

// React
import { useState } from "react";

// Utils
import { HandeResults } from "@/lib/HandeResults";


const AccountReviewEdit = ({ OpenStatus, OpenToggle, r }) => {
  const { updateReview } = useReviewStore();

  const [UpdatedReview, setUpdatedReview] = useState({
    title: r.title,
    rating: r.rating,
    comment: r.comment,
  });

  const [loading, setLoading] = useState(false);

  const handleUpdateReview = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { success, message } = await updateReview(r._id, UpdatedReview);

    HandeResults(success, message);

    if (success === true) {
      OpenToggle(false);
    }

    setLoading(false);
  };

  return (
    <Dialog open={OpenStatus} onOpenChange={OpenToggle}>
      <form>
        <DialogContent className="max-w-6xl">
          <DialogHeader>
            <DialogTitle>Update Your Review</DialogTitle>
          </DialogHeader>
          {/* rating */}
          <div className="grid gap-4 mb-3">
            <div className="grid gap-3">
              <Label htmlFor="rating">Your Rating </Label>
              <div className="flex items-center justify-between">
                <Rating
                  value={UpdatedReview.rating}
                  precision={0.1}
                  onChange={(value) =>
                    setUpdatedReview({
                      ...UpdatedReview,
                      rating: parseFloat(value),
                    })
                  }
                />
                <p> / </p>
                <Input
                  value={UpdatedReview.rating}
                  onChange={(e) =>
                    setUpdatedReview({
                      ...UpdatedReview,
                      rating: parseFloat(e.target.value),
                    })
                  }
                  className="w-1/3 ml-2"
                  id="rating"
                  type="number"
                  min={0}
                  max={5}
                  step={0.1}
                />
              </div>
            </div>
          </div>
          {/* title */}
          <div className="grid gap-4 mb-3">
            <div className="grid gap-3">
              <Label htmlFor="title">Review Title</Label>
              <Input
                id="title"
                placeholder="Give your review a title"
                value={UpdatedReview.title}
                onChange={(e) =>
                  setUpdatedReview({
                    ...UpdatedReview,
                    title: e.target.value,
                  })
                }
              />
            </div>
          </div>
          {/* comment */}
          <div className="grid gap-4 mb-3">
            <div className="grid gap-3">
              <Label htmlFor="message">Your Review</Label>
              <Textarea
                placeholder="Type your review here."
                id="message"
                value={UpdatedReview.comment}
                onChange={(e) =>
                  setUpdatedReview({
                    ...UpdatedReview,
                    comment: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              type="submit"
              disabled={loading}
              onClick={(e) => handleUpdateReview(e)}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <Spinner /> Updating...
                </div>
              ) : (
                "Update Review"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default AccountReviewEdit;
