// cartSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface CartItem {
  cart_id: string;
  pro_id: number;
  total_money: number;
  description: string;
  date_create: string;
  date_update: string;
}

interface CartState {
  items: CartItem[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

// Initial state
const initialState: CartState = {
  items: [],
  status: "idle",
  error: null,
};

// Async thunk for fetching cart items
export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async () => {
    const response = await axios.get("http://localhost:3000/cart");
    return response.data;
  }
);

// Cart slice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    removeItem: (state, action) => {
      state.items = state.items.filter(
        (item) => item.pro_id !== action.payload
      );
    },
    // Additional reducers if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItems.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch cart items.";
      });
  },
});

// Export actions and reducer
export const { removeItem } = cartSlice.actions;
export default cartSlice.reducer;
