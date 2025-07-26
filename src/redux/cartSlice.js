import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import { useSelector } from "react-redux";
import { createAsyncThunk } from '@reduxjs/toolkit';

// In the same file where you're calling createAsyncThunk
import axiosInstance from '../Interceptor/axiosInstance'; // path to your interceptor file
// Read cookie on page load (optional helper)
const savedCart = JSON.parse(localStorage.getItem("savedCartItems")) 
|| JSON.parse(localStorage.getItem("unSavedCartItems")) 
|| [];
console.log("saved items",savedCart);
const initialState = {
  items: savedCart,
};

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (userId) => {
    const res = await axiosInstance.get(`/api/get-cart-items/`);
    
    console.log("saved items", res.data.cartItems);

    // localStorage.setItem("savedCartItems", JSON.stringify(res.data.cartItems));

    return res.data.cartItems;
  }
);



const cartSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    reduxAddToCart: (state, action) => {
      const newItem = action.payload.itemData; // newItem is already structured like a cart item
      const authuser = action.payload.authuser;
      console.log(JSON.stringify(newItem, null, 2));
      console.log(JSON.stringify(state.items, null, 2));
      // console.log(newItem);
      const existingIndex = state.items.findIndex(
        (item) =>
          item.product === newItem.product &&
          item.metaData.sizeId == newItem.metaData.sizeId
      );
      console.log(existingIndex);
      if (existingIndex !== -1) {
        // Item exists, update quantity
        state.items[existingIndex].quan += newItem.quan || 1;
      } else {
        // New item, push to array
        state.items.push(newItem);
      }

      // Save to localStorage
      const key = authuser ? "savedCartItems" : "unSavedCartItems";
    
      try {
        localStorage.setItem(key, JSON.stringify(state.items));
      } catch (e) {
        if (e.name === "QuotaExceededError") {
          console.error("LocalStorage limit exceeded!");
          alert("Cart data is too large. Please remove some items.");
        }
      }
    },
    cleanCart: (state, action) => {
      localStorage.removeItem("savedCartItems");
      state.items = [];
    },
    fetchCartReducer: (state,action)=>{
       console.log(action.payload);
       state.items = action.payload;
    }
    
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.fulfilled, (state, action) => {
        console.log(action.payload);
        state.items = action.payload;
      });
  }
});

export const { reduxAddToCart,cleanCart,fetchCartReducer } = cartSlice.actions;
export default cartSlice.reducer;
