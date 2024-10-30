import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ChakraProvider, createStandaloneToast } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import Login from "./components/Login.tsx";

const { ToastContainer } = createStandaloneToast();

// const Login = () => <h1>Login page</h1>;

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    // element: <h1>Login page</h1>
    // element: () => <h1>Login page</h1>
  },
  {
    path: "dashboard",
    element: <App />
  }
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChakraProvider>
      <RouterProvider router={router}/>
      <ToastContainer />
    </ChakraProvider>
  </StrictMode>
);
