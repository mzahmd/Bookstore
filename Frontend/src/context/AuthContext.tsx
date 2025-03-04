import React, { createContext, useEffect, useState } from "react";
import { ICredentials } from "../entities/credentials";
import { ICustomerToken } from "../entities/customer";
import { jwtDecode } from "jwt-decode";
import { performLogin } from "../services/authClient";
import { ACCESS_TOKEN, AUTHORIZATION } from "../data/constant";

interface IAuthContext {
  customer: ICustomerToken | null;
  login: (userNameAndPassword: ICredentials) => Promise<unknown>;
  logout: () => void;
  isCustomerAuthenticated: () => boolean;
}

export const AuthContext = createContext<IAuthContext | null>(null);

interface Props {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: Props) {
  const [customer, setCustomer] = useState<ICustomerToken | null>(null);

  useEffect(() => {
    let token = localStorage.getItem(ACCESS_TOKEN);

    if (token) {
      token = jwtDecode(token);
      setCustomer({
        username: token && token.sub,
        roles:token && token.scopes,
      });
    }
  }, []);

  async function login(userNameAndPassword: ICredentials) {
    return new Promise((resolve, reject) => {
      performLogin(userNameAndPassword)
        .then((res) => {
          const jwtToken = res.headers[AUTHORIZATION];
          localStorage.setItem(ACCESS_TOKEN, jwtToken);
          console.log(jwtToken);

          const decodedToken = jwtDecode(jwtToken);

          setCustomer({
            username: decodedToken && decodedToken.sub,
            roles: decodedToken && decodedToken.scopes,
          });
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  function logout() {
    localStorage.removeItem(ACCESS_TOKEN);
    setCustomer(null);
  }

  function isCustomerAuthenticated() {
    const token = localStorage.getItem(ACCESS_TOKEN);

    if (!token) {
      return false;
    }

    const { exp: expiration } = jwtDecode(token);

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
        isCustomerAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
