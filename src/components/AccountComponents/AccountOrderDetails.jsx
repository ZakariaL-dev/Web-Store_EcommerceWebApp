// Shadcn Comp
import { Badge } from "../ui/badge";
import { Spinner } from "../ui/spinner";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";

// React Icons
import { FaRegCheckCircle } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";
import { IoCalendarOutline } from "react-icons/io5";
import { RxDoubleArrowLeft } from "react-icons/rx";

// Next
import Image from "next/image";
import { useRouter } from "next/navigation";

const AccountOrderDetails = ({ order, cancel }) => {
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
          <Badge className={"bg-emerald-700 text-white my-2 p-1.5"}>
            <FaRegCheckCircle className="mr-l text-3xl" />
            Paid
          </Badge>
        );

      case false:
        return (
          <Badge className={"bg-red-500 text-white my-2 p-1.5"}>
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
            <FaRegCheckCircle className="text-3xl" />
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
            <MdOutlineCancel />
            Order cancelled
          </Badge>
        );

      default:
        return null;
    }
  };

  return (
    <div className="py-6 px-3 lg:w-2/3 w-full space-y-6">
      <header className="text-4xl font-bold">Order Details</header>
      {/* order details */}
      <main className="w-full bg-slate-100 rounded-2xl p-3 shadow-md">
        <div className="flex items-center justify-between ">
          {/* order is and date */}
          <div>
            <h1 className="font-bold text-xl">Order #{order._id.slice(-6)}</h1>
            <p className="font-semibold text-gray-500 flex items-center gap-2 text-[15px]">
              <IoCalendarOutline />
              {order.timeOfOrder}
            </p>
          </div>
          {/* order delivery status & payment */}
          <div className="space-x-3">
            {HandleOrderStatus(order.status)}
            {HandlePaymentStatus(order.paymentStatus)}
          </div>
        </div>
        <Separator className={"mt-3 bg-gray-500"} />
        {/* details */}
        <div className="grid md:grid-cols-2 grid-cols-1 p-3 gap-4">
          {/* delivery info */}
          <div className="space-y-2.5">
            <h1 className="mb-2 font-semibold">Delivery Informations</h1>
            <div>
              <h3 className="text-[15px] font-medium">Address</h3>
              <p className="text-sm">
                {order.deliveryAddress.address === ""
                  ? order.deliveryAddress.bureauAddress
                  : order.deliveryAddress.address}
              </p>
            </div>

            <div>
              <h3 className="text-[15px] font-medium">Method</h3>
              <p className="text-sm">{order.deliveryPlace}</p>
            </div>

            <div>
              <h3 className="text-[15px] font-medium">Contact Info</h3>
              <p className="text-sm">{order.user.phoneNumber}</p>
              <p className="text-sm">{order.user.email}</p>
            </div>

            <div>{HandleDeliverStatus(order.status)}</div>
          </div>
          {/* payment info */}
          <div className="space-y-2.5">
            <h1 className="mb-2 font-semibold">Payment Informations</h1>
            <div className="-space-y-0.5">
              <h3 className="text-[15px] font-medium">Method</h3>
              <p className="text-sm">{order.paymentMethod}</p>
            </div>

            <div className="-space-y-0.5">
              <h3 className="text-[15px] font-medium">Subtotal</h3>
              <p
                className={`font-bold text-lg ${order.paymentStatus ? "text-teal-700" : " text-red-700"}`}
              >
                {(order.totalAmount - order.deliveryFee).toFixed(2)} Dz
              </p>
            </div>

            <div className="-space-y-0.5">
              <h3 className="text-[15px] font-medium">Delivery Fee</h3>
              <p
                className={`font-bold text-lg ${order.paymentStatus ? "text-teal-700" : " text-red-700"}`}
              >
                + {order.deliveryFee} Dz
              </p>
            </div>

            <Separator className={"my-2 bg-gray-300"} />

            <div className="-space-y-0.5">
              <h3 className="text-[15px] font-medium">Total Amount</h3>
              <p
                className={`font-bold text-xl ${order.paymentStatus ? "text-teal-700" : " text-red-700"}`}
              >
                {order.totalAmount} Dz
              </p>
            </div>
          </div>
        </div>

        {/* footer */}
        <div className="text-right">
          {order.status === "pending" && (
            <Button className="bg-red-600 hover:bg-red-700" onClick={cancel}>
              Cancel Order
            </Button>
          )}
        </div>
      </main>

      {/* products display */}
      <main className="w-full bg-slate-100 rounded-2xl p-3 shadow-md">
        <h1 className="font-bold text-xl">Order Items</h1>
        <Separator className={"my-3 bg-gray-500"} />
        {/* details */}
        <div>
          {order.products.map((p) => {
            return (
              <div
                key={p._id}
                className="flex justify-between items-start border-b-2 p-3 last:border-0"
              >
                <div className="flex items-start gap-4">
                  <Image
                    width={90}
                    height={120}
                    src={p.product.previewImages[0]}
                    alt={p.product.title}
                    className="rounded-xl"
                  />
                  <div>
                    <h1 className="mb-1 font-semibold">{p.product.title}</h1>
                    <div className="space-x-2">
                      <Badge className="bg-teal-500">Color: {p.color}</Badge>
                      <Badge className="bg-cyan-400">Size: {p.size}</Badge>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <h1 className="font-bold text-lg">
                    {p.priceAtPurchase * p.quantity} Dz
                  </h1>
                  <p className="font-semibold text-sm text-gray-400 -mt-2">
                    {p.priceAtPurchase} Dz x {p.quantity}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* footer */}
      <Button variant={"outline"} onClick={() => router.back()}>
        <RxDoubleArrowLeft />
        Back To Orders
      </Button>
    </div>
  );
};

export default AccountOrderDetails;
