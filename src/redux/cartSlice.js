import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import { useSelector } from "react-redux";
import { createAsyncThunk } from '@reduxjs/toolkit';

// In the same file where you're calling createAsyncThunk
import axiosInstance from '../Interceptor/axiosInstance'; // path to your interceptor file
// Read cookie on page load (optional helper)

const initialState = {
  items: [],
};

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async () => {
    const res = await axiosInstance.get(`/api/get-cart-items`);
    return res.data || [];
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    reduxAddToCart: (state, action) => {
      const newItem = action.payload.itemData;
      const authuser = action.payload.authuser;

      // ✅ Compare product + variation IDs
      const existingIndex = state.items.findIndex(
        (item) =>
          item.product?.id === newItem.product?.id &&
          item.variation?.id === newItem.variation?.id
      );

      if (existingIndex !== -1) {
        state.items[existingIndex].quan += newItem.quan || 1;
      } else {
        state.items.push(newItem);
      }

      const key = authuser ? "savedCartItems" : "unSavedCartItems";
      localStorage.setItem(key, JSON.stringify(state.items));
    },
    cleanCart: (state) => {
      state.items = [];
      localStorage.removeItem("savedCartItems");
      localStorage.removeItem("unSavedCartItems");
    },
    fetchCartReducer: (state, action) => {
      state.items = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCart.fulfilled, (state, action) => {
      state.items = action.payload;
    });
  }
});

export const { reduxAddToCart, cleanCart, fetchCartReducer } = cartSlice.actions;
export default cartSlice.reducer;