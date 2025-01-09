import React, { useState, useEffect } from "react";
import instance from "../../../Service";
import { Color, Size, TProduct } from "../../../Types/TProduct";
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
import "../../style/Product.css";
import { on } from "events";
import VariantsForm from "../Variants/VariantsForm";
import VariantsProUpdate from "../Variants/VariantsProUpdate";
import VariantsProCreat from "../Variants/VariantsProCreat";
import { number } from "yup";
import { Field } from "formik";
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
  const [variants, setVariants] = useState<
    Array<{ id: number; quantity: number; color: string; size: string }>
  >([
    {
      id: 0,
      size: "",
      color: "",
      quantity: 0,
    },
  ]);
  const [imageProduct, setImageProduct] = useState<File | null>(null); // State cho ảnh chính
  const [imageProductPreview, setImageProductPreview] = useState<string | null>(
    null
  ); // State xem trước ảnh chính
  // sate này để lưu url ảnh
  const [existingImagePreviews, setExistingImagePreviews] = useState<string[]>(
    []
  );
  const [selectedVariant, setSelectedVariant] = useState(null);

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

  const [sizes, setSizes] = useState<Size[]>([]); // Thêm state để lưu sizes
  const [colors, setColors] = useState<Color[]>([]); // Thêm state để lưu colors
  // console.log(variant);
  useEffect(() => {
    if (id) {
      (async () => {
        try {
          const { data } = await apisphp.get(`/showdetail/products/${id}`);
          const res = await apisphp.get(`/productsvariants/${id}`);
          // console.log("Product data:", data);
          // console.log("varisan:", res.data);
          setVariants(res.data.variants);

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

          const imageDescriptions = JSON.parse(data.image_description);
          console.log(imageDescriptions);
          // console.log(imageDescriptions);
          if (Array.isArray(imageDescriptions)) {
            const imageUrls = imageDescriptions.map((fileName: string) => {
              return `${fileName}`;
            });
            // console.log(imageUrls);
            setExistingImagePreviews(imageUrls);
          }
          // ok
        } catch (error) {
          console.error("Error fetching product:", error);
          toast.error("Error loading product data!");
        }
      })();
    }
  }, [id, setValue]);

  // console.log(variants);

  // Hàm xử lý khi chọn ảnh chính
  const handleImageProductChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    // console.log(file);
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
    // console.log(fileList);
    if (fileList) {
      const files = Array.from(fileList); // Chuyển FileList thành mảng
      console.log(files);
      setImages((prev) => [...prev, ...files]); // Cập nhật state với ảnh đã chọn
      // console.log(images);
      const filePreviews = files.map((file) => URL.createObjectURL(file)); // Tạo URL xem trước cho ảnh
      setImagePreviews((prev) => [...prev, ...filePreviews]); // Cập nhật các URL xem trước
    }
  };

  const removeImage = (index: number, isExisting: boolean) => {
    if (isExisting) {
      setExistingImagePreviews((prev) => prev.filter((_, i) => i !== index));
      // console.log(existingImagePreviews);
      setImages((prev) => prev.filter((_, i) => i !== index));
      setImagePreviews((prev) => prev.filter((_, i) => i !== index));
    } else {
      setImages((prev) => prev.filter((_, i) => i !== index));
      setImagePreviews((prev) => prev.filter((_, i) => i !== index));
    }
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
          onClick={() =>
            removeImage(index, index < existingImagePreviews.length)
          } // Hàm xóa ảnh
        ></i>
        <img
          src={
            index < existingImagePreviews.length
              ? `http://127.0.0.1:8000/storage/${preview}`
              : preview
          }
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
    }

    // Lọc và chỉ lấy tên ảnh từ URL nếu cần
    // const getFileNameFromUrl = (url: string) => {
    //   return url.split("/").pop() || ""; // Lấy tên file từ URL
    // };

    // Kiểm tra và thêm các ảnh cũ vào FormData
    if (existingImagePreviews && existingImagePreviews.length > 0) {
      // const existingImages = existingImagePreviews.map(getFileNameFromUrl); // Lọc tên ảnh từ URL
      // console.log("Ảnh cũ: ", existingImages); // Debug ảnh cũ để kiểm tra
      existingImagePreviews.forEach((imageUrl) => {
        formData.append("image_description[]", imageUrl); // Thêm ảnh cũ vào mảng
      });
    }

    // Kiểm tra và thêm các ảnh mới vào FormData
    if (images && images.length > 0) {
      console.log("Ảnh mới: ", images); // Debug ảnh mới để kiểm tra
      images.forEach((image) => {
        formData.append("image_description[]", image); // Thêm ảnh mới vào mảng
      });
    }

    // Debug nội dung formData trước khi gửi
    for (let pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }

    // Gọi `onEdit` với `FormData`
    toast.success("Product updated successfully!");
    onEdit(formData); // Truyền `FormData` thay vì `TProduct`
    navigate("/admin/products");
    setTimeout(() => {
      navigate("/admin/products");
    }, 1000);
  };

  // console.log(errors);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseSizes = await apisphp.get("/sizes");
        const responseColors = await apisphp.get("/colors");
        setSizes(responseSizes.data.data);
        setColors(responseColors.data.data);
        // console.log(responseSizes.data.data);
        // console.log(responseColors.data.data);
      } catch (error) {
        console.error("Error fetching sizes and colors:", error);
      }
    };
    fetchData();
  }, []);
  const handleEdit = (variant: any) => {
    setSelectedVariant(variant);
    // console.log("variant", variant);
  };
  const handleSave = async () => {
    // console.log("Saving variant:", selectedVariant);

    if (selectedVariant) {
      if (!selectedVariant.color_id) {
        toast.error("Cần chọn màu");
        return;
      }

      if (!selectedVariant.size_id) {
        toast.error("Cần chọn kích cỡ");
        return;
      }

      if (selectedVariant.quantity === 0 || selectedVariant.quantity < 1) {
        toast.error("Cần nhập số lượng lớn hơn 0");
        return;
      }
      try {
        const response = await apisphp.put(
          `/variants/${selectedVariant.id}`,
          selectedVariant
        );

        if (response.data) {
          const res = await apisphp.get(`/productsvariants/${id}`);
          toast.success("Cập nhật thành công");
          setVariants(res.data.variants);
          setSelectedVariant(null);
          // Log kết quả để kiểm tra
          console.log("Updated variant:", response.data);
        }
      } catch (error) {
        console.error("Error saving variant:", error);
      }
    }
  };
  // xóa
  const handleDelete = async (id: number) => {
    try {
      // Gọi API để xóa variant
      const response = await apisphp.delete(`/variants/${id}`);

      toast.success("Xóa  thành công!");
      if (response.status === 200) {
        // Xóa thành công, cập nhật lại state variants

        // Cập nhật lại state của variants và variantAddress
        setVariants((prev) => {
          const updated = prev.filter((variant) => variant.id !== id);
          // setVariants(updated); // Cập nhật lại các biến thể trong variantAddress
          return updated; // Cập nhật lại state variants
        });
      } else {
        toast.error("Xóa không thành công.");
      }
    } catch (error) {
      console.error("Lỗi khi xóa biến thể:", error);
      toast.error("Đã xảy ra lỗi khi xóa biến thể.");
    }
  };
  const handleAddVariant = async () => {
    const res = await apisphp.get(`/productsvariants/${id}`);
    setVariants(res.data.variants);
  };
  const selectedVariantCancel = async () => {
    setSelectedVariant(null);
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen  justify-center">
      <form action="" className="w-[100%]" onSubmit={handleSubmit(onSubmit)}>
        {/* nút thêm sản phẩm */}
        <div className="grid grid-cutoms grid-cols-4 grid-rows-1  gap-4 p-4">
          <div className="flex items-center text-black font-bold text-[25px]">
            Update Products
          </div>
          <div className="col-span-2 justify-end mr-3 col-start-4 flex space-x-4">
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

        <div
          className="w-full grid  gap-8"
          style={{
            gridTemplateColumns: `repeat(var(--x-columns, 2), 1fr)`,
          }}
        >
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
            {/* giá và số lượng */}
            <div className="mb-5">
              <h2 className="text-lg font-semibold mb-4 text-gray-800">
                Giá và Số Lượng
              </h2>
              <div className=" gap-4 grid-cutoms ">
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
                    Giám giá
                  </label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-800 text-sm"
                    placeholder="Nhập giá cơ bản"
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
                  onChange={(e) => handleImageProductChange(e, setValue)}
                />
              </div>
              {errors.image_product && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.image_product.message}
                </p>
              )}
            </div>
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

          {/* Giá và Số Lượng */}
        </div>
      </form>
      <VariantsProCreat
        productId={id}
        setVariantAddress={handleAddVariant}
        setSizes={setSizes}
        setColors={setColors}
      />
      <h2 className="text-left font-semibold mb-4 text-gray-800 mt-2"></h2>
      <div className="relative  shadow-md sm:rounded-lg  font-semibold mt-4 text-gray-800 ">
        <div className="flex items-center text-black font-bold mb-3 text-[25px]">
          Update Variants
        </div>

        <table className="w-full text-sm text-left rtl:text-right  text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="p-4">
                <div className="flex items-center">stt</div>
              </th>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Color
              </th>
              <th scope="col" className="px-6 py-3">
                size
              </th>
              <th scope="col" className="px-6 py-3">
                Quantity
              </th>
              <th scope="col" className="px-6 py-3">
                action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700">
            {variants.map((item, index) => (
              // console.log(item),
              <tr
                key={index}
                className="hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="p-4">{index + 1}</td>
                <td className="px-6 py-4">{item.id}</td>
                <td className="px-6 py-4">
                  <div
                    style={{
                      backgroundColor: item.color,
                      width: "20px",
                      height: "20px",
                      borderRadius: "50%",
                      display: "inline-block",
                      border: "1px solid #ccc",
                    }}
                  ></div>
                </td>
                <td className="px-6 py-4">{item.size}</td>
                <td className="px-6 py-4">{item.quantity}</td>

                <td className="p-4">
                  <button
                    className="font-medium btn btn-primary text-sm px-2 py-2 text-blue-600 dark:text-blue-500 hover:underline"
                    onClick={() => handleEdit(item)}
                  >
                    Edit
                  </button>
                  <button
                    className="font-medium btn btn-info text-sm px-2 py-1 text-red-600 dark:text-red-500 hover:underline ml-2"
                    onClick={() => handleDelete(item.id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {selectedVariant && (
          <div
            className="fixed inset-0 bg-gray-300 bg-opacity-75 flex justify-center items-center"
            onClick={() => setSelectedVariant(null)} // Đóng modal khi click ngoài
          >
            <div
              className="bg-white rounded-md shadow-lg p-6 max-w-2xl w-full relative"
              style={{ left: "10%" }} // Di chuyển modal sang bên phải
              onClick={(e) => e.stopPropagation()} // Ngăn chặn việc đóng modal khi click vào nội dung modal
            >
              <h3 className="text-lg font-medium">Edit Variant</h3>
              <div className="flex space-x-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Color
                  </label>
                  <select
                    value={selectedVariant.color_id || ""}
                    onChange={(e) =>
                      setSelectedVariant({
                        ...selectedVariant,
                        color_id: e.target.value || null, // Nếu không chọn, set là null
                      })
                    }
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value="">Select Color</option>
                    {colors.map((col) => (
                      <option
                        key={col.id}
                        value={col.id}
                        style={{
                          backgroundColor:
                            selectedVariant.color === col.hex
                              ? "#5FAF32"
                              : "transparent",
                        }}
                      >
                        {col.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Size
                  </label>
                  <select
                    value={selectedVariant.size_id || ""}
                    onChange={(e) =>
                      setSelectedVariant({
                        ...selectedVariant,
                        size_id: e.target.value || null, // Nếu không chọn, set là null
                      })
                    }
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value="">Select Size</option>
                    {sizes.map((size) => (
                      <option
                        key={size.id}
                        value={size.id}
                        style={{
                          backgroundColor:
                            selectedVariant.size === size.name
                              ? "#5FAF32"
                              : "transparent",
                        }}
                      >
                        {size.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Quantity
                  </label>
                  <input
                    type="number"
                    value={selectedVariant.quantity}
                    onChange={(e) => {
                      const value = parseInt(e.target.value);
                      if (value > 0) {
                        setSelectedVariant({
                          ...selectedVariant,
                          quantity: value,
                        });
                      }
                    }}
                    min="1"
                    className="mt-1 block w-full py-2 px-1 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>
              <div className="mt-4 justify-center items-center flex space-x-4">
                <button
                  onClick={handleSave}
                  className=" text-white btn  font-bold py-2 px-4 rounded   bg-blue-500"
                >
                  Save
                </button>
                <button
                  onClick={() => selectedVariantCancel()}
                  className="bg-red-500 btn text-white font-bold py-2 px-4 rounded hover:bg-red-700"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductUpdate;
