import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "config";

const initialState = {
  user: null,
  isLoading: false,
  error: null,
};

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("userToken");
      if (!token) {
        throw new Error("No token found");
      }

      const response = await fetch(`${BASE_URL}api/user_get_details/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch user details");
      }

      return data.user_details;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch user details");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUserDetails(state) {
      state.user = null;
    },
    logout(state) {
      state.user = null;
      localStorage.removeItem("userToken");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "An error occurred while fetching user details";
      });
  },
});

export const { clearUserDetails, logout } = userSlice.actions;

export default userSlice.reducer;
