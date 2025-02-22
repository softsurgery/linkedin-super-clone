import { RegisterPayload } from "@/types";
import axios from "axios";

const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`/api/auth/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error: any) {
    throw error.response?.data || "Login failed";
  }
};

const register = async (payload: RegisterPayload) => {
  const response = await axios.post(`/api/auth/register`, payload);
  return response.data;
};

const logout = async () => {
  try {
    const response = await axios.post(`/api/auth/logout`);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || "Logout failed";
  }
};

const getCurrentUser = async () => {
  try {
    const response = await axios.get(`/api/auth/me`);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || "Failed to fetch user";
  }
};

export const auth = {
  login,
  register,
  logout,
  getCurrentUser,
};
