import React from "react";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import Tcategory from "../../Types/TCategories";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import instance from "../../Service";
type Props = {
  onEditCategory: (category: Tcategory) => void;
};

const CategoriesUpadate = ({ onEditCategory }: Props) => {
  const { id } = useParams<{ id: string }>();
  console.log("ID từ URL:", id);
  const navigate = useNavigate();
  const [category, setCategory] = useState<Tcategory | null>(null);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Tcategory>({});

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const { data } = await instance.get(`/categories/${id}`);

          if (data) {
            setCategory(data);
            setValue("name", data.name);
            setValue("status", data.status);
            setValue("imageURL", data.imageURL);
          } else {
            console.error("Không tìm thấy danh mục với ID này.");
          }
        } catch (error) {
          console.error("Lỗi khi lấy dữ liệu danh mục:", error);
        }
      };
      fetchData();
    }
  }, [id, setValue]);

  const onSubmit = (data: Tcategory) => {
    console.log("Dữ liệu danh mục cần cập nhật:", data);

    if (id) {
      onEditCategory({ ...data, id }); // Truyền đúng ID vào đây
      navigate("/admin/categorieslist"); // Điều hướng sau khi chỉnh sửa thành công
    } else {
      console.error("ID danh mục không hợp lệ");
    }
  };

  return (
    <>
      <div className="container mt-5">
        <h1 className="mb-4">Edit Categories</h1>
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
              Edit Danh Mục
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

export default CategoriesUpadate;
