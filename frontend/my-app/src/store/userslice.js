import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: undefined,
  socials: undefined,
  announcement: true,
};

export const userslice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setuser: (state, action) => {
      state.user = action.payload.user;
      state.socials = action.payload.socials;
      state.announcement = action.payload.user.type != "student" ? true : false;
      localStorage.setItem("token", action.payload.token);
      console.log(action.payload);
      return state;
    },
    removeUser: (state) => {
      state.user = null;
      state.socials = null;
      localStorage.removeItem("token");
      return state;
    },
    updateUser: (state, action) => {
      state.user = action.payload.user;
    },
  },
});
export const { setuser, removeUser,updateUser } = userslice.actions;
export default userslice.reducer;
