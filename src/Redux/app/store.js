import { configureStore } from "@reduxjs/toolkit";
import wishListSliceReducer from "../features/wishListSlide";
import cartSliceReducer from "../features/addToCartSlide";
import quantitySliceReducer from "../features/qtyControlSlide";

export const store = configureStore({
  reducer: {
    wishList: wishListSliceReducer,
    cart: cartSliceReducer,
    qtyAndInstockController : quantitySliceReducer,    
  },
});
