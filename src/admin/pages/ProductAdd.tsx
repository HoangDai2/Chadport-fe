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
  onAdd: (product: TProduct) => void;
  categories: Tcategory[];
};
function ProductAdd({ onAdd, categories }: Props) {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { error },
  } = useForm<TProduct>({});
  const onSubmit = (data: TProduct) => {
    onAdd(data);
    console.log(data);
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
              <option value="available">Available</option>
              <option value="out of stock">Out of Stock</option>
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
