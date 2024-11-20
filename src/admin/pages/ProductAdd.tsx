import React, { useState } from "react";
import instance from "../../Service";
import { TProduct } from "../../Types/TProduct";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Tcategory from "../../Types/TCategories";
import { useForm } from "react-hook-form";
import { FaSave, FaCheck } from "react-icons/fa";
import { AiFillProduct } from "react-icons/ai";

type Props = {
  onAdd: (newShoe: TProduct, images: File[], imageProduct: File) => void;
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
  const [categoryImage, setCategoryImage] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: {},
  } = useForm<TProduct>({});

  // Hàm xử lý khi chọn ảnh chính
  const handleImageProductChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      // Kiểm tra xem file có phải là ảnh
      setImageProduct(file);
      setImageProductPreview(URL.createObjectURL(file)); // Xem trước ảnh
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
  const onSubmit = async (data: TProduct) => {
    try {
      await onAdd(data, images, imageProduct!); // Truyền TProduct và images riêng biệt vào onAdd
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  // hàm này lấy dữ liệu ảnh categories
  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedCategoryId = event.target.value;
    const imageUrl = selectedCategoryId
      ? categories.find(
          (category) => category.id === Number(selectedCategoryId)
        )?.imageURL ?? null
      : null;
    setCategoryImage(imageUrl);
    console.log(imageUrl);
  };

  // fake;
  const [activeSize, setActiveSize] = useState(null);

  const handleSizeClick = (size: any) => {
    setActiveSize(size);
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen flex justify-center">
      <form action="" className="w-[100%]" onSubmit={handleSubmit(onSubmit)}>
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
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-800 text-sm"
                placeholder="Nhập Name Products"
                id="name"
                required
                {...register("name", { required: true })}
              />
            </div>

            {/* title */}
            <div className="flex space-x-4 mb-5">
              {/* Ô Title Product */}
              <div className="flex-1">
                <label className="block text-gray-600 text-sm font-medium mb-1">
                  Title Product
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-800 text-sm"
                  placeholder="Nhập Title Product"
                  id="title"
                  {...register("title", { required: true })}
                  required
                />
              </div>

              {/* Ô Status */}
              <div className="flex-1">
                <label className="block text-gray-600 text-sm font-medium mb-1">
                  Status
                </label>
                <select
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-800 text-sm"
                  id="status"
                  {...register("status", { required: true })}
                  required
                >
                  <option value="">Chọn trạng thái</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>

            {/* Description Product */}
            <div className="mb-5">
              <label className="block text-gray-600 text-sm font-medium mb-1">
                Description Product
              </label>
              <textarea
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-800 text-sm"
                rows={4}
                placeholder="Nhập Mô tả sản phẩm"
                id="description"
                {...register("description", { required: true })}
                required
              ></textarea>
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
                  {...register("image_product", { required: true })}
                  onChange={handleImageProductChange}
                  required
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

          {/* giá và số lượng */}
          <div className="p-6 bg-white rounded-lg  text-left">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              Giá và Số Lượng
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-600 text-sm font-medium mb-1">
                  Giá cơ bản
                </label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-800 text-sm"
                  placeholder="77"
                  id="price"
                  {...register("price", { required: true })}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-600 text-sm font-medium mb-1">
                  Hàng tồn kho
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-800 text-sm"
                  placeholder="$47.55"
                />
              </div>

              <div>
                <label className="block text-gray-600 text-sm font-medium mb-1">
                  Giảm giá
                </label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-800 text-sm"
                  placeholder="10%"
                  id="price_sale"
                  {...register("price_sale", { required: true })}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-600 text-sm font-medium mb-1">
                  Số Lượng
                </label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-800 text-sm"
                  placeholder="Chinese New Year Discount"
                  id="quantity"
                  {...register("quantity", { required: true })}
                  required
                />
              </div>
            </div>
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
                {...register("cat_id", { required: true })}
                required
                onChange={handleCategoryChange}
              >
                <option value="">Chọn danh mục</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Hiển thị ảnh của category nếu có */}
            {categoryImage ? (
              <div className="mt-4">
                <img
                  src={categoryImage}
                  alt="Category"
                  className="w-full h-auto"
                />
              </div>
            ) : (
              <div className="mt-4 text-gray-500">No image available</div> // Thông báo khi không có ảnh
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

export default ProductAdd;
