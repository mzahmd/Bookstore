import { createContext, useContext, useEffect, useState } from "react";
import { createCustomer } from "../services/client";

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [customer, setCustomer] = useState(null);

  const login = async (userName: string, password: string) => {
    return new Promise((resolve, reject) => {
      createCustomer({ userName, password })
        .then((res) => {
          // TODO: save the token
          const jwtToken = res.headers["authorization"];
          setCustomer({
            ...res.data.customerDTO,
          });
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  return (
    <AuthContext.Provider
      value={{
        customer,
        createCustomer,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
