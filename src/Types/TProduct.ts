import Tcategory from "./TCategories";

export interface Size {
  id?: number;
  name: string;
  date_create: string;
  date_update: string;
}

export interface Color {
  id?: number;
  name: string;
  hex: string;
  image: string;
  date_create: string;
  date_update: string;
}

export interface TVariant {
  product: any;
  id: number;
  product_id: number;
  color_id: number;
  size_id: number;
  quatity: number;
  color?: Color; // Bao gồm thông tin màu sắc
  size?: Size; // Bao gồm thông tin kích cỡ
}

export interface TProduct {
  id: number;
  category_id: number;
  title: string;
  name: string;
  status: string;
  col_id: number;
  size_id: number;
  brand_id: number;
  description: string;
  quantity: number;
  image_product: string;
  image_description?: string[];
  price: number;
  price_sale: number;
  type: string;
  date_create: string;
  date_update: string;
  category?: Tcategory[];
  variants?: TVariant[]; // Thêm danh sách các biến thể của sản phẩm
}

export default TProduct;
