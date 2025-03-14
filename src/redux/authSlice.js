import { createSlice } from "@reduxjs/toolkit";

// Read cookie on page load (optional helper)
const getCookie = (name) => {
  const cookies = document.cookie.split("; ");
  const cookie = cookies.find((row) => row.startsWith(name + "="));
  return cookie ? cookie.split("=")[1] : null;
};

const initialState = {
  user: null,
  token: getCookie("authToken") || null, // Load token from cookie
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
