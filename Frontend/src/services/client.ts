import axios from "axios";

export const getCustomer = async () => {
  try {
    return await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/book`);
  } catch (e) {
    console.log(e);
  }
};
