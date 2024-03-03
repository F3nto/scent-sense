import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userArr: [],
  isAuthenticated: false, // Initial state is isAuthenticated false
};

export const userSliceReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    addToUser: (state, action) => {
      state.userArr.push(action.payload);
      state.isAuthenticated = true; 
    },
    removeUser: (state, action) => {
      state.userArr = [];
      state.isAuthenticated = false;
    }
  },
});

export const { addToUser, removeUser } = userSliceReducer.actions;

export default userSliceReducer.reducer;