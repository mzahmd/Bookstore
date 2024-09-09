import { useEffect } from "react";
import SidebarWithHeader from "./components/Sidebar";
import { getCustomer } from "./services/client";

function App() {
  useEffect(() => {
    getCustomer()
      .then((r) => console.log(r))
      .catch((e) => console.log(e));
  }, []);

  return (
    <>
      <SidebarWithHeader />
    </>
  );
}

export default App;
