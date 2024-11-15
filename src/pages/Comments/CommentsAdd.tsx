import apisphp from "../../Service/api";
import TComments from "../../Types/TComments";
export const postComment = async (data: TComments) => {
  try {
    // Lấy token từ localStorage hoặc UserContext
    const token = localStorage.getItem("jwt_token");
    const response = await apisphp.post("/add/comments", data, {
      headers: {
        Authorization: `Bearer ${token}`, // Thêm token vào header
      },
    });
    console.log("Response from server:", response.data);
    return response.data.data;
  } catch (error) {
    console.error("Error posting comment:", error);
    throw error;
  }
};
