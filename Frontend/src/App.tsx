import { useEffect, useState } from "react";
import { Wrap, WrapItem } from "@chakra-ui/react";

import Card from "./components/Card";
import CreateDrawerForm from "./components/CreateDrawerForm";
import { errorNotification } from "./components/Notification";
import Sidebar from "./components/Sidebar";
import { getBook } from "./services/client";
import { IBook } from "./entities/book";

export default function App() {
  const [books, setBooks] = useState<IBook[]>([]);

  const fetchBooks = () =>
    getBook()
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
