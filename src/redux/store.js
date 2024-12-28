import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice.js";
import authReducer from "./slices/authSlice.js"

export const store = configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
  },
});
