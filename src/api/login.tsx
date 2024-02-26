import { API_BASE } from "../constants/Constants";
import axios from "axios";
export const login = async (userData: any) => {
  try {
    const response = await axios.post(`${API_BASE}/api/login`, userData);
    return response;
  } catch (error) {
    console.error("Error during login:", error);
    return error;
  }
};
