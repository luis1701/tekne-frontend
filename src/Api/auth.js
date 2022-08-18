import  { API_PATHS } from "../Config/apiPaths";
import api from "./serverApiConnect";

export const login =  async (user, password) => {
  try {
    const response = await api.post(API_PATHS.auth.login, {user, password});
    return response;
  } catch (error) {
    console.error('error on login', error);
    return null;
  }
}
