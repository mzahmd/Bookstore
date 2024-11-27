import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ChakraProvider, createStandaloneToast } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthProvider from "./context/AuthContext.tsx";
import App from "./pages/Dashboard.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import Login from "./pages/Login.tsx";
import SignUp from "./pages/SignUp.tsx";

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
    path: "signup",
    element: <SignUp />,
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
