import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "config";

const initialState = {
  user: null,
  token: null,
  userDetails: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
};

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (_, { dispatch, getState, rejectWithValue }) => {
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

      // Save user details to localStorage for persistence
      localStorage.setItem("userDetails", JSON.stringify(data.user_details));

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
    setUserToken: (state, action) => {
      state.token = action.payload;
    },
    setUserDetails(state, action) {
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
    clearUserDetails(state) {
      state.user = null;
      state.token = null;
    },
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("userToken");
      localStorage.removeItem("userDetails");
    },
  },
  extraReducers: (builder) => {
    // Handle fetchUser action lifecycle
    builder
      .addCase(fetchUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "An error occurred while fetching user details";
      });
  },
});

export const { setUserToken, setUserDetails, clearUserDetails, setLoading, setError, logout } =
  userSlice.actions;

export default userSlice.reducer;
