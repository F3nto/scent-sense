import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchArrForAllProduct: [],
  searchArrForTreasureProduct : [],
  
};

export const searchSliceReducer = createSlice({
  name: "search",
  initialState,
  reducers: {
    addToSearch: (state, action) => {
      state.searchArrForAllProduct.push(...action.payload);
      state.searchArrForTreasureProduct.push(...action.payload);
    },

    removeSearch: (state, action) => {
      state.searchArrForAllProduct = state.searchArrForAllProduct.filter(
        (search) => search._id !== action.payload
      );

      state.searchArrForTreasureProduct = state.searchArrForTreasureProduct.filter(
        (search) => search._id !== action.payload
      )
    },
  },
});

export const { addToSearch, removeSearch } = searchSliceReducer.actions;
export default searchSliceReducer.reducer;
