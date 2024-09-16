import axios from "axios";
import { TBook } from "../entities/book";

export const getBook = async () => {
  // try {
  return await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/book`);
  // } catch (e) {
  //   console.log(e);
  // }
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
  );
};
