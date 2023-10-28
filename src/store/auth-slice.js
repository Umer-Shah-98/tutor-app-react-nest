import { createSlice } from "@reduxjs/toolkit";
const userData = JSON.parse(localStorage.getItem("user"));
const authSlice = createSlice({
  name: "proposals",
  initialState: {
    userData: userData || {},
  },
  reducers: {
    addUser(state, action) {
      const user = action.payload;
      state.userData = user;
    },
    updateUser(state, action) {},
    deleteUser(state, action) {
      state.userData = {};
    },
  },
});
export const authActions = authSlice.actions;
export default authSlice;
