import { configureStore } from "@reduxjs/toolkit";
import wishListSliceReducer from "../features/wishListSlide";
import cartSliceReducer from "../features/addToCartSlide";
import searchSliceReducer from "../features/SearchSlide";

export const store = configureStore({
  reducer: {
    wishList: wishListSliceReducer,
    cart: cartSliceReducer,
    search : searchSliceReducer,
  },
});
