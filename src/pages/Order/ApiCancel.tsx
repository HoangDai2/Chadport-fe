import axios from "axios";
import apisphp from "../../Service/api";

// Hàm gọi API để gửi yêu cầu cập nhật đơn hàng
const updateOrder = async (formData: FormData, token: string) => {
    try {
        const response = await apisphp.post(
            "/user/change_status_order",
            formData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            }
        );
        return response.data;
    } catch (error: any) {
        console.error("Error updating order:", error.response?.data || error.message);
        throw error.response?.data || error.message;
    }
};

export default updateOrder;
