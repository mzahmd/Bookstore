import axios from "axios";
import { ICredentials } from "../entities/credentials";

export const performLogin = async (userNameAndPassword: ICredentials) => {
  return await axios.post(
    `${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/login`,
    JSON.stringify(userNameAndPassword),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
