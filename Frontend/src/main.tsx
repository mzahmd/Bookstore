import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ChakraProvider, createStandaloneToast } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthProvider from "./components/AuthContext.tsx";
import App from "./App.tsx";
import Login from "./components/Login.tsx";
import ProtectedRoute from "./components/protectedRoute.tsx";

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
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChakraProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
      <ToastContainer />
    </ChakraProvider>
  </StrictMode>
);
