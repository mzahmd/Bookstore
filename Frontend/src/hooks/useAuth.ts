import { useContext } from "react";
import { AuthContext } from "../components/AuthContext";

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("Context is not set");
  }

  // if (!context.customer) {
  //   throw new Error("Customer is not set");
  // }

  if (!context.login) {
    throw new Error("Login is not set");
  }

  return context;
}
