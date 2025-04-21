import { createSlice } from "@reduxjs/toolkit";

// Read cookie on page load (optional helper)
const getCookie = (name) => {
  const cookies = document.cookie.split("; ");
  const cookie = cookies.find((row) => row.startsWith(name + "="));
  return cookie ? cookie.split("=")[1] : null;
};

const initialState = {
  user: null,
  loading: true,
  token: getCookie("token") || null, // Load token from cookie
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.loading = false;
    },
    logout: (state) => {
      // alert('loging out');
      state.user = null;
      state.loading = false;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
