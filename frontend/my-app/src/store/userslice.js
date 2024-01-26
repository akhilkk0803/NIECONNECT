import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: undefined,
};

export const userslice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setuser: (state, action) => {
      state.user = action.payload.user;
      localStorage.setItem("token", action.payload.token);
      console.log(action.payload);
      return state;
    },
    removeUser: (state) => {
      state.user = null;
      localStorage.removeItem("token");
      return state;
    },
  },
});
export const { setuser, removeUser } = userslice.actions;
export default userslice.reducer;
