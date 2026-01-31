// Next
import Link from "next/link";

// Shadcn Comp
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";


const AccountDialogueOut = ({ OpenToggle }) => {
  return (
    <div className="absolute top-16 right-6 z-10 bg-slate-50 shadow-xl rounded-xl p-4">
      <h1 className="mb-2 font-bold text-xl">Welcome Guest</h1>
      <p>Manage Cart, Orders & Wishlist</p>
      <Separator className="my-3" />
      <div className="flex gap-3 items-center pr-2">
        <Button className="w-1/2" onClick={() => OpenToggle(false)}>
          <Link href={"/signin"}>Sign In</Link>
        </Button>
        <Button
          variant={"outline"}
          className="w-1/2"
          onClick={() => OpenToggle(false)}
        >
          <Link href={"/signup"}>Sign Up</Link>
        </Button>
      </div>
    </div>
  );
};

export default AccountDialogueOut;
