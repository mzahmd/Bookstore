import { useEffect, useState } from "react";
import { Wrap, WrapItem } from "@chakra-ui/react";

import Card from "../components/Card";
import CreateDrawerForm from "../components/CreateDrawerForm";
import { errorNotification } from "../components/Notification";
import Sidebar from "../components/Sidebar";
import { IBook } from "../entities/book";
import { getBooks } from "../services/bookClient";

export default function Dashboard() {
  const [books, setBooks] = useState<IBook[]>([]);

  const fetchBooks = () =>
    getBooks()
      .then((r) => setBooks(r?.data))
      .catch((err) => errorNotification(err.code, `${err.response.data.msg}`));

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <Sidebar>
      <CreateDrawerForm fetchBooks={fetchBooks} />
      <Wrap>
        {books.map((book, index) => (
          <WrapItem key={index}>
            <Card {...book} fetchBooks={fetchBooks} />
          </WrapItem>
        ))}
      </Wrap>
    </Sidebar>
  );
}
