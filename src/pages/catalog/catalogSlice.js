import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import requests from "../../api/apiClient";

const productsAdapter = createEntityAdapter();

const initialState = productsAdapter.getInitialState({
  status: "idle",
  isLoaded: false
});

export const fetchProducts = createAsyncThunk(
  "catalog/fetchProducts",
  async () => {
    try {
      return await requests.products.list()
    }
    catch (error) {
      console.log(error);
    }
  }
);

export const fetchProductById = createAsyncThunk(
  "catalog/fetchProductById",
  async ({ productId }) => {
    try {
      return await requests.products.details(productId);
    }
    catch (error) {
      console.log(error);
    }
  }
);

export const catalogSlice = createSlice({
  name: "catalog",
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.status = "pendingFetchProducts";
    });

    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      productsAdapter.setAll(state, action.payload);
      state.isLoaded = true;
      state.status = "idle";
    });

    builder.addCase(fetchProducts.rejected, (state) => {
      state.status = "idle";
    });

    builder.addCase(fetchProductById.pending, (state) => {
      state.status = "pendingFetchProductById";
    });

    builder.addCase(fetchProductById.fulfilled, (state, action) => {
      productsAdapter.upsertOne(state, action.payload);
      state.status = "idle";
    });

    builder.addCase(fetchProductById.rejected, (state) => {
      state.status = "idle";
    });
  }
});

export const {
  selectById: selectProductById,
  selectAll: selectAllProducts,
  selectTotal: selectTotalProducts
} = productsAdapter.getSelectors((state) => state.catalog);