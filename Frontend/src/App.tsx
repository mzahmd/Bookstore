import { useEffect, useState } from "react";
import { Wrap, WrapItem } from "@chakra-ui/react";
import Card from "./components/Card";
import SidebarWithHeader from "./components/Sidebar";
import { TBook } from "./entities/book";
import { getBook } from "./services/client";
import DrawerForm from "./components/DrawerForm";
import { errorNotification } from "./components/Notification";

function App() {
  const [books, setBooks] = useState<TBook[] | []>([]);

  const fetchBooks = () =>
    getBook()
      .then((r) => setBooks(r?.data))
      .catch((err) =>
        errorNotification(err.code, `${err.response.data.msg}`)
      );

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <>
      <SidebarWithHeader>
        <DrawerForm fetchBooks={fetchBooks} />
        <Wrap>
          {books.map((book, index) => (
            <WrapItem key={index}>
              <Card {...book} fetchBooks={fetchBooks}/>
            </WrapItem>
          ))}
        </Wrap>
      </SidebarWithHeader>
    </>
  );
}

export default App;
