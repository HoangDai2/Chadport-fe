// Hàm lấy token từ localStorage và trả về headers
export const getAuthHeaders = () => {
  const token = localStorage.getItem("jwt_token");

  if (!token) {
    console.error("Token not found");
    return undefined; // Trả về undefined nếu không tìm thấy token
  }

  return {
    Authorization: `Bearer ${token}`, // Trả về headers nếu có token
  };
};
