import apisphp from "../../Service/api";
import TComments from "../../Types/TComments";
export const postComment = async (data: TComments) => {
  try {
    const response = await apisphp.post(`/add/comments`, data);
    console.log("Response from server:", response.data);
    return response.data.data;
  } catch (error) {
    console.error("Error posting comment:", error);
    throw error;
  }
};
