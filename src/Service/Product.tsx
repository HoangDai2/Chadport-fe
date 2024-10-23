import TProduct from "../Types/TProduct";
import instancs from ".";
const createProduct = async (shoe: TProduct) => {
  try {
    console.log("Sending data:", shoe);
    const { data } = await instancs.post("/products", shoe);
    return data.data;
  } catch (error) {
    console.log(error);
  }
};
export default createProduct;
