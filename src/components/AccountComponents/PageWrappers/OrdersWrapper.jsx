"use client";

// My Components
import AccountOrderCard from "@/components/AccountComponents/AccountOrderCard";
import AccountPagination from "@/components/AccountComponents/AccountPagination";
import StoreEmptyState from "@/components/StoreComponents/StoreEmptyState";

// Shadcn Comp
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Utils
import { HandeResults } from "@/lib/HandeResults";

// Stores
import { useOrderStore } from "@/utils/OrderStore";
import { useUserStore } from "@/utils/UserStore";

// React
import { useEffect } from "react";

// React Icons
import { TbShoppingCartExclamation } from "react-icons/tb";


const OrdersWrapper = () => {
  const { orders, getAllOrders, updateOrder } = useOrderStore();
  const { currentUser } = useUserStore();

  useEffect(() => {
    getAllOrders();
  }, [getAllOrders]);

  if (!orders) {
    return (
      <div className="lg:w-3/4 w-full flex h-32 items-center justify-center text-muted-foreground">
        Loading Orders...
      </div>
    );
  }
  const UsersOrders = orders.filter((o) => o.user._id === currentUser._id);

  const HandleCancelOrder = async (id) => {
    const { success, message } = await updateOrder(id, { status: "canceled" });

    HandeResults(success, message);
  };

  return (
    <div className="py-6 px-3 lg:w-2/3 w-full">
      <header className="flex items-center justify-between mb-5">
        <h1 className="text-4xl font-bold">Orders</h1>
        {UsersOrders.length != 0 && (
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="allOrders">All Orders</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
      </header>
      {/*  */}
      <main className="mb-4">
        {UsersOrders.length != 0 ? (
          <>
            {UsersOrders.map((o) => {
              return (
                <AccountOrderCard
                  key={o._id}
                  order={o}
                  cancel={() => HandleCancelOrder(o._id)}
                />
              );
            })}
          </>
        ) : (
          <StoreEmptyState
            Icon={TbShoppingCartExclamation}
            txt={
              "You haven't ordered anything yet. Need some inspiration? Check out our bestsellers or see what's new this week."
            }
            link={"/"}
            btnMessage={"Browse Our Collection"}
          />
        )}
      </main>
      {/*  */}
      {UsersOrders.length != 0 && (
        <footer className="flex items-center justify-between w-full border-t-2 pt-3 my-4">
          <h1>Showing 1 of {UsersOrders.length} results</h1>
          <AccountPagination />
        </footer>
      )}
    </div>
  );
};

export default OrdersWrapper;
