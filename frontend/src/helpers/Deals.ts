import axios from "axios";

export const BASE_URL = "https://login-9.onrender.com.com";

export const fetchDeals = async (url: string) => {
  try {
    const response = await axios.get(BASE_URL + url);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch deals");
  }
};
