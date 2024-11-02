import TProduct from "../Types/TProduct";
import apisphp from "./api";

const createProduct = async (formData: TProduct, images: File[]) => {
  try {
    const dataToSend = new FormData();

    // Thêm các trường từ formData vào FormData
    Object.entries(formData).forEach(([key, value]) => {
      dataToSend.append(key, value);
    });

    // Thêm hình ảnh vào FormData
    if (Array.isArray(images) && images.length > 0) {
      images.forEach((image) => {
        dataToSend.append("image_description", image);
      });
    }

    const { data } = await apisphp.post("/add/products", dataToSend, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return data.data; // Trả về sản phẩm vừa thêm
  } catch (error) {
    console.error("Error in createProduct:", error);
    throw error;
  }
};

export default createProduct;
