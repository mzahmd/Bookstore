import { createContext, useContext, useState } from "react";
import { performLogin } from "../services/client";

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [customer, setCustomer] = useState(null);

  const login = async (userNameAndPassword: {
    userName: string;
    password: string;
  }) => {
    return new Promise((resolve, reject) => {
      performLogin(userNameAndPassword)
        .then((res) => {
          // TODO: save the token
          const jwtToken = res.headers["authorization"];
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
  };

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
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
