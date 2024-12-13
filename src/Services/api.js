import axios from "axios";
import Cookies from "js-cookie";
import { data } from "react-router-dom";

const jwtToken = Cookies.get("jwt_token");

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    Authorization: `Bearer ${jwtToken}`,
  },
});

export const login = async (username, password) => {
  try {
    const response = await api.post("/admin/login", { username, password });
    return response.data;
  } catch (error) {
    return error?.response?.data || "somthing wend worng";
  }
};

export const uploadFile = async (formData, jwtToken) => {
  try {
    const response = await api.post("/file/upload", formData, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return { message: response.data.message, success: true };
  } catch (error) {
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "An unexpected error occurred during file upload.",
    };
  }
};

export const getImages = async (currentPage, itemsPerPage) => {
  try {
    const response = await api.get("/file/images", {
      params: { page: currentPage, limit: itemsPerPage },
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });

    return { images: response.data.images };
  } catch (error) {
    return error.response?.data?.message || "Error getting data";
  }
};

export const deleteFile = async (serialNumber) => {
  try {
    const response = await api.delete("/file/images", {
      data: { serialNumber },
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });
    return { success: true, message: response.data.message };
  } catch (error) {
    return error?.response?.message || "File delete Failed";
  }
};

export const getImageByNumber = async (serialNumber) => {
  try {
    const response = await api.post("/file/images", {
      serialNumber,
    });
    return response.data;
  } catch (error) {
    return error?.response?.message || "File not found";
  }
};