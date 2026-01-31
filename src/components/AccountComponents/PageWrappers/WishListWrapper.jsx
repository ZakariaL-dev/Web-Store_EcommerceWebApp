"use client";

// React
import { useEffect, useState } from "react";

// My Components
import AccountWishCard from "@/components/AccountComponents/AccountWishCard";
import StoreEmptyState from "@/components/StoreComponents/StoreEmptyState";

// Shadcn Comp
import { Button } from "@/components/ui/button";

// React Icons
import { ImHeartBroken } from "react-icons/im";

// Stores
import { useUtilityStore } from "@/utils/UtilsStore";
import { useProductStore } from "@/utils/ProductStore";
import { useUserStore } from "@/utils/UserStore";

// Utils
import { HandeResults } from "@/lib/HandeResults";


const WishListWrapper = () => {
  const { wishlist, removeFromList, clearUtils } = useUtilityStore();
  const { currentUser } = useUserStore();
  const { getAProductbyId } = useProductStore();

  const [fullProducts, setFullProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      if (wishlist.length === 0) {
        setFullProducts([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const promises = wishlist.map((id) => getAProductbyId(id));
        const results = await Promise.all(promises);

        const successfulProducts = results
          .filter((res) => res.success && res.product)
          .map((res) => res.product);

        setFullProducts(successfulProducts);
      } catch (err) {
        HandeResults(false, `Failed to load wishlist details: ${err}`);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [wishlist, getAProductbyId]);

  const handleRemove = async (itemId) => {
    if (!currentUser) {
      HandeResults(false, "Please login to add items to cart");
      return;
    }

    const userId = currentUser._id || currentUser.id;
    const { success, message } = await removeFromList(
      userId,
      itemId,
      "wishlist",
    );

    HandeResults(success, message);
  };

  const ClearWishList = async () => {
    if (!currentUser) {
      HandeResults(false, "Please login to add items to cart");
      return;
    }

    const userId = currentUser._id || currentUser.id;
    const { success, message } = await clearUtils(userId, "Wishlist");

    HandeResults(success, message);
  };

  if (loading)
    return <div className="py-6 px-3 lg:w-2/3 w-full">Loading wishlist...</div>;

  return (
    <div className="py-6 px-3 lg:w-2/3 w-full">
      <header className="flex items-center justify-between mb-5">
        <h1 className="text-3xl font-bold mb-3">WishList</h1>
        {wishlist.length !== 0 && (
          <Button variant={"outline"} onClick={ClearWishList}>
            Delete All
          </Button>
        )}
      </header>

      <main>
        {fullProducts.length !== 0 ? (
          fullProducts.map((product) => {
            return (
              <AccountWishCard
                key={product._id}
                product={product}
                onRemove={() => handleRemove(product._id)}
              />
            );
          })
        ) : (
          <StoreEmptyState
            Icon={ImHeartBroken}
            txt={"No products were added to the wishlist page."}
            link={"/"}
            btnMessage={"Go Back to Home Page"}
          />
        )}
      </main>
    </div>
  );
};

export default WishListWrapper;
