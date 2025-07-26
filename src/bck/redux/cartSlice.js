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


function deepEqual(obj1, obj2) {
  return Object.keys(obj1).length === Object.keys(obj2).length &&
    Object.keys(obj1).every(key => obj1[key] === obj2[key]);
}

// const isEqual = deepEqual(metaData1, metaData2);
// const authuser = useSelector((state) => state.auth.user);
const cartSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    reduxAddToCart: (state, action) => {

      const newItem = action.payload.itemData; // { temp_key: { productId, metaData } }
      const authuser = action.payload.authuser;
      const firstKey = Object.keys(newItem)[0]; 
      const { productId, metaData } = newItem[firstKey];

      // Check if the same product + size already exists in cart
      let found = false;

      for (const key in state.items) {
        const item = state.items[key];

        if (
          item.productId === productId &&
          deepEqual(item.metaData, metaData)
        ) {
          // If same productId and same metaData (e.g., size, price), increase quantity
          const currentQuantity = item.quan || 0;

          state.items[key] = {
            ...item,
            quan: currentQuantity + 1
          };

          found = true;
          break;
        }
      }

      if (!found) {
        // Add as a new entry if not present
        state.items = {
          ...state.items,
          ...newItem
        };
      }
  // const authuser = null;
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
