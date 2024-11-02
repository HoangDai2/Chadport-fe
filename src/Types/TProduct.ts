import Tcategory from "./TCategories";
export interface size {
  id?: number;
  name: string;
  status: string;
  date_create: string;
  date_update: string;
}

export interface color {
  id?: number;

  name: string;
  status: string;
  date_create: string;
  date_update: string;
}

export interface TProduct {
  id: number;
  cat_id: number;
  title: string;
  name: string;
  status: string;
  col_id: number;
  size_id: number;
  brand_id: number;
  description: string;
  quantity: number;
  image_product: string;
  image_description: File[];
  price: number;
  price_sale: number;
  type: string;
  date_create: string;
  date_update: string;
  category?: Tcategory[];

  // size?: [];
  // color?: [];
  size?: string; // Thay vì mảng, đây là chuỗi để lưu lựa chọn đã chọn
  color?: string; // Tương tự, chuỗi để lưu màu đã chọn
}

export default TProduct;
