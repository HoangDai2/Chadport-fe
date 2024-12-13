import * as Yup from "yup";

export const productValidationSchema = Yup.object({
  name: Yup.string()
    .required("Tên sản phẩm là bắt buộc")
    .max(100, "Tên sản phẩm không được vượt quá 100 ký tự"),
  title: Yup.string()
    .required("Tiêu đề là bắt buộc")
    .max(200, "Tiêu đề không được vượt quá 200 ký tự"),
  status: Yup.string()
    .oneOf(["active", "inactive"], "Trạng thái không hợp lệ")
    .required("Trạng thái là bắt buộc"),
  description: Yup.string()
    .required("Mô tả là bắt buộc")
    .min(10, "Mô tả phải có ít nhất 10 ký tự"),
  price: Yup.number()
    .required("Giá là bắt buộc")
    .min(0, "Giá không thể nhỏ hơn 0"),
  price_sale: Yup.number()
    .min(0, "Giảm giá không thể nhỏ hơn 0")
    .max(100, "Giảm giá không thể vượt quá 100%"),
  total_quatity: Yup.number()
    .required("Số lượng là bắt buộc")
    .min(1, "Số lượng không thể nhỏ hơn 1"),
  category_id: Yup.string().required("Danh mục là bắt buộc"),
  image_product: Yup.mixed().nullable().required("Ảnh chính là bắt buộc"),
  image_description: Yup.mixed().nullable().required("Ảnh mô tả là bắt buộc"),
});
export const variantValidationSchema = Yup.array().of(
  Yup.object().shape({
    size: Yup.string().required("Kích thước không được để trống"),
    color: Yup.string().required("Màu sắc không được để trống"),
    quantity: Yup.number()
      .required("Số lượng không được để trống")
      .min(1, "Số lượng phải lớn hơn 0"),
  })
);
