import axios from "axios";
import { ICustomer } from "../entities/customer";

export const saveCustomer = async (customer: ICustomer) => {
  return await axios.post(
    `${import.meta.env.VITE_API_BASE_URL}/api/v1/customer`,
    JSON.stringify(customer),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
