import { configureStore } from "@reduxjs/toolkit";
import wishListSliceReducer from "../features/wishListSlide";
import cartSliceReducer from "../features/addToCartSlide";

export const store = configureStore({
  reducer: {
    wishList: wishListSliceReducer,
    cart: cartSliceReducer,
  },
});
