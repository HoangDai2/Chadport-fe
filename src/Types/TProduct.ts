type TProduct = {
  pro_id: number; // ID sản phẩm
  cat_id: number; // ID danh mục
  name: string; // Tên sản phẩm
  status: string; // Trạng thái (e.g. "out of stock")
  col_id: number; // ID màu sắc
  size_id: number; // ID kích cỡ
  brand_id: number; // ID thương hiệu
  quantity: number; // Số lượng sản phẩm trong kho
  image_product: string; // URL hình ảnh sản phẩm
  price: number; // Giá gốc
  price_sale: number; // Giá giảm (nếu có)
  type: string; // Loại sản phẩm (e.g. "boots")
  date_create: string; // Ngày tạo sản phẩm (ISO string format)
};

export default TProduct;
