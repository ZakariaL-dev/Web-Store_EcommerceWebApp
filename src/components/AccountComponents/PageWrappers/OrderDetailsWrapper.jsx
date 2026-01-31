"use client";

// My Components
import AccountOrderDetails from "../AccountOrderDetails";

// Stores
import { useOrderStore } from "@/utils/OrderStore";

// React
import { useEffect } from "react";

// Utils
import { HandeResults } from "@/lib/HandeResults";


const OrderDetailsWrapper = ({ id }) => {
  const { getAnOrderbyId, currentOrder, updateOrder } = useOrderStore();

  useEffect(() => {
    getAnOrderbyId(id);
  }, [getAnOrderbyId, id]);

  const HandleCancelOrder = async () => {
    const { success, message } = await updateOrder(id, { status: "canceled" });
    HandeResults(success, message);

    getAnOrderbyId(id);
  };

  if (!currentOrder) {
    return (
      <div className="lg:w-3/4 w-full flex h-32 items-center justify-center text-muted-foreground">
        Loading Order...
      </div>
    );
  }

  return (
    <AccountOrderDetails order={currentOrder} cancel={HandleCancelOrder} />
  );
};

export default OrderDetailsWrapper;
