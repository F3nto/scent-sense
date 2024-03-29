import { configureStore } from "@reduxjs/toolkit";
import wishListSliceReducer from "../features/wishListSlide";
import cartSliceReducer from "../features/addToCartSlide";
import searchSliceReducer from "../features/SearchSlide";
import instockSliceReducer from "../features/instockSlice";
import userSliceReducer from "../features/UserSlice";


export const store = configureStore({
  reducer: {
    wishList: wishListSliceReducer,
    cart: cartSliceReducer,
    search : searchSliceReducer,
    instock : instockSliceReducer,
    user : userSliceReducer,

  },
});
