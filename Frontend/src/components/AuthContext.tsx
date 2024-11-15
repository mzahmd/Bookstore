import { createContext, useContext, useState } from "react";
import { performLogin } from "../services/client";
import { Credentials } from "../types/Credentials";

const AuthContext = createContext({});

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [customer, setCustomer] = useState(null);

  async function login(userNameAndPassword: Credentials) {
    return new Promise((resolve, reject) => {
      performLogin(userNameAndPassword)
        .then((res) => {
          const jwtToken = res.headers["authorization"];
          localStorage.setItem("access_token", jwtToken);
          console.log(jwtToken);

          setCustomer({
            ...res.data.customerDTO,
          });
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  return (
    <AuthContext.Provider
      value={{
        customer,
        login,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
