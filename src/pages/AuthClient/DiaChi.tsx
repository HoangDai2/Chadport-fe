import React, { useState, useCallback } from "react";

const DiaChi = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const apiKey = "LfP7ge6pky0HxgA3JQNe3z1HosOFBnn3V29ZNcLj";

  // Hàm debounce để giảm tần suất gọi API
  const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
  };

  // Hàm xử lý thay đổi input
  const fetchSuggestions = useCallback(
    debounce((value) => {
      if (value.length > 2) {
        setLoading(true);
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
        setSuggestions([]); // Không gợi ý nếu nhập < 3 ký tự
      }
    }, 300),
    []
  );

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value); // Cập nhật giá trị input
    fetchSuggestions(value); // Gọi hàm gợi ý
  };

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion.description); // Cập nhật input với giá trị được chọn
    setSuggestions([]); // Ẩn danh sách gợi ý sau khi chọn
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex flex-col gap-3">
        <label className="text-gray-600 font-medium">Living Address:</label>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter your address"
          className="border px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
        />
        {loading && <p className="text-gray-500">Loading suggestions...</p>}
        {suggestions.length > 0 && (
          <ul className="border rounded-md bg-white shadow-md mt-2 max-h-48 overflow-auto">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion.description}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default DiaChi;
