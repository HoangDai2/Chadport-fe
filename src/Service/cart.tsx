import TProduct from "../Types/TProduct";
import apisphp from "./api";

const createProduct = async (formData: FormData) => {
  try {
    const { data } = await apisphp.post("/add/products", formData, {
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
