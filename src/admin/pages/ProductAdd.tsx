import React, { useState } from "react";
import instance from "../../Service";
import { TProduct } from "../../Types/TProduct";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Tcategory from "../../Types/TCategories";
import { useForm } from "react-hook-form";
type Props = {
  onAdd: (newShoe: TProduct, images: File[]) => void;
  categories: Tcategory[];
};
function ProductAdd({ onAdd, categories }: Props) {
  const navigate = useNavigate();
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const {
    register,
    handleSubmit,
    formState: { error },
  } = useForm<TProduct>({});

  // hàm này xử lí khi chọn ảnh trong input
  const onFileUploadhandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files; // Lấy FileList
    console.log(fileList);

    if (fileList) {
      // Kiểm tra fileList có phải là null không
      const files = Array.from(fileList); // Chuyển FileList thành mảng
      setImages(files); // Lưu nhiều file vào state

      // Tạo các URL xem trước cho các file
      const filePreviews = files.map((file) => URL.createObjectURL(file));

      // Thiết lập các ảnh xem trước (nếu bạn cần quản lý chúng trong một state riêng)
      setImagePreviews(filePreviews); // Giả sử bạn có một state gọi là imagePreviews để lưu trữ các URL xem trước
    }
  };

  // Hàm xóa ảnh
  const removeImage = (indexToRemove: number) => {
    setImages(
      (prevImages) => prevImages.filter((_, index) => index !== indexToRemove) // Loại bỏ ảnh tại vị trí được chỉ định
    );
  };

  // Hàm in ảnh ra sau khi chọn
  const inImages = () => {
    return images.map((image, index) => (
      <div
        key={index}
        style={{
          position: "relative", // Để đặt biểu tượng "X" ở góc trên phải
          width: "100%",
          padding: "10px",
        }}
      >
        {/* Nút xóa ảnh bằng icon Font Awesome "X" */}
        <i
          className="fa fa-times-circle"
          onClick={() => removeImage(index)} // Xử lý xóa ảnh
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
          src={URL.createObjectURL(image)}
          alt={`Preview ${index}`}
          style={{
            width: "40%",
            height: "100%",
            objectFit: "cover", // Đảm bảo ảnh lấp đầy thẻ cha
          }}
        />
      </div>
    ));
  };

  // Gửi dữ liệu sản phẩm và ảnh lên server
  const onSubmit = async (data: TProduct) => {
    const productData = {
      ...data,
      image_description: images, // Sử dụng mảng hình ảnh trực tiếp
    };

    try {
      await onAdd(productData, images); // Gọi hàm onAdd với dữ liệu sản phẩm
      // navigate("/admin/products"); // Điều hướng sau khi thêm thành công
      // window.location.reload(); // Tải lại trang nếu cần thiết
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Add Product</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row mb-3">
          <label htmlFor="name" className="col-md-4 col-form-label text-start">
            Name
          </label>
          <div className="col-md-8">
            <input
              type="text"
              className="form-control"
              id="name"
              required
              {...register("name", { required: true })}
            />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="title" className="col-md-4 col-form-label text-start">
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
          <label htmlFor="price" className="col-md-4 col-form-label text-start">
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
            className="col-md-4 col-form-label text-start"
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
            className="col-md-4 col-form-label text-start"
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
              <option value="inactive">inactive</option>
              <option value="Active">Active</option>
            </select>
          </div>
        </div>
        <div className="row mb-3">
          <label
            htmlFor="quantity"
            className="col-md-4 col-form-label text-start"
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
            className="col-md-4 col-form-label text-start"
          >
            Description
          </label>
          <div className="col-md-8">
            <textarea
              className="form-control"
              id="description"
              {...register("description", { required: true })}
              required
            />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="type" className="col-md-4 col-form-label text-start">
            Type
          </label>
          <div className="col-md-8">
            <input type="text" className="form-control" id="type" required />
          </div>
        </div>
        <div className="row mb-3">
          <label
            htmlFor="image_product"
            className="col-md-4 col-form-label text-start"
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
              {...register("image_description", { required: true })}
              className="form-control"
              id="image_product"
              onChange={onFileUploadhandle}
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
              {inImages().map((imageElement, index) => (
                <div
                  key={index}
                  style={{
                    flexBasis: "360px",
                    flexGrow: 0,
                    flexShrink: 0,
                    padding: "10px",
                    boxSizing: "border-box",
                  }}
                >
                  {imageElement}{" "}
                </div>
              ))}
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

        <div className="row mb-3">
          <button type="submit" className="btn btn-primary ">
            Add Product
          </button>
        </div>
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

export default ProductAdd;
