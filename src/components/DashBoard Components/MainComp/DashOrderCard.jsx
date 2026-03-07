// Shadcn Comp
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

// Next
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaRegCheckCircle } from "react-icons/fa";

// React Icons
import { FaCaretRight } from "react-icons/fa6";
import { MdOutlineCancel } from "react-icons/md";

const DashOrderCard = ({ order }) => {
    const router = useRouter();
  
  const HandleOrderStatus = (sts) => {
    switch (sts) {
      case "delivered":
        return (
          <Badge className={"bg-emerald-700 text-white my-2"}>
            <FaRegCheckCircle className="mr-l text-3xl" />
            {sts}
          </Badge>
        );

      case "pending":
        return (
          <Badge className={"bg-amber-400 text-white my-2"}>
            <Spinner />
            {sts}
          </Badge>
        );

      case "canceled":
        return (
          <Badge className={"bg-red-500 text-white my-2"}>
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

  return (
    <div className="border-b-2 odd:border-r-2 w-[50%] [&:nth-last-child(-n+2)]:border-b-0">
      <div className="flex p-3 items-start ">
        <div className="w-1/3 mr-5">
          <h1 className="font-bold">#order n°{order._id.slice(-6)}</h1>
          {HandleOrderStatus(order.status)}
        </div>
        <div className="w-1/3">
          <h1
            className={`font-bold text-lg ${order.paymentStatus ? "text-teal-700" : " text-red-700"}`}
          >
            {order.totalAmount} Dz
          </h1>
          <p>{order.paymentMethod}</p>
          {HandlePaymentStatus(order.paymentStatus)}
        </div>
        <div className="w-1/3">
          <h1 className="font-bold">Customer&apos;s infos</h1>
          <h4 className="font-medium">
            {order.user.phoneNumber.match(/.{1,2}/g).join(" ")}
          </h4>
          <p className="whitespace-normal text-sm">
            {order.deliveryAddress.address === "" ? (
              <>
                {order.deliveryAddress.bureauAddress}
                <span className="font-semibold">
                  {" - "}
                  {order.deliveryPlace}
                </span>
              </>
            ) : (
              <>
                {order.deliveryAddress.address}
                <span className="font-semibold">
                  {" - "}
                  {order.deliveryPlace}
                </span>
              </>
            )}
          </p>
        </div>
      </div>
      {/*  */}
      <div className="flex items-center justify-between p-3">
        <div className="flex items-start gap-2 flex-wrap">
          {order.products.map((p) => {
            return (
              <div key={p._id} className="relative">
                <Image
                  src={
                    p.product.previewImages[0] ||
                    p.product.previewImages[1] ||
                    p.product.previewImages[2]
                  }
                  alt="no pic"
                  width={70}
                  height={200}
                  className="rounded-lg"
                ></Image>
                <Badge
                  variant="destructive"
                  className="absolute -bottom-1 -left-1"
                >
                  {p.quantity}
                </Badge>
              </div>
            );
          })}
        </div>
        <Button
          variant="ghost"
          className="p-2"
          asChild
          onClick={() => router.push(`/admin/dashboard/orders/${order._id}`)}
        >
          <FaCaretRight className="w-10 h-10" />
        </Button>
      </div>
    </div>
  );
};

export default DashOrderCard;
