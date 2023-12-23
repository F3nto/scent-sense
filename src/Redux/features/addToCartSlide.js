import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartArr: [],
};

export const cartSliceReducer = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.cartArr.push(action.payload);
    },

    removeFromCart: (state, action) => {
      state.cartArr = state.cartArr.filter(
        (item) => item._id !== action.payload
      );
    },

    clearCart : state => {
      state.cartArr = []
    }
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSliceReducer.actions;

export default cartSliceReducer.reducer;
