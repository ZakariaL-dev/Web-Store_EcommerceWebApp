// Shadcn Comp
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";

// React Icons
import { MdOutlineCancel } from "react-icons/md";
import { IoCalendarOutline } from "react-icons/io5";
import { FaRegCheckCircle } from "react-icons/fa";

// next
import { useRouter } from "next/navigation";

const AccountOrderCard = ({ order, cancel }) => {
  const router = useRouter();

  const HandleOrderStatus = (sts) => {
    switch (sts) {
      case "delivered":
        return (
          <Badge
            className={
              "text-emerald-600 border-emerald-600 bg-emerald-50 text-[16px] px-3"
            }
          >
            <FaRegCheckCircle className="mr-l text-3xl" />
            {sts}
          </Badge>
        );

      case "pending":
        return (
          <Badge
            className={
              "text-amber-400 border-amber-600 bg-amber-50 text-[16px] px-3"
            }
          >
            <Spinner />
            Processing
          </Badge>
        );

      case "canceled":
        return (
          <Badge
            className={"border-red-600 text-red-600 bg-red-50 text-[16px] px-3"}
          >
            <MdOutlineCancel className="mr-l" />
            {sts}
          </Badge>
        );

      default:
        return null;
    }
  };

  const HandlePaymentStatus = (Psts) => {
    switch (Psts) {
      case true:
        return (
          <Badge className={"bg-emerald-700 text-white my-2"}>
            <FaRegCheckCircle className="mr-l text-3xl" />
            Paid
          </Badge>
        );

      case false:
        return (
          <Badge className={"bg-red-500 text-white my-2"}>
            <MdOutlineCancel className="mr-l" />
            Not Paid
          </Badge>
        );

      default:
        return null;
    }
  };

  const HandleDeliverStatus = (sts) => {
    switch (sts) {
      case "delivered":
        return (
          <Badge variant={"ghost"} className={"text-emerald-700 border-0"}>
            <FaRegCheckCircle className="mr-l text-3xl" />
            Delivered on November 23, 2025
          </Badge>
        );

      case "pending":
        return (
          <Badge variant={"ghost"} className={"text-amber-400 border-0"}>
            <Spinner />
            Processing
          </Badge>
        );

      case "canceled":
        return (
          <Badge variant={"ghost"} className={"text-red-500 border-0"}>
            <MdOutlineCancel className="mr-l" />
            Order cancelled
          </Badge>
        );

      default:
        return null;
    }
  };

  return (
    <div className="rounded-2xl border-2 w-full mb-4">
      <header className="flex items-center justify-between border-b-2 p-4">
        <div>
          <h1 className="font-bold text-2xl">Order #{order._id.slice(-6)}</h1>
          <p className="font-semibold text-gray-500 flex items-center gap-2">
            <IoCalendarOutline />
            {order.timeOfOrder}
          </p>
        </div>
        {HandleOrderStatus(order.status)}
      </header>
      <main className="p-4 flex justify-between lg:flex-row flex-col gap-5">
        <div>
          <h1 className="font-bold text-lg">Order Summary</h1>
          <p>{order.products.length} items</p>
          <p>
            via{" "}
            {order.paymentMethod === "Cash"
              ? "cash on delivery"
              : "E-Dahabia/CIB"}
          </p>
          <h2
            className={`font-bold text-lg ${order.paymentStatus ? "text-teal-700" : " text-red-700"}`}
          >
            {order.totalAmount} Dz
          </h2>
        </div>
        <div className=" max-w-36">
          <h1 className="font-bold text-lg">Address</h1>
          <p>
            {order.deliveryAddress.address === ""
              ? order.deliveryAddress.bureauAddress
              : order.deliveryAddress.address}
          </p>
        </div>
        <div className="flex flex-col">
          <h1 className="font-bold text-lg">Delivery Information</h1>
          {HandlePaymentStatus(order.paymentStatus)}
          {HandleDeliverStatus(order.status)}
        </div>
        <div>
          <Button
            variant={"outline"}
            className="w-full mb-3"
            onClick={() => router.push(`/account/orders/${order._id}`)}
          >
            View Details
          </Button>
          {order.status === "pending" && (
            <Button
              className="bg-red-600 hover:bg-red-700 w-full"
              onClick={cancel}
            >
              Cancel Order
            </Button>
          )}
        </div>
      </main>
    </div>
  );
};

export default AccountOrderCard;
