import React, { useState, useEffect } from "react";
import instance from "../../../Service";
import { TProduct } from "../../../Types/TProduct";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import Tcategory from "../../../Types/TCategories";
import { useForm } from "react-hook-form";
import apisphp from "../../../Service/api";
import { FaSave, FaCheck } from "react-icons/fa";
import { AiFillProduct } from "react-icons/ai";
type Props = {
  onEdit: (product: FormData) => void;
  categories: Tcategory[];
};

function ProductUpdate({ onEdit, categories }: Props) {
  const { id } = useParams<{ id: string }>();
  const [product, setProducts] = useState<TProduct | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [imageProduct, setImageProduct] = useState<File | null>(null); // State cho ảnh chính
  const [imageProductPreview, setImageProductPreview] = useState<string | null>(
    null
  ); // State xem trước ảnh chính
  // sate này để lưu url ảnh
  const [existingImagePreviews, setExistingImagePreviews] = useState<string[]>(
    []
  );

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: {},
  } = useForm<TProduct>({});

  useEffect(() => {
    if (id) {
      (async () => {
        try {
          const { data } = await apisphp.get(`/showdetail/products/${id}`);
          // console.log("Product data:", data);

          setLoading(false);

          // Cập nhật giá trị cho các trường form
          setValue("name", data.name);
          setValue("price", data.price);
          setValue("title", data.title);
          setValue("price_sale", data.price_sale);
          setValue("quantity", data.quantity);
          setValue("status", data.status);
          setValue("description", data.description);
          setValue("type", data.type);
          setValue("image_product", data.image_product); // Lấy ảnh chính
          setValue("cat_id", data.cat_id);

          // Cập nhật ảnh chính preview nếu có
          setImageProductPreview(
            `http://127.0.0.1:8000/storage/${data.image_product}`
          );

          // Lưu ảnh mô tả cũ
          if (data.image_description && Array.isArray(data.image_description)) {
            const imageUrls = data.image_description.map(
              (fileName: string) => `http://127.0.0.1:8000/storage/${fileName}`
            );
            setExistingImagePreviews(imageUrls);
          }
        } catch (error) {
          console.error("Error fetching product:", error);
          toast.error("Error loading product data!");
        }
      })();
    }
  }, [id, setValue]);

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
      setImages((prev) => [...prev, ...files]); // Cập nhật state với ảnh đã chọn

      const filePreviews = files.map((file) => URL.createObjectURL(file)); // Tạo URL xem trước cho ảnh
      setImagePreviews((prev) => [...prev, ...filePreviews]); // Cập nhật các URL xem trước
    }
  };

  // Hàm xóa ảnh
  const removeImage = (indexToRemove: number) => {
    setImages((prevImages) =>
      prevImages.filter((_, index) => index !== indexToRemove)
    );
    setImagePreviews((prevPreviews) => {
      URL.revokeObjectURL(prevPreviews[indexToRemove]); // Giải phóng bộ nhớ
      return prevPreviews.filter((_, index) => index !== indexToRemove);
    });
  };

  // Hàm render cho các ảnh mô tả
  const renderImagePreviews = () => {
    // Hiển thị ảnh mô tả cũ (existingImagePreviews) kết hợp với ảnh mới (imagePreviews)
    const allImages = [...existingImagePreviews, ...imagePreviews];

    return allImages.map((preview, index) => (
      <div
        key={index}
        className="relative w-24 h-24 border-2 border-gray-200 rounded-lg overflow-hidden"
      >
        <i
          className="fa fa-times-circle absolute top-1 right-1 text-xl text-gray-600 cursor-pointer"
          onClick={() => removeImage(index)} // Hàm xóa ảnh
        ></i>
        <img
          src={preview}
          alt={`Preview ${index}`}
          className="object-cover w-full h-full"
        />
      </div>
    ));
  };

  const onSubmit = (data: TProduct) => {
    const formData = new FormData();

    // Append product data to formData
    formData.append("id", id!); // Ensure id is not null
    formData.append("name", data.name);
    formData.append("price", data.price.toString());
    formData.append("title", data.title);
    formData.append("price_sale", data.price_sale.toString());
    formData.append("quantity", data.quantity.toString());
    formData.append("status", data.status);
    formData.append("description", data.description);
    formData.append("type", data.type);
    formData.append("cat_id", data.cat_id.toString());
    // Kiểm tra và thêm ảnh chính (image_product)
    if (imageProduct) {
      formData.append("image_product", imageProduct);
    } else {
      formData.append("image_product", data.image_product); // Nếu không thay đổi ảnh chính, sử dụng ảnh cũ
    }

    // Thêm các ảnh mô tả (cả ảnh mới và ảnh cũ)
    existingImagePreviews.forEach((imageUrl) => {
      formData.append("image_description[]", imageUrl); // Các ảnh cũ
    });

    images.forEach((image) => {
      formData.append("image_description[]", image); // Các ảnh mới
    });

    // Gọi `onEdit` với `FormData`
    onEdit(formData); // Truyền `FormData` thay vì `TProduct`
    toast.success("Product updated successfully!");
    navigate("/admin/products");
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
            Update Products
          </div>

          {/* Ô thứ hai - đặt tại vị trí riêng theo col-start và col-span */}
          <div className="col-span-2 col-start-4 flex space-x-4">
            <button className="flex items-center border border-gray-300 text-gray-700 py-2 px-4 rounded-full text-sm font-medium">
              <FaSave className="mr-2" />
              Save Draft
            </button>

            <button className="flex items-center bg-black text-white py-2 px-4 rounded-full text-sm font-medium">
              <FaCheck className="mr-2" />
              Update Product
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
            {/* Size  */}
            <div className="flex items-start justify-between space-x-6">
              {/* Size Section */}
              <div>
                <label className="block text-gray-600 text-sm font-medium mb-1">
                  Size
                </label>
                <p className="text-gray-400 text-xs mb-2">
                  Pick Available Size
                </p>
                <div className="flex space-x-2">
                  {["XS", "S", "M", "XL", "XXL"].map((size, index) => (
                    <button
                      key={index}
                      onClick={() => handleSizeClick(size)}
                      className={`px-4 py-2 border rounded-lg text-sm font-medium cursor-pointer ${
                        activeSize === size
                          ? "bg-black text-white border-green-500"
                          : "bg-gray-100 text-gray-600 border-gray-300"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
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
              <div className="border-2 border-dashed border-gray-300 w-full h-[26rem] bg-gray-100 rounded-lg flex items-center justify-center relative">
                {imageProductPreview ? (
                  <img
                    src={imageProductPreview}
                    alt="Selected"
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <div className="text-center">
                    <span className="text-green-500 text-4xl">+</span>
                  </div>
                )}
                <input
                  type="file"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  id="image_product"
                  {...register("image_product", {
                    required: !imageProductPreview,
                  })}
                  onChange={handleImageProductChange}
                />
              </div>
            </div>

            {/* Thumbnails */}
            <div className="flex space-x-4">
              {/* Nút chọn ảnh mô tả */}
              <div className="relative">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={onFileUploadHandle} // Xử lý ảnh được tải lên
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

              {/* Hiển thị ảnh mô tả */}
              {imagePreviews.length > 0 ? (
                <div className="flex flex-wrap space-x-4">
                  {renderImagePreviews()}{" "}
                  {/* Hiển thị ảnh từ `imagePreviews` */}
                </div>
              ) : (
                <div className="text-center text-gray-400">
                  Không có ảnh nào được chọn
                </div> // Nếu không có ảnh nào
              )}
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
          <div className="p-6 bg-white rounded-lg  text-left">
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
                {...register("cat_id", { required: true })} // Cập nhật danh mục khi chọn
                required
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
      </form>
    </div>
  );
}

export default ProductUpdate;
