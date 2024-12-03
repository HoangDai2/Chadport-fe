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
import { productValidationSchema } from "./ValidateProduct";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
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
    watch,
    formState: { errors },
  } = useForm<TProduct>({
    resolver: yupResolver(productValidationSchema),
  });
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
          setValue("total_quatity", data.total_quatity);
          setValue("status", data.status);
          setValue("description", data.description);
          setValue("type", data.type);
          setValue("image_product", data.image_product); // Lấy ảnh chính
          setValue("category_id", data.category_id);

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
    formData.append("total_quatity", data.total_quatity.toString());
    formData.append("status", data.status);
    formData.append("description", data.description);
    formData.append("type", data.type);
    formData.append("category_id", data.category_id.toString());
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
    (
       <div className="p-8 bg-gray-50 min-h-screen flex justify-center">
      <form action="" className="w-[100%]" onSubmit={handleSubmit(onSubmit)}>
        {/* nút thêm sản phẩm */}
        <div className="grid grid-cols-4 grid-rows-1 gap-4 p-4">
          <div className="flex items-center text-black font-bold text-[25px]">
            Update Products
          </div>
          <div className="col-span-2 col-start-4 flex space-x-4">
            <button className="flex items-center border border-gray-300 text-gray-700 py-2 px-4 rounded-full text-sm font-medium">
              Save Draft
            </button>
            <button
              type="submit"
              className="flex items-center bg-black text-white py-2 px-4 rounded-full text-sm font-medium"
            >
              Update Product
            </button>
          </div>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* General Information */}
          <div className="p-6 bg-white rounded-lg text-left">
            <h2 className="text-lg font-semibold mb-5 text-gray-800">
              Thông tin chung
            </h2>
            <div className="mb-5">
              <label className="block text-gray-600 text-sm font-medium mb-1">
                Name Product
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-800 text-sm"
                placeholder="Nhập Name Products"
                {...register("name")}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div className="flex space-x-4 mb-5">
              <div className="flex-1">
                <label className="block text-gray-600 text-sm font-medium mb-1">
                  Title Product
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-800 text-sm"
                  placeholder="Nhập Title Product"
                  {...register("title")}
                />
                {errors.title && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.title.message}
                  </p>
                )}
              </div>
              <div className="flex-1">
                <label className="block text-gray-600 text-sm font-medium mb-1">
                  Status
                </label>
                <select
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-800 text-sm"
                  {...register("status")}
                >
                  <option value="">Chọn trạng thái</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
                {errors.status && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.status.message}
                  </p>
                )}
              </div>
            </div>
            <div className="mb-5">
              <label className="block text-gray-600 text-sm font-medium mb-1">
                Description Product
              </label>
              <textarea
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-800 text-sm"
                rows={4}
                placeholder="Nhập Mô tả sản phẩm"
                {...register("description")}
              ></textarea>
              {errors.description && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>
          </div>

          {/* Upload Image */}
          <div className="p-6 bg-white rounded-lg text-left">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              Upload Img
            </h2>
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
                  {...register("image_product")}
                />
              </div>
              {errors.image_product && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.image_product.message}
                </p>
              )}
            </div>
          </div>

          {/* Giá và Số Lượng */}
          <div className="p-6 bg-white rounded-lg text-left">
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
                  placeholder="Nhập giá cơ bản"
                  {...register("price")}
                />
                {errors.price && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.price.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-gray-600 text-sm font-medium mb-1">
                  Hàng tồn kho
                </label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-800 text-sm"
                  placeholder="Nhập hàng tồn kho"
                  {...register("inventory")}
                />
                {errors.inventory && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.inventory.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-gray-600 text-sm font-medium mb-1">
                  Giảm giá
                </label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-800 text-sm"
                  placeholder="Nhập giảm giá (%)"
                  {...register("price_sale")}
                />
                {errors.price_sale && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.price_sale.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-gray-600 text-sm font-medium mb-1">
                  Số Lượng
                </label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-800 text-sm"
                  placeholder="Nhập số lượng"
                  {...register("total_quatity")}
                />
                {errors.total_quatity && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.total_quatity.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  ))
}

export default ProductUpdate;