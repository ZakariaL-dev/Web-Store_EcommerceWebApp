"use client";

// My Components
import DashOrderDetailsPage from "./DashOrderDetailsPage";
import DashOrderDialogue from "./DashOrderDialogue";

// Stores
import { useOrderStore } from "@/utils/OrderStore";

// React
import { useEffect, useState } from "react";

// Utils
import { HandeResults } from "@/lib/HandeResults";

const DashOrderDetailsWrapper = ({ id }) => {
  const { getAnOrderbyId, currentOrder, updateOrder } = useOrderStore();

  useEffect(() => {
    getAnOrderbyId(id);
  }, [getAnOrderbyId, id]);

  const [OpenDialogue, setOpenDialogue] = useState(false);

  const [LoadDialogue, setLoadDialogue] = useState(false);

  const HandleUpdateOrder = async (updatedO) => {
    setLoadDialogue(true);
    const { success, message } = await updateOrder(id, updatedO);

    HandeResults(success, message);

    if (success === true) {
      setOpenDialogue(null);
    }
    getAnOrderbyId(id);
    setLoadDialogue(false);
  };

  if (!currentOrder) {
    return (
      <div className="flex flex-col w-full my-3 h-32 items-center justify-center text-muted-foreground">
        Loading Order...
      </div>
    );
  }
  return (
    <>
      <DashOrderDetailsPage
        order={currentOrder}
        OpenStatus={OpenDialogue}
        OpenToggle={setOpenDialogue}
      />

      {OpenDialogue && (
        <DashOrderDialogue
          OpenStatus={OpenDialogue}
          OpenToggle={setOpenDialogue}
          payment={currentOrder.paymentStatus}
          status={currentOrder.status}
          Id={currentOrder._id.slice(-6)}
          loading={LoadDialogue}
          Update={(data) => HandleUpdateOrder(data)}
        />
      )}
    </>
  );
};

export default DashOrderDetailsWrapper;
