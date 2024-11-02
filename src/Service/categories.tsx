import Tcategory from "../Types/TCategories";
import apisphp from "./api";
const createCategory = async (category: Tcategory) => {
  try {
    console.log("Sending data:", category);
    const { data } = await apisphp.post("/categories", category);
    return data;
  } catch (error) {
    console.log(error);
  }
};
export default createCategory;
