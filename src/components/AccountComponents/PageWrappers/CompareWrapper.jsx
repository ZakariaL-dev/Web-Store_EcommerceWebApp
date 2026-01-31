"use client";

// My Components
import StoreEmptyState from "@/components/StoreComponents/StoreEmptyState";
import AccountCompareTable from "../AccountCompareTable";

// Shadcn Comp
import { Button } from "@/components/ui/button";

// Stores
import { useProductStore } from "@/utils/ProductStore";
import { useUserStore } from "@/utils/UserStore";
import { useUtilityStore } from "@/utils/UtilsStore";

// React
import { useEffect, useState } from "react";

// React Icons
import { CgSmileNone } from "react-icons/cg";

// Utils
import { HandeResults } from "@/lib/HandeResults";


const CompareWrapper = () => {
  const { compareList, clearUtils } = useUtilityStore();
  const { getAProductbyId } = useProductStore();
  const { currentUser } = useUserStore();

  const [fullProducts, setFullProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      if (compareList.length === 0) {
        setFullProducts([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const promises = compareList.map((id) => getAProductbyId(id));
        const results = await Promise.all(promises);

        const successfulProducts = results
          .filter((res) => res.success && res.product)
          .map((res) => res.product);

        setFullProducts(successfulProducts);
      } catch (err) {
        HandeResults(false,"Failed to load compare List details");
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [compareList, getAProductbyId]);

  const ClearWishList = async () => {
    if (!currentUser) {
      HandeResults(false, "Please login to add items to cart");
      return;
    }

    const userId = currentUser._id || currentUser.id;
    const { success, message } = await clearUtils(userId, "compare");

    HandeResults(success, message);
    if (success === true) {
      setFullProducts([]);
    }
  };

  if (loading)
    return (
      <div className="py-6 px-3 lg:w-2/3 w-full">Loading compare list...</div>
    );

  return (
    <div className="py-6 px-3 lg:w-2/3 w-full">
      <header className="flex items-center justify-between mb-5">
        <h1 className="text-3xl font-bold">Product Compare</h1>
        {compareList.length != 0 && (
          <Button variant={"outline"} onClick={ClearWishList}>
            Delete All
          </Button>
        )}
      </header>
      {/*  */}
      <main className="mb-4">
        {fullProducts.length !== 0 ? (
          <AccountCompareTable products={fullProducts} />
        ) : (
          <StoreEmptyState
            Icon={CgSmileNone}
            txt={
              "No products to compare. It looks like you haven't added any items to your comparison list yet."
            }
            link={"/"}
            btnMessage={"Start Browsing"}
          />
        )}
      </main>
    </div>
  );
};

export default CompareWrapper;
