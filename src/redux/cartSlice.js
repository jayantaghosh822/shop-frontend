import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import { useSelector } from "react-redux";
import { createAsyncThunk } from '@reduxjs/toolkit';
// Read cookie on page load (optional helper)
const savedCart = JSON.parse(localStorage.getItem("savedCartItems")) 
|| JSON.parse(localStorage.getItem("unSavedCartItems")) 
|| {};
console.log("saved items",savedCart);
const initialState = {
  items: savedCart,
};

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (userId) => {
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    const cartItems = await axios.get(`${backendUrl}/api/get-cart-items/`, {
      withCredentials: true,
    });

    const itemsFormatted = {};
    cartItems.data.cartItems.forEach(element => {
      itemsFormatted[element._id] = {
        productId: element.product,
        metaData: element.metaData
      };
    });

    localStorage.setItem("savedCartItems", JSON.stringify(itemsFormatted));
    
    // ✅ Return this for .fulfilled case
    return itemsFormatted;
  }
);

// const authuser = useSelector((state) => state.auth.user);
const cartSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    reduxAddToCart: (state, action) => {
    console.log(state.items);
    console.log(savedCart);
    console.log('New item:', action.payload);
    const items = action.payload.itemData;
    const authuser =  action.payload.authuser;
    // const ifSizeExists = Object.entries(sizesChosenForProducts).some(
    //   ([key, value]) => key==proID && value.sizeId == sizeID
    // );
    state.items = {...state.items,...items};
    if(authuser){
      localStorage.setItem("savedCartItems", JSON.stringify(state.items));
    }else{
      localStorage.setItem("unSavedCartItems", JSON.stringify(state.items));
    }
   
    },
    cleanCart: (state, action) => {
      
      localStorage.removeItem("savedCartItems");
      state.items = {};
    },
    
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.fulfilled, (state, action) => {
        console.log(action.payload);
        state.items = action.payload;
      });
  }
});

export const { reduxAddToCart,cleanCart } = cartSlice.actions;
export default cartSlice.reducer;
