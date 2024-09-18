import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ChakraProvider, createStandaloneToast } from "@chakra-ui/react";
import App from "./App.tsx";

const { ToastContainer } = createStandaloneToast();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChakraProvider>
      <App />
      <ToastContainer />
    </ChakraProvider>
  </StrictMode>
);
