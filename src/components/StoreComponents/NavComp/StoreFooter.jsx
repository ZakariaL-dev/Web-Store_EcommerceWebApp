// Shadcn Comp
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// React Icons
import { FaXTwitter } from "react-icons/fa6";
import { FiInstagram } from "react-icons/fi";
import { FaFacebookF } from "react-icons/fa6";
import { LiaOpencart } from "react-icons/lia";
import { TbTruckDelivery } from "react-icons/tb";
import { BsBoxSeam } from "react-icons/bs";
import { MdOutlineAttachMoney } from "react-icons/md";
import { MdSupportAgent } from "react-icons/md";

// Next
import Link from "next/link";

const StoreFooter = () => {
  const features = [
    {
      id: 1,
      icon: TbTruckDelivery,
      title: "Free Delivery",
      description: "Enjoy free delivery on the first 10 orders",
    },
    {
      id: 2,
      icon: BsBoxSeam,
      title: "Product Replace",
      description: "Easy Product Replacement Available!",
    },
    {
      id: 3,
      icon: MdOutlineAttachMoney,
      title: "Cash on delivery",
      description: "Only payment upon receipt after checking your package",
    },
    {
      id: 4,
      icon: MdSupportAgent,
      title: "24/7 Support",
      description: "Dedicated 24/7 support via phone and email",
    },
  ];
  return (
    <div>
      <header className="w-full flex items-center justify-around mb-5 flex-wrap px-5">
        {features.map((f) => {
          return (
            <div
              key={f.id}
              className="flex gap-3 items-center lg:w-1/5 w-1/2 lg:flex-row flex-col mt-3"
            >
              <div className="rounded-full border-2 border-black">
                <f.icon className="w-14 h-14 p-2.5" />
              </div>
              <div className="lg:text-start text-center px-3">
                <h1 className="font-semibold text-xl lg:mb-2">{f.title}</h1>
                <p>{f.description}</p>
              </div>
            </div>
          );
        })}
      </header>
      <main className="flex lg:flex-row flex-col items-start justify-around py-3 px-6 bg-slate-200">
        <div>
          <h1 className="text-2xl font-semibold mb-1">Information</h1>
          <ul className="footerUl">
            <li>
              <Link href={"/infos/about"}>About Us</Link>
            </li>
            <li>
              <Link href={"/infos/contact"}>Contact Us</Link>
            </li>
            <li>
              <Link href={"/search?p=new"}>What&apos;s New</Link>
            </li>
            <li>
              <Link href={"/infos/customerservice"}>Customer Service</Link>
            </li>
            <li>
              <Link href={"/infos/terms?t=use"}>Terms of Use</Link>
            </li>
            <li>
              <Link href={"/infos/terms?t=return_delivery"}>
                Returns & Delivery Policy
              </Link>
            </li>
          </ul>
        </div>
        {/*  */}
        <div>
          <h1 className="text-2xl font-semibold mb-1">My account</h1>
          <ul className="footerUl">
            <li>
              <Link href={"/account/profile"}> My Profile</Link>
            </li>
            <li>
              <Link href={"/account/orders"}>My Orders</Link>
            </li>
            <li>
              <Link href={"/account/wishlist"}>My Wishlist</Link>
            </li>
            <li>
              <Link href={"/account/compare"}>Compare products list</Link>
            </li>
            <li>
              <Link href={"/search?p=recent"}>Recently viewed products</Link>
            </li>
          </ul>
        </div>
        {/*  */}
        <div className="lg:w-1/3 w-full">
          <div>
            <h1 className="text-2xl font-semibold mb-2">
              Subscribe to stay Updated
            </h1>
            <form className="relative">
              <Input
                type="email"
                placeholder="Enter email to Subscribe"
                className="bg-white py-5.5"
              />
              <Button className="absolute right-1 top-1">Subscribe</Button>
            </form>
          </div>
        </div>
      </main>
      <footer className="border-2 border-t-slate-300 py-2 px-4 flex justify-center lg:justify-between items-center flex-wrap gap-3 bg-slate-200">
        <Link href={"/"} className="flex items-center gap-3">
          <LiaOpencart className="text-4xl" />
          <h1 className="font-bold">Web Store</h1>
        </Link>
        <p className="text-center ">
          © Copyright 2025 | All rights reserved | made by{" "}
          <a
            href="https://github.com/ZakariaL-dev"
            target="_blank"
            className="text-gray-600 hover:text-gray-800 font-extrabold"
          >
            @ZakariaL
          </a>
        </p>
        <div>
          <Button variant="ghost" className="p-2 text-slate-500" asChild>
            <FiInstagram className="w-10 h-10" />
          </Button>
          <Button variant="ghost" className="p-2 text-slate-500" asChild>
            <FaFacebookF className="w-10 h-10" />
          </Button>
          <Button variant="ghost" className="p-2 text-slate-500" asChild>
            <FaXTwitter className="w-10 h-10" />
          </Button>
        </div>
      </footer>
    </div>
  );
};

export default StoreFooter;
