import Tcategory from "../Types/TCategories";
import instancs from ".";
const createCategory = async (category: Tcategory) => {
  try {
    console.log("Sending data:", category);
    const { data } = await instancs.post("/categories", category);
    return data;
  } catch (error) {
    console.log(error);
  }
};
export default createCategory;
