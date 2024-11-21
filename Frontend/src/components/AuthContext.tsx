import React, { createContext, useEffect, useState } from "react";
import { performLogin } from "../services/client";
import { ICredentials } from "../entities/credentials";
import { ICustomer } from "../entities/customer";
import { jwtDecode } from "jwt-decode";

interface IAuthContext {
  customer: ICustomer | null;
  login: (userNameAndPassword: ICredentials) => Promise<unknown>;
  logout: () => void;
  isCustomerAuthenticated: () => boolean
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

  function isCustomerAuthenticated() {
    const token = localStorage.getItem("acces_token");

    if (!token) {
      return false;
    }

    const {exp: expiration} = jwtDecode(token);
    console.log(expiration);

    if (expiration && Date.now() > expiration * 1000) {
      logout();
      return false;
    }

    return true;
  }

  return (
    <AuthContext.Provider
      value={{
        customer,
        login,
        logout,
        isCustomerAuthenticated
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
