import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userArr: [],
};

export const userSliceReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    addToUser: (state, action) => {
      state.userArr.push(action.payload);
    },
  },
});

export const { addToUser } = userSliceReducer.actions;

export default userSliceReducer.reducer;
