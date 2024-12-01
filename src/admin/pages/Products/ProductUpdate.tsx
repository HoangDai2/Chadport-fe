import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { FaSave, FaCheck } from "react-icons/fa";
import { AiFillProduct } from "react-icons/ai";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

import apisphp from "../../../Service/api";
import { TProduct, Size, Color, TVariant } from "../../../Types/TProduct";
import Tcategory from "../../../Types/TCategories";
import VariantsForm from "../Variants/VariantsForm";

type Props = {
  onEdit?: (product: FormData) => void;
  categories: Tcategory[];
};

function ProductUpdate({ onEdit, categories }: Props) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [product, setProduct] = useState<TProduct | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [imageProduct, setImageProduct] = useState<File | null>(null);
  const [imageProductPreview, setImageProductPreview] = useState<string | null>(null);
  const [existingImagePreviews, setExistingImagePreviews] = useState<string[]>([]);

  // Variant and size/color states
  const [variant, setVariant] = useState<TVariant[]>([]);
  const [sizes, setSizes] = useState<Size[]>([]);
  const [colors, setColors] = useState<Color[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TProduct>();

  useEffect(() => {
    if (id) {
      fetchProductDetails();
    }
  }, [id]);

  const fetchProductDetails = async () => {
    try {
      const { data } = await apisphp.get(`/showdetail/products/${id}`);
      
      // Set product details
      setValue("name", data.name);
      setValue("price", data.price);
      setValue("title", data.title);
      setValue("price_sale", data.price_sale);
      setValue("total_quatity", data.quantity);
      setValue("status", data.status);
      setValue("description", data.description);
      setValue("type", data.type);
      setValue("category_id", data.cat_id);
      setValue("image_product", data.image_product);

      // Set main image preview
      if (data.image_product) {
        setImageProductPreview(`http://127.0.0.1:8000/storage/${data.image_product}`);
      }

      // Set description images
      if (data.image_description && Array.isArray(data.image_description)) {
        const imageUrls = data.image_description.map(
          (fileName: string) => `http://127.0.0.1:8000/storage/${fileName}`
        );
        setExistingImagePreviews(imageUrls);
      }

      // Set variants if available
      if (data.variants) {
        setVariant(data.variants);
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching product:", error);
      toast.error("Error loading product data!");
      setLoading(false);
    }
  };

  // Image handling methods (keep existing methods from previous implementation)
  const handleImageProductChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setImageProduct(file);
      setImageProductPreview(URL.createObjectURL(file));
    } else {
      toast.error("Please select a valid image file");
    }
  };

  const onFileUploadHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (fileList) {
      const files = Array.from(fileList);
      setImages((prev) => [...prev, ...files]);
      const filePreviews = files.map((file) => URL.createObjectURL(file));
      setImagePreviews((prev) => [...prev, ...filePreviews]);
    }
  };

  const removeImage = (indexToRemove: number) => {
    setImages((prevImages) =>
      prevImages.filter((_, index) => index !== indexToRemove)
    );
    setImagePreviews((prevPreviews) => {
      URL.revokeObjectURL(prevPreviews[indexToRemove]);
      return prevPreviews.filter((_, index) => index !== indexToRemove);
    });
  };

  const renderImagePreviews = () => {
    const allImages = [...existingImagePreviews, ...imagePreviews];
    return allImages.map((preview, index) => (
      <div
        key={index}
        className="relative w-24 h-24 border-2 border-gray-200 rounded-lg overflow-hidden"
      >
        <i
          className="fa fa-times-circle absolute top-1 right-1 text-xl text-gray-600 cursor-pointer"
          onClick={() => removeImage(index)}
        ></i>
        <img
          src={preview}
          alt={`Preview ${index}`}
          className="object-cover w-full h-full"
        />
      </div>
    ));
  };

  const onSubmit = async (data: TProduct) => {
    const formData = new FormData();

    // Append product data
    formData.append("id", id!);
    formData.append("name", data.name);
    formData.append("price", data.price.toString());
    formData.append("title", data.title);
    formData.append("price_sale", data.price_sale.toString());
    formData.append("total_quatity", data.total_quatity.toString());
    formData.append("status", data.status);
    formData.append("description", data.description);
    formData.append("type", data.type);
    formData.append("category_id", data.category_id.toString());

    // Handle main product image
    if (imageProduct) {
      formData.append("image_product", imageProduct);
    }

    // Handle description images
    existingImagePreviews.forEach((imageUrl) => {
      formData.append("image_description[]", imageUrl);
    });

    images.forEach((image) => {
      formData.append("image_description[]", image);
    });

    // Handle variants
    if (variant && variant.length > 0) {
      variant.forEach((v, index) => {
        formData.append(`variants[${index}][color_id]`, v.color_id?.toString() || '');
        formData.append(`variants[${index}][size_id]`, v.size_id?.toString() || '');
        formData.append(`variants[${index}][quantity]`, v.quantity.toString());
      });
    }

    try {
      const response = await apisphp.post(`/updateProduct/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (response.data.status === 'success') {
        toast.success("Product updated successfully!");
        navigate("/admin/products");
      } else {
        toast.error("Failed to update product");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("An error occurred while updating the product");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

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
                  {...register("total_quatity", { required: true })}
                  required
                />
              </div>
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
                {...register("category_id", { required: true })} // Cập nhật danh mục khi chọn
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
