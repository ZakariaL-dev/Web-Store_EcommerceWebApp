"use client";

// Stores
import { useCartStore } from "@/utils/CartStore";
import { useUserStore } from "@/utils/UserStore";
import { useUtilityStore } from "@/utils/UtilsStore";

// React
import { useEffect, useRef } from "react";


const UserSync = ({ id }) => {
  const { currentUser, getAUser } = useUserStore();
  const { setCart } = useCartStore();
  const { setWishlist, setcompareList } = useUtilityStore();

  const hasFetched = useRef(false);

  // 1. Fetch user from DB on mount/reload
  useEffect(() => {
    if (id && !hasFetched.current) {
      getAUser(id);
      hasFetched.current = true;
    }
  }, [id, getAUser]);

  // 2. Sync both Cart and Wishlist when currentUser data arrives
  useEffect(() => {
    if (currentUser) {
      if (currentUser.cart) {
        setCart(currentUser.cart);
      }
      if (currentUser.wishlist) {
        setWishlist(currentUser.wishlist);
      }
      if (currentUser.compare) {
        setcompareList(currentUser.compare);
      }
    }
  }, [currentUser, setCart, setWishlist, setcompareList]);

  return null;
};

export default UserSync;
