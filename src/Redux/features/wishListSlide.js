import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  wishListArr: [],
};

export const wishListSliceReducer = createSlice({
  name: "wishList",
  initialState,
  reducers: {
    addToWishList: (state, action) => {
      const wishList = {
        id: nanoid(),
        text: action.payload,
      };
      state.wishListArr.push(wishList);
    },
    removeWishList: (state, action) => {
      state.wishListArr = state.wishListArr.filter(
        (wishlist) => wishlist.id !== action.payload
      );
    },
  },
});

export const { addToWishList, removeWishList } = wishListSliceReducer.actions;

export default wishListSliceReducer.reducer;
