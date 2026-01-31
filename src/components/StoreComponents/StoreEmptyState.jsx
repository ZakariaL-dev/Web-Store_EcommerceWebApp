// Shadcn Comp
import { Button } from "../ui/button";

// Next
import Link from "next/link";


const StoreEmptyState = ({ Icon, txt, link, btnMessage, OpenToggle }) => {
  const height = btnMessage === "Leave a Review" ? "h-60" : "h-screen";
  return (
    <div
      className={`w-full ${height} flex flex-col justify-start items-center px-6 pt-6 space-y-5`}
    >
      <Icon className={"text-8xl"} />
      <p className="text-lg text-center px-20">{txt}</p>
      {btnMessage === "Shop New Arrivals" ? (
        <Button variant={"outline"} onClick={() => OpenToggle(false)}>
          <Link href={link}>{btnMessage}</Link>
        </Button>
      ) : (
        <Button>
          <Link href={link}>{btnMessage}</Link>
        </Button>
      )}
    </div>
  );
};

export default StoreEmptyState;
