  import { createSlice } from "@reduxjs/toolkit";

  const initialState = {
    wishListArr : []
  };

  export const wishListSliceReducer = createSlice({
    name: "wishList",
    initialState,
    reducers: {
      addToWishList: (state, action) => {
       state.wishListArr.push(action.payload);  
      },
      removeWishList: (state, action) => {
        state.wishListArr = state.wishListArr.filter(
          (wishlist) => wishlist._id !== action.payload
        );
      },
    },
  });

  export const { addToWishList, removeWishList } = wishListSliceReducer.actions;

  export default wishListSliceReducer.reducer;
