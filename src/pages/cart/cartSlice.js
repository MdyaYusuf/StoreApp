import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import requests from "../../api/apiClient";

const initialState = {
  cart: null,
  status: "idle"
};

export const addItemToCart = createAsyncThunk(
  "cart/addItemToCart",
  async ({ productId, quantity = 1 }) => {
    try {
      return await requests.cart.addItem(productId, quantity);
    }
    catch (error) {
      console.log(error);
    }
  }
);

export const deleteItemFromCart = createAsyncThunk(
  "cart/deleteItemFromCart",
  async ({ productId, quantity = 1, key = "" }) => {
    try {
      return await requests.cart.deleteItem(productId, quantity);
    }
    catch (error) {
      console.log(error);
    }
  }
);

export const getCart = createAsyncThunk(
  "cart/getCart",
  async (_, thunkAPI) => {
    try {
      return await requests.cart.get();
    }
    catch (error) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.cart = action.payload;
    },
    clearCart: (state) => {
      state.cart = null;
    }
  },
  extraReducers: (builder) => {   
    builder.addCase(addItemToCart.pending, (state, action) => {
      state.status = "pendingAddItem" + action.meta.arg.productId;
    });

    builder.addCase(addItemToCart.fulfilled, (state, action) => {
      state.cart = action.payload;
      state.status = "idle";
    });

    builder.addCase(addItemToCart.rejected, (state) => {
      state.status = "idle";
    });

    builder.addCase(deleteItemFromCart.pending, (state, action) => {
      state.status = "pendingDeleteItem" + action.meta.arg.productId + action.meta.arg.key; 
    });

    builder.addCase(deleteItemFromCart.fulfilled, (state, action) => {
      state.cart = action.payload;
      state.status = "idle";
    });

    builder.addCase(deleteItemFromCart.rejected, (state) => {
      state.status = "idle";
    });

    builder.addCase(getCart.fulfilled, (state, action) => {
      state.cart = action.payload;
    }); 
  }
});

export const { setCart, clearCart } = cartSlice.actions;