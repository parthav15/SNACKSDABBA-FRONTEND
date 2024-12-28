import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  userDetails: null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUserDetails: (state, action) => {
      state.userDetails = action.payload;
    },
    clearUserDetails: (state) => {
      state.userDetails = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

// Export actions
export const { setToken, setUserDetails, clearUserDetails, setError, setLoading } =
  authSlice.actions;

// Selectors
export const selectUserDetails = (state) => state.auth.userDetails;

export default authSlice.reducer;
