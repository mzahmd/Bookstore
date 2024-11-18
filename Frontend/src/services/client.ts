import axios from "axios";
import { IBook } from "../entities/book";
import { ICredentials } from "../entities/credentials";

const getAuthConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
  },
});

export const getBook = async () => {
  return await axios.get(
    `${import.meta.env.VITE_API_BASE_URL}/api/v1/book`,
    getAuthConfig()
  );
};

export const saveBook = async (book: IBook) => {
  return await axios.post(
    `${import.meta.env.VITE_API_BASE_URL}/api/v1/book`,
    book,
    getAuthConfig()
  );
};

export const deleteBook = async (isbn: string) => {
  return await axios.delete(
    `${import.meta.env.VITE_API_BASE_URL}/api/v1/book/${isbn}`,
    getAuthConfig()
  );
};

export const updateBook = async (isbn: string, book: IBook) => {
  return await axios.put(
    `${import.meta.env.VITE_API_BASE_URL}/api/v1/book/${isbn}`,
    book,
    getAuthConfig()
  );
};

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
