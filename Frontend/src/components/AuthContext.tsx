import React, { createContext, useState } from "react";
import { performLogin } from "../services/client";
import { ICredentials } from "../entities/credentials";
import { ICustomer } from "../entities/customer";

interface IAuthContext {
  customer: ICustomer | null;
  login: (userNameAndPassword: ICredentials) => Promise<unknown>;
  logout: () => void;
}

export const AuthContext = createContext<IAuthContext | null>(null);

interface Props {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: Props) {
  const [customer, setCustomer] = useState<ICustomer | null>(null);

  async function login(userNameAndPassword: ICredentials) {
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

  function logout() {
    localStorage.removeItem("access_token");
    setCustomer(null);
  }

  return (
    <AuthContext.Provider
      value={{
        customer,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
