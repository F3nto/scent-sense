import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  quantity: 1,
  instock: [],
};

export const quantitySlice = createSlice({
  name: "quantity",
  initialState,
  reducers: {
    incQty: (state) => {
      const newQuantity = state.quantity + 1;

      const updatedInstock = state.instock.map((item) => {
        return {
          ...item,
          instock: item.instock - 1,
        };
      });

      return {
        ...state,
        quantity: newQuantity,
        instock: updatedInstock,
      };
    },
    decQty: (state) => {
      const newQuantity = Math.max(state.quantity - 1, 1);

      const updatedInstock = state.instock.map((item) => {
        return {
          ...item,
          instock: item.instock + 1,
        };
      });

      return {
        ...state,
        quantity: newQuantity,
        instock: updatedInstock,
      };
    },
    setQty: (state, action) => {
      return {
        ...state,
        quantity: action.payload,
      };
    },
    setInstock: (state, action) => {
      const instockArray = Array.isArray(action.payload)
        ? action.payload
        : [action.payload];

      const updatedInstock = instockArray.map((item) => {
        return {
          _id: item._id,
          instock: item.instock,
        };
      });

      return {
        ...state,
        instock: updatedInstock,
      };
    },
  },
});

export const { incQty, decQty, setQty, setInstock } = quantitySlice.actions;

export default quantitySlice.reducer;
