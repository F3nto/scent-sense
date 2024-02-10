  import { createSlice } from "@reduxjs/toolkit";

  const initialState = {
    instock: {},
  };

  const instockSliceReducer = createSlice({
    name: "instock",
    initialState,
    reducers: {
      updateInstock(state, action) {
        const { id, instock } = action.payload;
        state.instock = {
          ...state.instock,
          [id]: instock,
        };
      },
    },
  });

  export const { updateInstock } = instockSliceReducer.actions;
  export default instockSliceReducer.reducer;