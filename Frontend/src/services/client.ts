import axios from "axios";
import { TBook } from "../entities/book";

export const getBook = async () => {
  return await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/book`);
};

export const saveBook = async (book: TBook) => {
  return await axios.post(
    `${import.meta.env.VITE_API_BASE_URL}/api/v1/book`,
    book
  );
};

export const deleteBook = async (isbn: string) => {
  return await axios.delete(
    `${import.meta.env.VITE_API_BASE_URL}/api/v1/book/${isbn}`
  );
};

export const updateBook = async (isbn: string, book: TBook) => {
  return await axios.put(
    `${import.meta.env.VITE_API_BASE_URL}/api/v1/book/${isbn}`,
    book
  );
};

export const performLogin = async (userNameAndPassword: {
  userName: string;
  password: string;
}) => {
  return await axios.post(
    `${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/login`,
    userNameAndPassword
  );
};

// export const createCustomer = async ({
//   userName,
//   password,
// }: {
//   userName: string;
//   password: string;
// }) => {
//   return await axios.post(
//     `${import.meta.env.VITE_API_BASE_URL}/api/v1/customer`,
//     { userName, password }
//   );
// };
