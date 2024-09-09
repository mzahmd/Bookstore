import { useEffect, useState } from "react";
import { Wrap, WrapItem } from "@chakra-ui/react";
import Card from "./components/Card";
import SidebarWithHeader from "./components/Sidebar";
import { TBook } from "./entities/book";
import { getCustomer } from "./services/client";

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
        <Wrap>
          {books.map((book) => (
            <WrapItem>
              <Card {...book} />
            </WrapItem>
          ))}
        </Wrap>
      </SidebarWithHeader>
    </>
  );
}

export default App;
