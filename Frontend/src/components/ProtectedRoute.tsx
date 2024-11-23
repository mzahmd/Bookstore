import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

interface Props {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: Props) {
  const navigate = useNavigate();
  const { isCustomerAuthenticated } = useAuth();

  useEffect(() => {
    if (!isCustomerAuthenticated()) {
      // TODO: etwas stimmt nicht mit navigate er navigiert nicht nach dem anmelden
      // navigate("/");
      
    }
  }, [isCustomerAuthenticated, navigate]);

  return isCustomerAuthenticated() ? children : <></>;
}
