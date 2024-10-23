import React, { useState, useEffect } from "react";
import instance from "../../Service";
import { TProduct } from "../../Types/TProduct";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import Tcategory from "../../Types/TCategories";
import { useForm } from "react-hook-form";
type Props = {
  onEdit: (product: TProduct) => void;
  categories: Tcategory[];
};

function ProductUpdate({ onEdit, categories }: Props) {
  const { id } = useParams<{ id: string }>();
  const [product, setProducts] = useState<TProduct | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { error },
  } = useForm<TProduct>({});

  useEffect(() => {
    if (id) {
      (async () => {
        try {
          const { data } = await instance.get(`/products/${id}`);
          setLoading(false); // Sau khi lấy dữ liệu, đặt loading về false
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
          setValue("cat_id", data.cat_id); // Cập nhật danh mục
        } catch (error) {
          console.error("Error fetching product:", error);
          toast.error("Error loading product data!");
        }
      })();
    }
  }, [id, setValue]);
  const onSubmit = (data: TProduct) => {
    onEdit({ ...data, id: Number(id) }); // Cập nhật sản phẩm
    toast.success("Product updated successfully!");
    navigate("/admin/products"); // Điều hướng sau khi cập nhật thành công
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
              <option value="available">Available</option>
              <option value="out of stock">Out of Stock</option>
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
