import  { API_PATHS } from "../Config/apiPaths";
import api from "./serverApiConnect";

export const fecthProducts =  async () => {
  try {
    const response = await api.get(API_PATHS.products.getAll);
    return response;
  } catch (error) {
    return error.response;
  }
}

export const deleteProduct =  async (id) => {
  try {
    const response = await api.delete(`${API_PATHS.products.remove}/${id}`);
    return response;
  } catch (error) {
    console.error('error on deleteProduct', error);
    return null;
  }
}
