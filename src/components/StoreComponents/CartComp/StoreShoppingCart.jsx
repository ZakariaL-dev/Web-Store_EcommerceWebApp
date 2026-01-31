// React Icons
import { AiOutlineClose } from "react-icons/ai";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { TbShoppingBagExclamation } from "react-icons/tb";

// My Components
import StoreCartCard from "./StoreCartCard";
import StoreEmptyState from "../StoreEmptyState";

// Shadcn Comp
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

// Stores
import { useCartStore } from "@/utils/CartStore";
import { useUserStore } from "@/utils/UserStore";

// Next
import Link from "next/link";

// Utils
import { HandeResults } from "@/lib/HandeResults";

const StoreShoppingCart = ({ OpenStatus, OpenToggle }) => {
  const { cart, removeFromCart } = useCartStore();
  const { currentUser } = useUserStore();

  const totalAmount = cart.reduce((acc, item) => {
    const price =
      item.product.status === "on sale"
        ? item.product.price -
          (item.product.price * item.product.discount) / 100
        : item.product.price;
    return acc + price * item.quantity;
  }, 0);

  const handleRemove = async (itemId) => {
    const userId = currentUser._id || currentUser.id;
    const { success, message } = await removeFromCart(userId, itemId);

    HandeResults(success, message);
  };

  return (
    <div
      className={`bg-white h-screen lg:w-md w-full border-l-2 fixed top-0 right-0 z-50 shadow-xl transform transition-transform duration-300 ease-in-out ${
        OpenStatus ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/*  */}
      <header className="p-4 flex items-center justify-between ">
        <div>
          <h1 className="text-2xl mb-2 font-bold flex items-center gap-2">
            <HiOutlineShoppingCart className="text-3xl" />
            Shopping Cart ({cart.length})
          </h1>
          {/* <p>Get Up To 30% OFF on your 1st order</p> */}
        </div>
        <Button variant="ghost" className="p-2" asChild>
          <AiOutlineClose
            className="w-10 h-10"
            onClick={() => OpenToggle(false)}
          />
        </Button>
      </header>
      <Separator className="mb-3" />
      {cart.length != 0 ? (
        <main className="h-[59%] overflow-y-auto">
          {cart.map((item) => {
            if (!item.product || typeof item.product === "string") {
              return (
                <div key={item._id} className="p-4 text-sm text-gray-400">
                  Loading item details...
                </div>
              );
            }
            return (
              <StoreCartCard
                key={item._id}
                item={item}
                onRemove={() => handleRemove(item._id)}
              />
            );
          })}
        </main>
      ) : (
        <StoreEmptyState
          Icon={TbShoppingBagExclamation}
          txt={
            "Your bag is empty. Looks like you haven't added anything to your bag yet. Don't worry, there’s plenty of great stuff to discover!"
          }
          link={"/search?p=new"}
          btnMessage={"Shop New Arrivals"}
          OpenToggle={OpenToggle}
        />
      )}
      {cart.length != 0 && (
        <footer className="p-3">
          <header className="flex items-center justify-between p-3 border-b-2 mb-3">
            <h3 className="text-gray-500">Total Amount</h3>
            <h1 className="text-2xl font-bold">{totalAmount.toFixed(2)} Dz</h1>
          </header>
          <div>
            <Button className="w-full mb-3">
              <Link href={"/cart/checkout"}> Continue to CheckOut</Link>
            </Button>
            <Button variant={"outline"} className="w-full">
              <Link href={"/cart"}>View Cart</Link>
            </Button>
          </div>
        </footer>
      )}
    </div>
  );
};

export default StoreShoppingCart;
