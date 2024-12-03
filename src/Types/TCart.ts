import TProduct, { Color, Size } from "./TProduct";

// Các kiểu dữ liệu cho Redux
type CartItem = {
  cart_item_ids: number;
  product_item_id: number;
  quantity: number;
  total_price: string;
  image_product: string;
  product_name: string;
  product_price: string;
  product_sale_price: string;

  color: Color;
  size: Size;
};

type CartData = {
  cart_id: number;
  cart_items: CartItem[];
  total_amount: number;
  message: string;
};
export default CartData;
