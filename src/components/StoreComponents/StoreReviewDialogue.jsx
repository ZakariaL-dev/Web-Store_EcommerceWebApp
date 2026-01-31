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
import { Textarea } from "../ui/textarea";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";

// React
import { useState } from "react";

// Date FNS
import { format } from "date-fns";

// Stores
import { useUserStore } from "@/utils/UserStore";
import { useReviewStore } from "@/utils/ReviewStore";


const StoreReviewDialogue = ({ OpenStatus, OpenToggle, pId, pImage }) => {
  const { currentUser } = useUserStore();
  const { addNewReview } = useReviewStore();

  const [newReview, setNewReview] = useState({
    user: currentUser._id,
    product: pId,
    name: currentUser.userName,
    image: pImage,
    title: "",
    rating: 0,
    comment: "",
    timeOfSubmit: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    setLoading(true);

    const reviewToSubmit = {
      ...newReview,
      timeOfSubmit: format(new Date(), "E: dd/MM/yyyy - HH:mm:ss"),
    };

    const { success, message } = await addNewReview(reviewToSubmit);

    if (success === "warning") {
      toast.warning(message, {
        duration: 4000,
        style: {
          background: "oklch(87.9% 0.169 91.605)",
          color: "oklch(55.3% 0.195 38.402)",
        },
      });
      setLoading(false);
      return;
    } else if (success === false) {
      toast.error(message, {
        duration: 4000,
        style: {
          background: "oklch(70.4% 0.191 22.216)",
          color: "oklch(50.5% 0.213 27.518)",
        },
      });
      setLoading(false);
      return;
    } else if (success === true) {
      toast.success(message, {
        duration: 4000,
        style: {
          background: "oklch(92.5% 0.084 155.995)",
          color: "oklch(69.6% 0.17 162.48)",
        },
      });
      setLoading(false);
      OpenToggle(false);
    }
  };

  if (!currentUser) {
    OpenToggle(false);
    toast.error("Please login to add items to cart", {
      duration: 4000,
      style: {
        background: "oklch(70.4% 0.191 22.216)",
        color: "oklch(50.5% 0.213 27.518)",
      },
    });
    return;
  }
  return (
    <Dialog open={OpenStatus} onOpenChange={OpenToggle}>
      <form>
        <DialogContent className="max-w-6xl">
          <DialogHeader>
            <DialogTitle>Write a Review</DialogTitle>
          </DialogHeader>
          {/* rating */}
          <div className="grid gap-4 mb-3">
            <div className="grid gap-3">
              <Label htmlFor="rating">Your Rating </Label>
              <div className="flex items-center justify-between">
                <Rating
                  value={newReview.rating}
                  precision={0.1}
                  onChange={(value) =>
                    setNewReview({
                      ...newReview,
                      rating: parseFloat(value),
                    })
                  }
                />
                <p> / </p>
                <Input
                  value={newReview.rating}
                  onChange={(e) =>
                    setNewReview({
                      ...newReview,
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
          {/* user name */}
          <div className="grid gap-4 mb-3">
            <div className="grid gap-3">
              <Label htmlFor="user">UserName</Label>
              <Input
                id="user"
                name="name"
                value={newReview.name}
                onChange={(e) =>
                  setNewReview({
                    ...newReview,
                    name: e.target.value,
                  })
                }
                placeholder="Your UserName"
              />
            </div>
          </div>
          {/* title */}
          <div className="grid gap-4 mb-3">
            <div className="grid gap-3">
              <Label htmlFor="title">Review Title</Label>
              <Input
                id="title"
                placeholder="Give your review a title"
                value={newReview.title}
                onChange={(e) =>
                  setNewReview({
                    ...newReview,
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
                value={newReview.comment}
                onChange={(e) =>
                  setNewReview({
                    ...newReview,
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
              onClick={(e) => handleSubmitReview(e)}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <Spinner /> Submitting...
                </div>
              ) : (
                "Submit Review"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default StoreReviewDialogue;
