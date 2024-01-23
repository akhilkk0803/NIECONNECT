import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userslice";
export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
