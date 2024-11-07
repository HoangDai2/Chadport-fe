import React, { useState, useEffect } from "react";
import instance from "../../Service";
import { TProduct } from "../../Types/TProduct";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import Tcategory from "../../Types/TCategories";
import { useForm } from "react-hook-form";
import apisphp from "../../Service/api";
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
          console.log("Product data:", data);

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
          setValue("image_product", data.image_product);
          setValue("cat_id", data.cat_id);

          // Xây dựng URL đầy đủ cho từng ảnh trong image_description
          if (data.image_description && Array.isArray(data.image_description)) {
            const imageUrls = data.image_description.map(
              (fileName: string) => `http://127.0.0.1:8000/storage/${fileName}`
            );
            setExistingImagePreviews(imageUrls);
            console.log("Image URLs:", imageUrls);
          }
        } catch (error) {
          console.error("Error fetching product:", error);
          toast.error("Error loading product data!");
        }
      })();
    }
  }, [id, setValue]);

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
    return (
      <>
        {/* Hiển thị ảnh từ image_description hiện tại */}
        {existingImagePreviews.map((preview, index) => (
          <div
            key={`existing-${index}`}
            style={{ position: "relative", width: "100%", padding: "10px" }}
          >
            <img
              src={preview}
              alt={`Existing Description Preview ${index}`}
              style={{ width: "40%", height: "100%", objectFit: "cover" }}
            />
          </div>
        ))}

        {/* Hiển thị ảnh mới được chọn */}
        {imagePreviews.map((preview, index) => (
          <div
            key={`new-${index}`}
            style={{ position: "relative", width: "100%", padding: "10px" }}
          >
            <i
              className="fa fa-times-circle"
              onClick={() => removeImage(index)}
              style={{
                position: "absolute",
                top: "5px",
                right: "196px",
                fontSize: "24px",
                color: "gray",
                cursor: "pointer",
              }}
            ></i>
            <img
              src={preview}
              alt={`New Preview ${index}`}
              style={{ width: "40%", height: "100%", objectFit: "cover" }}
            />
          </div>
        ))}
      </>
    );
  };

  const onSubmit = (data: TProduct) => {
    const formData = new FormData();

    // Thêm ID sản phẩm
    if (id) formData.append("id", id);

    // Thêm các trường khác từ `data` vào formData
    formData.append("name", data.name);
    formData.append("price", data.price.toString());
    formData.append("title", data.title);
    formData.append("price_sale", data.price_sale.toString());
    formData.append("quantity", data.quantity.toString());
    formData.append("status", data.status);
    formData.append("description", data.description);
    formData.append("type", data.type);
    formData.append("image_product", data.image_product);
    formData.append("cat_id", data.cat_id.toString());

    // Thêm các file ảnh từ `images`
    images.forEach((image, index) => {
      formData.append(`image_description[${index}]`, image);
    });

    // Gọi `onEdit` với `FormData`
    onEdit(formData); // Truyền `FormData` thay vì `TProduct`
    toast.success("Product updated successfully!");
    navigate("/admin/products");
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Update Product</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row mb-3">
          <label htmlFor="name" className="text-start col-md-4 col-form-label">
            Name
          </label>
          <div className="col-md-8">
            <input
              type="text"
              className="form-control"
              id="name"
              {...register("name", { required: true })}
              required
            />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="title" className="text-start col-md-4 col-form-label">
            Title
          </label>
          <div className="col-md-8">
            <input
              type="text"
              className="form-control"
              id="title"
              {...register("title", { required: true })}
              required
            />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="price" className="text-start col-md-4 col-form-label">
            Price
          </label>
          <div className="col-md-8">
            <input
              type="number"
              className="form-control"
              id="price"
              {...register("price", { required: true })}
              required
            />
          </div>
        </div>
        <div className="row mb-3">
          <label
            htmlFor="price_sale"
            className="text-start col-md-4 col-form-label"
          >
            Price Sale
          </label>
          <div className="col-md-8">
            <input
              type="number"
              className="form-control"
              id="price_sale"
              {...register("price_sale", { required: true })}
              required
            />
          </div>
        </div>
        <div className="row mb-3">
          <label
            htmlFor="status"
            className="text-start col-md-4 col-form-label"
          >
            Status
          </label>
          <div className="col-md-8">
            <select
              className="form-select"
              id="status"
              {...register("status", { required: true })}
              required
            >
              <option value="inavtive">inavtive</option>
              <option value="active">active</option>
            </select>
          </div>
        </div>
        <div className="row mb-3">
          <label
            htmlFor="quantity"
            className="text-start col-md-4 col-form-label"
          >
            Quantity
          </label>
          <div className="col-md-8">
            <input
              type="number"
              className="form-control"
              id="quantity"
              {...register("quantity", { required: true })}
              required
            />
          </div>
        </div>
        <div className="row mb-3">
          <label
            htmlFor="description"
            className=" text-start col-md-4 col-form-label"
          >
            Description
          </label>
          <div className="col-md-8">
            <textarea
              className="form-control"
              {...register("description", { required: true })}
              required
            />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="type" className=" text-start col-md-4 col-form-label">
            Type
          </label>
          <div className="col-md-8">
            <input
              type="text"
              className="form-control"
              id="type"
              {...register("type", { required: true })}
              required
            />
          </div>
        </div>
        <div className="row mb-3">
          <label
            htmlFor="image_product"
            className=" text-start col-md-4 col-form-label"
          >
            Image URL
          </label>
          <div className="col-md-8">
            <input
              type="text"
              className="form-control"
              id="image_product"
              {...register("image_product", { required: true })}
              required
            />
          </div>
        </div>

        <div className="row mb-3">
          <label
            htmlFor="image_product"
            className="col-md-4 col-form-label text-start"
          >
            Image Description
          </label>
          <div className="col-md-8">
            <input
              type="file"
              multiple
              accept="image/*"
              className="form-control"
              id="image_description"
              onChange={onFileUploadHandle}
            />
            <div
              className="row"
              style={{
                padding: "25px",
                display: "flex",
                flexWrap: "wrap",
                gap: "10px",
              }}
            >
              {renderImagePreviews()}
            </div>
          </div>
        </div>

        <div className="row mb-3">
          <label
            htmlFor="category"
            className="col-md-4 col-form-label text-start"
          >
            Select Category
          </label>
          <div className="col-md-8">
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
        <button type="submit" className="btn btn-primary">
          Update Product
        </button>
      </form>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default ProductUpdate;
