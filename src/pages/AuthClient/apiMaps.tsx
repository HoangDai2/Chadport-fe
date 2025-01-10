import React, { useState } from "react";

const AddressInput = ({ formik }: any) => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const apiKey = "zvcqGlU5uDKLbJm3CKx8qdXCn4F2BDKl0Qhg5I6G";
  // Hàm xử lý khi người dùng nhập địa chỉ
  const handleInputChange = (e: any) => {
    const value = e.target.value;
    formik.handleChange(e); // Đồng bộ với Formik

    if (value.length > 2) {
      setLoading(true);
      // Gọi API Goong để lấy gợi ý địa chỉ
      fetch(
        `https://rsapi.goong.io/Place/AutoComplete?input=${encodeURIComponent(
          value
        )}&api_key=${apiKey}`
      )
        .then((response) => response.json())
        .then((data) => {
          setSuggestions(data.predictions || []);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching address suggestions:", error);
          setLoading(false);
        });
    } else {
      setSuggestions([]); // Nếu input < 3 ký tự, không gợi ý nữa
    }
  };

  // Hàm xử lý khi người dùng chọn một địa chỉ từ gợi ý
  const handleSelectSuggestion = (description: any) => {
    formik.setFieldValue("address", description); // Cập nhật giá trị vào Formik
    setSuggestions([]); // Ẩn gợi ý sau khi chọn
  };

  return (
    <div className="relative">
      <input
        type="text"
        name="address"
        value={formik.values.address}
        onChange={handleInputChange}
        onBlur={formik.handleBlur}
        className={`bg-gray-100 border ${
          formik.touched.address && formik.errors.address
            ? "border-red-500"
            : "border-gray-300"
        } rounded-md px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-black w-full`}
        placeholder="Nhập địa chỉ"
      />
      {/* Hiển thị thông báo khi đang tải gợi ý */}
      {loading && <div className="text-gray-500 text-sm mt-1">Đang tải...</div>}
      {/* Hiển thị danh sách gợi ý địa chỉ */}
      {suggestions.length > 0 && (
        <ul className="absolute bg-white border mt-1 w-full z-10 max-h-60 overflow-y-auto">
          {suggestions.map((item, index) => (
            <li
              key={index}
              onClick={() => handleSelectSuggestion(item.description)} // Chọn địa chỉ khi click
              className="p-2 cursor-pointer text-gray-600 font-medium hover:bg-gray-200"
            >
              {item.description}
            </li>
          ))}
        </ul>
      )}
      {/* Hiển thị lỗi nếu có */}
      {formik.touched.address && formik.errors.address && (
        <div className="text-red-500 text-sm mt-1">{formik.errors.address}</div>
      )}
    </div>
  );
};

export default AddressInput;
