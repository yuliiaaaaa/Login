import axios from 'axios';

export const BASE_URL = 'http://localhost:5000';

export const fetchDeals = async (url: string) => {
  try {
    const response = await axios.get(BASE_URL + url);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch deals');
  }
};
