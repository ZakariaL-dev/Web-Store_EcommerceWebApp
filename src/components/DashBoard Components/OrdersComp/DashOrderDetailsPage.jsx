// Shadcn Comp
import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// React Icons
import { FaRegCheckCircle } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";
import { IoCalendarOutline } from "react-icons/io5";
import { RxDoubleArrowLeft } from "react-icons/rx";
import { FaUserLarge } from "react-icons/fa6";
import { AiOutlineTruck } from "react-icons/ai";

// Next
import Image from "next/image";
import { useRouter } from "next/navigation";

const DashOrderDetailsPage = ({ order, OpenToggle }) => {
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
    <div className="py-6 px-3 w-full space-y-6">
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
          {/* customer infos */}
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
            <h1 className="mb-2 font-semibold flex gap-2 items-center">
              <FaUserLarge />
              Customer Informations
            </h1>

            <div>
              <h3 className="text-[15px] font-medium">Phone Number</h3>
              <p className="text-sm">{order.user.phoneNumber}</p>
            </div>

            <div>
              <h3 className="text-[15px] font-medium">Email Address</h3>
              <p className="text-sm">{order.user.email}</p>
            </div>
          </div>
          {/* delivery info */}
          <div className="space-y-2.5">
            <h1 className="mb-2 font-semibold flex gap-2 items-center">
              <AiOutlineTruck className="text-2xl" />
              Delivery Informations
            </h1>
            <div>
              <h3 className="text-[15px] font-medium">Delivery Address</h3>
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
            <div>{HandleDeliverStatus(order.status)}</div>
          </div>
        </div>
        <Separator className={"my-3 bg-gray-500"} />
        <h1 className="font-bold text-xl mb-2">Order Items</h1>
        <Table>
          <TableHeader>
            <TableRow className={"bg-slate-200 hover:bg-slate-300"}>
              <TableHead className="w-[120px]">Product&apos;s Image</TableHead>
              <TableHead className="w-[300px]">Details</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className={"text-right pr-6"}>Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {order.products.map((p) => {
              return (
                <TableRow
                  key={p._id}
                  className={"border-b-2 p-3 border-slate-300"}
                >
                  <TableCell>
                    <Image
                      width={90}
                      height={100}
                      src={p.product.previewImages[0]}
                      alt={p.product.title}
                      className="rounded-xl"
                    />
                  </TableCell>
                  <TableCell className="align-top pt-6">
                    <div>
                      <h1 className="mb-1 text-lg font-semibold">{p.product.title}</h1>
                      <div className="space-x-2 font-semibold">
                        <p className="text-slate-500">Color: {p.color}</p>
                        <p className="text-slate-500">Size: {p.size}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className={"text-lg font-semibold text-gray-500"} >{p.quantity}</TableCell>
                  <TableCell className={"text-lg font-semibold text-gray-500"} >{p.priceAtPurchase} Dz</TableCell>
                  <TableCell className="font-bold text-lg text-right pr-6">
                    {p.priceAtPurchase * p.quantity} Dz
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        <Separator className={"my-3 bg-gray-500"} />
        <footer className="grid md:grid-cols-3 grid-cols-1 p-3">
          <div></div>
          <div></div>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <h3 className="text-[15px] font-medium text-gray-500">Method</h3>
              <p className="text-lg font-bold">{order.paymentMethod}</p>
            </div>
            <div className="flex items-center justify-between">
              <h3 className="text-[15px] font-medium text-gray-500">
                Subtotal
              </h3>
              <p
                className={`font-bold text-lg ${order.paymentStatus ? "text-teal-500" : " text-red-700"}`}
              >
                {(order.totalAmount - order.deliveryFee).toFixed(2)} Dz
              </p>
            </div>

            <div className="flex items-center justify-between">
              <h3 className="text-[15px] font-medium text-gray-500">
                Delivery Fee
              </h3>
              <p
                className={`font-bold text-lg ${order.paymentStatus ? "text-green-400" : " text-red-700"}`}
              >
                + {order.deliveryFee}.00   Dz
              </p>
            </div>
            <Separator className={"my-2 bg-gray-300"} />
            <div className="flex items-center justify-between">
              <h3 className="text-[15px] font-medium text-gray-500">
                Total Amount
              </h3>
              <p
                className={`font-bold text-xl ${order.paymentStatus ? "text-emerald-700" : " text-red-700"}`}
              >
                {order.totalAmount} Dz
              </p>
            </div>
          </div>
        </footer>
      </main>

      {/* footer */}
      <footer className="flex items-center justify-between">
        <Button variant={"outline"} onClick={() => router.back()}>
          <RxDoubleArrowLeft />
          Back To Orders
        </Button>

        <Button
          className={"bg-cyan-600 hover:bg-cyan-400"}
          onClick={() => OpenToggle(true)}
        >
          Update Order Status
        </Button>
      </footer>
    </div>
  );
};

export default DashOrderDetailsPage;
