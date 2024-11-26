import React from "react";
import { ToastContainer, toast } from "react-toastify";
import Tcategory from "../../../Types/TCategories";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
type Props = {
  onAddCategory: (category: Tcategory) => Promise<void>;
};

const CategoriesAdd = ({ onAddCategory }: Props) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Tcategory>({});

  const onSubmit = async (data: Tcategory) => {
    try {
      await onAddCategory(data); // Chờ hàm onAddCategory thực hiện
      toast.success("Thêm danh mục sản phẩm thành công!");
      navigate("/admin/categorieslist");
    } catch (error) {
      toast.error("Lỗi khi thêm danh mục!");
      console.error("Lỗi khi thêm danh mục:", error);
    }
  };
  return (
    <>
      <div className="container mt-5">
        <h1 className="mb-4">Add Categories</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row mb-3">
            <label
              htmlFor="name"
              className="col-md-4 col-form-label text-start"
            >
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
            <label
              htmlFor="status"
              className="col-md-4 col-form-label text-start"
            >
              Status
            </label>
            <div className="col-md-8">
              <select
                className="form-control"
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
                {...register("imageURL", { required: true })}
                required
              />
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
    </>
  );
};

export default CategoriesAdd;
