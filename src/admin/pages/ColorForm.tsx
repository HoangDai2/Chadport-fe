import React, { useState, useEffect } from "react";
import apisphp from "../../Service/api";
import { Color } from "../../Types/TProduct"; // Import interface Color

const ColorForm = () => {
  const [colors, setColors] = useState<Color[]>([]); // Danh sách màu sắc
  const [formData, setFormData] = useState<Color>({
    name: "",
    image: "",
    date_create: "",
    date_update: "",
  });
  const [isEditing, setIsEditing] = useState(false); // Trạng thái sửa

  // Lấy danh sách màu sắc từ API
  const fetchColors = async () => {
    try {
      const response = await apisphp.get("/colors");
      setColors(response.data.data);
    } catch (error) {
      console.error("Error fetching colors:", error);
    }
  };

  // Thêm màu mới
  const handleAddColor = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if the color name already exists
    const nameExists = colors.some((color) => color.name.toLowerCase() === formData.name.toLowerCase());
    if (nameExists) {
      alert("The color name has already been taken.");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    if (formData.image) {
      formDataToSend.append("image", formData.image); // Only append image if it exists
    }

    try {
      const response = await apisphp.post("/colors", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setColors([...colors, response.data.data]);
      setFormData({ name: "", image: "", date_create: "", date_update: "" });
    } catch (error: any) {
      console.error("Error from server:", error.response?.data || error.message);
    }
  };

  // Cập nhật màu sắc
  const handleUpdateColor = async () => {
    // Kiểm tra nếu trường 'name' không có giá trị
    if (!formData.name) {
      alert("Color name is required");
      return;
    }
  
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    
    if (formData.image) {
      formDataToSend.append("image", formData.image); // Chỉ gửi ảnh nếu có
    }
  
    try {
      const response = await apisphp.put(`/colors/${formData.id}`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      setColors(
        colors.map((color) =>
          color.id === formData.id ? response.data.data : color
        )
      );
      setFormData({ name: "", image: "", date_create: "", date_update: "" });
      setIsEditing(false);
    } catch (error: any) {
      console.error("Error from server:", error.response?.data || error.message);
    }
  };
  
  

  // Xử lý thay đổi ảnh (URL)
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, image: e.target.value });
  };

  const handleEditColor = (color: Color) => {
    setFormData({
      id: color.id,  // Đảm bảo bạn cũng lưu id
      name: color.name,
      image: color.image,  // Cập nhật đúng trường image
      date_create: color.date_create,
      date_update: color.date_update
    });
    setIsEditing(true);
  };
  

  // Xóa màu sắc
  const handleDeleteColor = async (id: number | undefined) => {
    if (!id) return;
    try {
      await apisphp.delete(`/colors/${id}`);
      setColors(colors.filter((color) => color.id !== id));
    } catch (error) {
      console.error("Error deleting color:", error);
    }
  };

  // Xử lý submit form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing) {
      handleUpdateColor(); // Corrected to call update
    } else {
      handleAddColor(e);
    }
  };

  // Lấy danh sách màu sắc khi component được mount
  useEffect(() => {
    fetchColors();
  }, []);

  return (
    <div className="container mt-5">
      <h2>Color Management</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="colorName" className="form-label">
            Color Name
          </label>
          <input
            type="text"
            className="form-control"
            id="colorName"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>

        {/* Trường nhập URL ảnh */}
        <div className="mb-3">
          <label htmlFor="colorImageURL" className="form-label">
            Image URL
          </label>
          <input
            type="text"
            className="form-control"
            id="colorImageURL"
            value={formData.image}
            onChange={handleImageChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          {isEditing ? "Update Color" : "Add Color"}
        </button>
        {isEditing && (
          <button
            type="button"
            className="btn btn-secondary ms-2"
            onClick={() => {
              setFormData({ name: "", image: "", date_create: "", date_update: "" });
              setIsEditing(false);
            }}
          >
            Cancel
          </button>
        )}
      </form>

      <h3 className="mt-4">Color List</h3>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {colors.map((color) => (
            <tr key={color.id}>
              <td>{color.id}</td>
              <td>{color.name}</td>
              <td>
                <img src={color.image} alt={color.name} width={50} height={50} />
              </td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => handleEditColor(color)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDeleteColor(color.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ColorForm;
