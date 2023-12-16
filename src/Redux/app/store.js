import { configureStore } from "@reduxjs/toolkit";
import { wishListSliceReducer } from "../features/wishListSlide";

export const store = configureStore({
  reducer: wishListSliceReducer,
});
