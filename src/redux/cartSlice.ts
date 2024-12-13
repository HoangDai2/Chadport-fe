import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import CartItem from "../Types/TCart";
import apisphp from "../Service/api";

export const addToCart = createAsyncThunk(
  "products/AddCart",
  async (
    productDetails: {
      product_id: number;
      quantity: number;
      product_item_id: number;
    },
    { rejectWithValue }
  ) => {
    try {
      // Lấy token từ localStorage
      const token = localStorage.getItem("jwt_token");
      console.log("Token:", token);
      if (!token) {
        return rejectWithValue("Token not found");
      }

      // Cấu hình header để thêm token vào yêu cầu
      const headers = {
        Authorization: `Bearer ${token}`, // Gửi token vào header Authorization
      };

      // Kiểm tra payload
      console.log("Sending request with:", productDetails);

      const response = await apisphp.post("user/add_to_cart", productDetails, {
        headers,
      });
      console.log("API response:", response);
      return response.data; // Trả về dữ liệu khi thành công
    } catch (error) {
      console.log("Error adding to cart:", error); // Log lỗi chi tiết
      return rejectWithValue("Error adding to cart");
    }
  }
);

export const counterSlice = createSlice({
  name: "products",
  initialState: {
    CartArr: [],
  },
  reducers: {
    AddCart: (state, action) => {},
    DeleteCart: (state) => {},
    incrementByAmount: (state, action: PayloadAction<number>) => {},
  },
});

// Action creators are generated for each case reducer function
export const { AddCart, DeleteCart, incrementByAmount } = counterSlice.actions;

export default counterSlice.reducer;
