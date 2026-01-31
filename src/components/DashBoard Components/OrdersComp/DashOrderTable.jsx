"use client";

// Shadcn Comp
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Stores
import { useOrderStore } from "@/utils/OrderStore";

// Next
import Image from "next/image";

// React
import { useEffect, useState } from "react";

// React Icons
import { FaCaretRight, FaRegCheckCircle } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { MdOutlineCancel } from "react-icons/md";

// My Components
import DashOrderDialogue from "./DashOrderDialogue";

// Utils
import { HandeResults } from "@/lib/HandeResults";

// Next
import { useRouter } from "next/navigation";

const DashOrderTable = () => {
  const router = useRouter();

  const { orders, getAllOrders, updateOrder } = useOrderStore();

  useEffect(() => {
    getAllOrders();
  }, [getAllOrders]);

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

  const [OpenDialogue, setOpenDialogue] = useState(null);
  const [LoadDialogue, setLoadDialogue] = useState(false);

  const HandleUpdateOrder = async (id, updatedO) => {
    setLoadDialogue(true);
    const { success, message } = await updateOrder(id, updatedO);

    HandeResults(success, message);

    if (success === true) {
      setOpenDialogue(null);
    }
    setLoadDialogue(false);
  };

  if (!orders) {
    return (
      <div className="lg:w-3/4 w-full flex h-32 items-center justify-center text-muted-foreground">
        Loading Orders...
      </div>
    );
  }
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="w-[170px]">
              Order ID / Date / Status
            </TableHead>
            <TableHead className="w-[120px]">Grand Total / Pay Via </TableHead>
            <TableHead className="w-[260px]">
              Phone Number / Delivery Address
            </TableHead>
            <TableHead className="w-[350px]">Items</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.length > 0 ? (
            orders.map((o) => {
              return (
                <TableRow key={o._id}>
                  <TableCell>
                    <h1 className="font-bold ">#order n°{o._id.slice(-6)}</h1>
                    <h4 className="mb-1">{o.timeOfOrder}</h4>
                    {HandleOrderStatus(o.status)}
                  </TableCell>
                  <TableCell className="gap-1">
                    <h1
                      className={`font-bold text-lg ${o.paymentStatus ? "text-teal-700" : " text-red-700"}`}
                    >
                      {o.totalAmount} Dz
                    </h1>
                    <p>By {o.paymentMethod}</p>
                    {HandlePaymentStatus(o.paymentStatus)}
                  </TableCell>
                  <TableCell>
                    <h4>{o.user.phoneNumber}</h4>
                    <p className="whitespace-normal">
                      {o.deliveryAddress.address === "" ? (
                        <>
                          {o.deliveryAddress.bureauAddress}
                          <span className="font-semibold">
                            {" - "}
                            {o.deliveryPlace}
                          </span>
                        </>
                      ) : (
                        <>
                          {o.deliveryAddress.address}
                          <span className="font-semibold">
                            {" - "}
                            {o.deliveryPlace}
                          </span>
                        </>
                      )}
                    </p>
                  </TableCell>
                  <TableCell className="flex justify-between items-center">
                    <div className="flex items-start gap-2 flex-wrap">
                      {o.products.map((p) => {
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
                              height={300}
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
                    <div className="flex items-center">
                      <Button
                        variant="ghost"
                        className="p-2 hover:bg-gray-200 text-blue-600 hover:text-blue-800"
                        asChild
                        onClick={() => setOpenDialogue(o)}
                      >
                        <FiEdit className="w-8 h-8" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 hover:bg-gray-300"
                        onClick={() =>
                          router.push(`/admin/dashboard/orders/${o._id}`)
                        }
                      >
                        <FaCaretRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell>No Orders found</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {OpenDialogue && (
        <DashOrderDialogue
          OpenStatus={!!OpenDialogue}
          OpenToggle={() => setOpenDialogue(null)}
          Id={OpenDialogue._id.slice(-6)}
          loading={LoadDialogue}
          Update={(data) => HandleUpdateOrder(OpenDialogue._id, data)}
          payment={OpenDialogue.paymentStatus}
          status={OpenDialogue.status}
        />
      )}
    </div>
  );
};

export default DashOrderTable;
