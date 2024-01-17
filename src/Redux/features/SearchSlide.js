import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchArr: [],
};

export const searchSliceReducer = createSlice({
  name: "search",
  initialState,
  reducers: {
    addToSearch: (state, action) => {
      state.searchArr.push(...action.payload);
    },

    removeSearch: (state, action) => {
      state.searchArr = state.searchArr.filter(
        (search) => search._id !== action.payload
      );
    },
  },
});

export const { addToSearch, removeSearch } = searchSliceReducer.actions;
export default searchSliceReducer.reducer;
