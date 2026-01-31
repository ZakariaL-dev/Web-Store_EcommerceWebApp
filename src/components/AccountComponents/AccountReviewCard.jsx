"use client";

// Next
import Image from "next/image";

// Shadcn Comp
import Rating from "../ui/rating";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";

// React Icons
import { FiEdit } from "react-icons/fi";
import { MdOutlineDeleteForever } from "react-icons/md";

// React
import { useState } from "react";

// My Components
import AccountReviewEdit from "./AccountReviewEdit";

// Stores
import { useReviewStore } from "@/utils/ReviewStore";

// Utils
import { HandeResults } from "@/lib/HandeResults";


const AccountReviewCard = ({ r }) => {
  const { deleteReview } = useReviewStore();

  const [UpdateDialogue, setUpdateDialogue] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleDeleteReview = async () => {
    setLoading(true);

    const { success, message } = await deleteReview(r._id);

    HandeResults(success, message);

    setLoading(false);
  };

  return (
    <div className="flex gap-4 p-4 border-2 rounded-2xl mb-3 w-full">
      <Image
        src={r.image}
        alt="no pic"
        width={100}
        height={100}
        className="rounded-lg"
      ></Image>
      <div className="w-full">
        <header className="flex items-start justify-between w-full">
          <div>
            <h1 className="font-bold text-xl">{r.title}</h1>
            <p className="font-semibold mb-4">{r.timeOfSubmit}</p>
          </div>
          <Rating value={r.rating} readOnly />
        </header>
        <main className="text-wrap whitespace-normal">{r.comment}</main>
        <footer className="flex gap-1 items-center justify-end w-full mt-4">
          <Button
            variant="ghost"
            className="p-2 hover:bg-gray-200 text-blue-600 hover:text-blue-800"
            asChild
            onClick={() => setUpdateDialogue(true)}
          >
            <FiEdit className="w-8 h-8" />
          </Button>
          {loading ? (
            <Spinner />
          ) : (
            <Button
              variant="ghost"
              className="p-2 hover:bg-gray-200 text-red-600 hover:text-red-800"
              asChild
              onClick={() => handleDeleteReview()}
            >
              <MdOutlineDeleteForever className="w-9 h-9" />
            </Button>
          )}
        </footer>
      </div>
      {UpdateDialogue && (
        <AccountReviewEdit
          OpenStatus={UpdateDialogue}
          OpenToggle={setUpdateDialogue}
          r={r}
        />
      )}
    </div>
  );
};

export default AccountReviewCard;
