import React, { useState } from "react";
import instance from "../../../Service";
import { Color, Size, TProduct, TVariant } from "../../../Types/TProduct";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Tcategory from "../../../Types/TCategories";
import { useForm } from "react-hook-form";
import { FaSave, FaCheck } from "react-icons/fa";
import { AiFillProduct } from "react-icons/ai";
import VariantForm from "../Variants/VariantsForm";
import VariantsForm from "../Variants/VariantsForm";
import { productValidationSchema } from "./ValidateProduct";
import { Formik, Form, Field, ErrorMessage } from "formik";
type Props = {
  onAdd: (
    newShoe: TProduct,
    images: File[],
    imageProduct: File,
    variant: Array<{ quantity: number; color: string; size: string }>,
    sizes: Size[],
    colors: Color[]
  ) => void;
  categories: Tcategory[];
};
function ProductAdd({ onAdd, categories }: Props) {
  const navigate = useNavigate();
  const [images, setImages] = useState<File[]>([]);
  const [imageProduct, setImageProduct] = useState<File | null>(null); // State cho ảnh chính
  const [imageProductPreview, setImageProductPreview] = useState<string | null>(
    null
  ); // State xem trước ảnh chính
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [variant, setVariant] = useState<
    Array<{ quantity: number; color: string; size: string }>
  >([
    {
      size: "",
      color: "",
      quantity: 0,
    },
  ]);

  const [sizes, setSizes] = useState<Size[]>([]); // Thêm state để lưu sizes
  const [colors, setColors] = useState<Color[]>([]); // Thêm state để lưu colors

  const initialValues: TProduct = {
    id: 0,
    category_id: categoryId ?? 0,
    title: "",
    name: "",
    status: "",
    description: "",
    total_quatity: 0,
    image_product: "",
    image_description: [],
    price: 0,
    price_sale: 0,
    type: "",
    date_create: "",
    date_update: "",
    category: [],
    variants: [],
  };

  // state phần giảm giá
  const [price, setPrice] = useState(0); // Giá ban đầu
  const [discount, setDiscount] = useState(0); // Giảm giá (đơn vị %)
  const [finalPrice, setFinalPrice] = useState(price); // Giá sau giảm

  // Hàm tính giá sau khi giảm giá
  const handleDiscountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const discountValue = Math.floor(parseFloat(e.target.value) || 0); // Đảm bảo giá trị giảm là số nguyên
    setDiscount(discountValue);

    // Kiểm tra nếu giảm giá vượt quá giá gốc
    if (discountValue > price) {
      alert("Giảm giá không thể lớn hơn giá gốc.");
      return;
    }

    // Tính giá sau khi giảm
    const newPrice = price - (price * discountValue) / 100;
    setFinalPrice(Math.floor(newPrice)); // Làm tròn xuống để giá là số nguyên
  };

  // Hàm cập nhật giá gốc
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPrice = Math.floor(parseFloat(e.target.value) || 0); // Đảm bảo giá là số nguyên
    setPrice(newPrice);
    setFinalPrice(newPrice - (newPrice * discount) / 100); // Tính lại giá sau giảm
  };

  // Hàm xử lý khi chọn ảnh chính
  const handleImageProductChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: (field: string, value: any) => void
  ) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      // Kiểm tra xem file có phải là ảnh
      setImageProduct(file);
      setImageProductPreview(URL.createObjectURL(file)); // Xem trước ảnh
      setFieldValue("image_product", file); // Cập nhật giá trị cho Formiks
    } else {
      alert(
        "Vui lòng chọn một file ảnh hợp lệ (JPEG, PNG, JPG, GIF, hoặc WebP)"
      );
    }
  };

  // hàm này xử lí khi chọn ảnh trong input
  const onFileUploadHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (fileList) {
      const files = Array.from(fileList); // Chuyển FileList thành mảng
      setImages((prev) => [...prev, ...files]); // Cập nhật state với tất cả ảnh đã chọn
      const filePreviews = files.map((file) => URL.createObjectURL(file));
      setImagePreviews((prev) => [...prev, ...filePreviews]); // Cập nhật các URL xem trước
    }
  };

  // Hàm xóa ảnh
  const removeImage = (indexToRemove: number) => {
    setImages((prevImages) =>
      prevImages.filter((_, index) => index !== indexToRemove)
    );
    setImagePreviews((prevPreviews) => {
      URL.revokeObjectURL(prevPreviews[indexToRemove]); // Giải phóng URL xem trước khỏi bộ nhớ
      return prevPreviews.filter((_, index) => index !== indexToRemove);
    });
  };

  // Hàm in ảnh ra sau khi chọn
  const renderImagePreviews = () => {
    return imagePreviews.map((preview, index) => (
      <div
        key={index}
        style={{
          position: "relative",
          width: "100%", // Thẻ cha có kích thước cố định, 100% của thẻ chứa
          maxWidth: "90px", // Kích thước tối đa của thẻ chứa ảnh
          height: "90px", // Chiều cao cố định cho ảnh
          padding: "5px",
          overflow: "hidden", // Ẩn phần ảnh bị tràn ra ngoài
          borderRadius: "8px", // Bo góc cho thẻ chứa
        }}
      >
        <i
          className="fa fa-times-circle"
          onClick={() => removeImage(index)}
          style={{
            position: "absolute",
            top: "5px",
            right: "5px", // Căn chỉnh lại vị trí nút xóa
            fontSize: "24px",
            color: "gray",
            cursor: "pointer",
          }}
        ></i>

        <img
          key={index}
          src={preview}
          alt={`Preview ${index}`}
          className="w-full h-full object-cover rounded-lg" // Sử dụng object-cover để ảnh chiếm toàn bộ không gian thẻ
        />
      </div>
    ));
  };

  // Gửi dữ liệu sản phẩm và ảnh lên server
  const handleSubmit = async (data: TProduct) => {
    try {
      // Tính toán giá gốc và giá sau giảm
      const priceValue = Math.floor(price); // Giá gốc
      const priceSaleValue = Math.floor(finalPrice); // Giá sau giảm

      const productData = {
        ...data, // Thêm các thông tin khác của sản phẩm
        price: priceValue,
        price_sale: priceSaleValue,
      };

      await onAdd(productData, images, imageProduct!, variant, sizes, colors); // Truyền cả sản phẩm và biến thể
      toast.success("Thêm sản phẩm thành công!");
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Thêm sản phẩm thất bại!");
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen flex justify-center">
      <Formik
        initialValues={{ ...initialValues, category_id: categoryId ?? 0 }}
        validationSchema={productValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue }) => (
          <Form action="" className="w-[100%]">
            {/* nút thêm sản phẩm */}
            <div className="grid grid-cols-4 grid-rows-1 gap-4 p-4">
              {/* Ô đầu tiên */}
              <div className=" flex items-center text-black font-bold text-[25px]">
                <AiFillProduct className="mr-2  " />
                Add New Product
              </div>

              {/* Ô thứ hai - đặt tại vị trí riêng theo col-start và col-span */}
              <div className="col-span-2 col-start-4 flex space-x-4">
                <button className="flex items-center border border-gray-300 text-gray-700 py-2 px-4 rounded-full text-sm font-medium">
                  <FaSave className="mr-2" />
                  Save Draft
                </button>

                <button className="flex items-center bg-black text-white py-2 px-4 rounded-full text-sm font-medium">
                  <FaCheck className="mr-2" />
                  Add Product
                </button>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* General Information */}
              <div className="p-6 bg-white rounded-lg  text-left">
                <h2 className="text-lg font-semibold mb-5 text-gray-800">
                  Thông tin chung
                </h2>
                {/* Name Product */}
                <div className="mb-5">
                  <label className="block text-gray-600 text-sm font-medium mb-1">
                    Name Product
                  </label>
                  <Field
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-800 text-sm"
                    placeholder="Nhập Name Products"
                    id="name"
                    name="name"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* title */}
                <div className="flex space-x-4 mb-5">
                  {/* Ô Title Product */}
                  <div className="flex-1">
                    <label className="block text-gray-600 text-sm font-medium mb-1">
                      Title Product
                    </label>
                    <Field
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-800 text-sm"
                      placeholder="Nhập Title Product"
                      id="title"
                      name="title"
                    />
                    <ErrorMessage
                      name="title"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  {/* Ô Status */}
                  <div className="flex-1">
                    <label className="block text-gray-600 text-sm font-medium mb-1">
                      Status
                    </label>
                    <Field
                      as="select"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-800 text-sm"
                      id="status"
                      name="status"
                    >
                      <option value="">Chọn trạng thái</option>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </Field>
                    <ErrorMessage
                      name="status"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                </div>

                {/* Description Product */}
                <div className="mb-5">
                  <label className="block text-gray-600 text-sm font-medium mb-1">
                    Description Product
                  </label>
                  <Field
                    as="textarea"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-800 text-sm"
                    rows={4}
                    placeholder="Nhập Mô tả sản phẩm"
                    id="description"
                    name="description"
                  ></Field>
                  <ErrorMessage
                    name="description"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* giá và số lượng */}
                <div className=" bg-white rounded-lg  text-left">
                  <h2 className="text-lg font-semibold mb-4 text-gray-800">
                    Giá và Số Lượng
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    {/* giá gốc */}
                    <div>
                      <label className="block text-gray-600 text-sm font-medium mb-1">
                        Giá cơ bản
                      </label>
                      <Field
                        type="number"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-800 text-sm"
                        placeholder="Nhập giá gốc"
                        id="price"
                        name="price"
                        value={price}
                        onChange={handlePriceChange}
                      />
                      <ErrorMessage
                        name="price"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    {/* hàng tồn kho */}
                    <div>
                      <label className="block text-gray-600 text-sm font-medium mb-1">
                        Hàng tồn kho
                      </label>
                      <Field
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-800 text-sm"
                        placeholder="$47.55"
                        // name="price"
                      />
                      <ErrorMessage
                        name="price"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    {/* giá giảm */}
                    <div>
                      <label className="block text-gray-600 text-sm font-medium mb-1">
                        Giảm giá (%)
                      </label>
                      <Field
                        type="number"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-800 text-sm"
                        placeholder="Nhập phần trăm giảm (%)"
                        id="price_sale"
                        name="price_sale"
                        min={0}
                        max={100}
                        value={discount}
                        onChange={handleDiscountChange}
                      />
                      <ErrorMessage
                        name="price_sale"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                      <div className="mt-[60px]">
                        <label
                          className="block text-gray-600 text-sm  mb-1"
                          style={{ fontWeight: "bold" }}
                        >
                          Giá Được Giảm (VND)
                        </label>
                        <input
                          type="text"
                          value={finalPrice.toLocaleString()} // Hiển thị giá dưới dạng tiền tệ VND
                          disabled
                        />
                      </div>
                    </div>

                    {/* sô lương */}
                    <div>
                      <label className="block text-gray-600 text-sm font-medium mb-1">
                        Số Lượng
                      </label>
                      <Field
                        type="number"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-800 text-sm"
                        placeholder="Chinese New Year Discount"
                        id="total_quatity"
                        name="total_quatity"
                      />
                      <ErrorMessage
                        name="total_quatity"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Upload Image */}
              <div className="p-6 bg-white rounded-lg  text-left">
                <h2 className="text-lg font-semibold mb-4 text-gray-800">
                  Upload Img
                </h2>

                {/* Main Image Display */}
                <div className="mb-4">
                  <div className="w-full h-[26rem] bg-gray-100 rounded-lg flex items-center justify-center relative border-2 border-dashed border-gray-300">
                    {imageProductPreview ? (
                      <img
                        src={imageProductPreview}
                        alt="Selected"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <div className="text-center ">
                        <span className="text-gray-400 text-4xl  ">+</span>
                      </div>
                    )}
                    <input
                      type="file"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      id="image_product"
                      onChange={(e) =>
                        handleImageProductChange(e, setFieldValue)
                      }
                    />
                    <ErrorMessage
                      name="image_product"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                </div>

                {/* Thumbnails */}
                <div className="flex space-x-4">
                  {/* Nút chọn ảnh */}
                  <div className="relative">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={onFileUploadHandle}
                      className="absolute opacity-0 cursor-pointer"
                      id="image_description"
                    />
                    <label
                      htmlFor="image_description"
                      className="flex items-center justify-center w-24 h-24 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer"
                    >
                      <span className="text-gray-400 text-3xl">+</span>
                    </label>
                  </div>

                  {/* Phần hiển thị ảnh */}
                  {renderImagePreviews().map((imageElement, index) => (
                    <div
                      key={index}
                      className="relative w-[90px] h-[90px] bg-gray-100 rounded-lg border border-gray-300 flex items-center justify-center"
                      style={{ padding: "5px" }} // Điều chỉnh khoảng cách trong thẻ chứa
                    >
                      {imageElement}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <VariantsForm
                  variant={variant}
                  setVariantAddress={setVariant}
                  setSizes={setSizes}
                  setColors={setColors}
                />
              </div>

              {/* Category */}
              <div className="p-6 bg-white rounded-lg text-left">
                <h2 className="text-lg font-semibold mb-4 text-gray-800">
                  Category
                </h2>
                <div className="mb-4">
                  <label className="block text-gray-600 text-sm font-medium mb-1">
                    Product Category
                  </label>
                  <select
                    className="form-select"
                    id="category"
                    name="category_id"
                    value={categoryId ?? 0} // Đảm bảo giá trị mặc định là rỗng khi chưa chọn
                    required
                    onChange={(e) => {
                      const newCategoryId = Number(e.target.value);
                      setCategoryId(Number(e.target.value));
                      setFieldValue("category_id", newCategoryId);
                    }}
                  >
                    <option value="">Chọn danh mục</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default ProductAdd;
