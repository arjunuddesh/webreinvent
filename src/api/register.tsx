import { API_BASE } from "../constants/Constants";
import axios from "axios";
export const register = async (userData: any) => {
  try {
    const response = await axios.post(`${API_BASE}/api/register`, userData);
    return response;
  } catch (error) {
    console.error("Error during login:", error);
    return error;
  }
};
