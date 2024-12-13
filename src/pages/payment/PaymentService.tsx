import apisphp from "../../Service/api";
import { getAuthHeaders } from "../token/UserToken";
import PaymentData from "../../Types/TOrder";

export const checkoutPayment = async (payment: PaymentData) => {
  try {
    const header = getAuthHeaders(); // Lấy headers xác thực (ví dụ: token)
    console.log(header);

    const response = await apisphp.post("/user/payment", payment, {
      headers: header,
    });
    console.log("Response from server:", response.data);
    return response.data;
  } catch (error: any) {
    console.error(
      "Error during checkout:",
      error.response?.data || error.message
    );
    throw error;
  }
};
