import { configureStore } from "@reduxjs/toolkit";
import { cartSlice } from "../pages/cart/cartSlice";
import { catalogSlice } from "../pages/catalog/catalogSlice";

export const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    catalog: catalogSlice.reducer
  }
});