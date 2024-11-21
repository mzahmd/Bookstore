import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: Props) {
  const navigate = useNavigate();
  
  const isCustomerAuthenticated = false;

  useEffect(() => {
    if (!isCustomerAuthenticated) {
      navigate("/");
    }
  }, [isCustomerAuthenticated, navigate]);

  return isCustomerAuthenticated ? children : <></>;
}
