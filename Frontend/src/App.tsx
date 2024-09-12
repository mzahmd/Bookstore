import { useEffect, useState } from "react";
import { Wrap, WrapItem } from "@chakra-ui/react";
import Card from "./components/Card";
import SidebarWithHeader from "./components/Sidebar";
import { TBook } from "./entities/book";
import { getCustomer } from "./services/client";
import DrawerForm from "./components/DrawerForm";

function App() {
  const [books, setBooks] = useState<TBook[] | []>([]);

  useEffect(() => {
    getCustomer()
      .then((r) => setBooks(r?.data))
      .catch((e) => console.log(e));
  }, []);

  return (
    <>
      <SidebarWithHeader>
        <DrawerForm />
        <Wrap>
          {books.map((book, index) => (
            <WrapItem key={index}>
              <Card {...book} />
            </WrapItem>
          ))}
        </Wrap>
      </SidebarWithHeader>
    </>
  );
}

export default App;
