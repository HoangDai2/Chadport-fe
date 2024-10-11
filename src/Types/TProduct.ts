type Category = {
  id: number;
  name: string;
  parent_id: number | null;
  status: string;
  date_create: string;
  date_update: string;
};

type TProduct = {
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
  price: number;
  category: Category[];
  price_sale: number;
  type: string;
  date_create: string;
};

export default TProduct;
