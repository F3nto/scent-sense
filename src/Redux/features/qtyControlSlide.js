import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  quantity: 1,
  instock: 0,
};

export const quantitySlice = createSlice({
  name: "quantity",
  initialState,
  reducers: {
    incQty: (state) => {
      if (state.instock === 0) {
        return state;
      }

      const newQuantity = state.quantity + 1;
      const newInstock = state.instock > 0 ? state.instock - 1 : state.instock;

      return {
        ...state,
        quantity: newQuantity,
        instock: newInstock,
      };
    },
    decQty: (state) => {
      const newQuantity =
        state.quantity > 1 ? state.quantity - 1 : state.quantity;
      const newInstock = state.instock + 1;
      if (state.quantity === 1) {
        return state;
      }

      return {
        ...state,
        quantity: newQuantity,
        instock: newInstock,
      };
    },
    setQty: (state, action) => {
      return {
        ...state,
        quantity: action.payload,
      };
    },
    setInstock: (state, action) => {
      return {
        ...state,
        instock: action.payload,
      };
    },
  },
});

export const { incQty, decQty, setQty, setInstock } = quantitySlice.actions;

export default quantitySlice.reducer;
