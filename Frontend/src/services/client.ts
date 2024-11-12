import axios from "axios";
import { TBook } from "../entities/book";

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

export const saveBook = async (book: TBook) => {
  return await axios.post(
    `${import.meta.env.VITE_API_BASE_URL}/api/v1/book`,
    book
  );
};

export const deleteBook = async (isbn: string) => {
  return await axios.delete(
    `${import.meta.env.VITE_API_BASE_URL}/api/v1/book/${isbn}`,
    getAuthConfig()
  );
};

export const updateBook = async (isbn: string, book: TBook) => {
  return await axios.put(
    `${import.meta.env.VITE_API_BASE_URL}/api/v1/book/${isbn}`,
    book,
    getAuthConfig()
  );
};

export const performLogin = async (userNameAndPassword: {
  userName: string;
  password: string;
}) => {
  return await axios.post(
    `${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/login`,
    userNameAndPassword,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
