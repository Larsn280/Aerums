import { createContext, useEffect, useState } from "react";
import * as api from "../../api/freeTimeApi";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const savedAuth = localStorage.getItem("auth");
    return savedAuth ? JSON.parse(savedAuth) : {};
  });

  useEffect(() => {
    localStorage.setItem("auth", JSON.stringify(auth));
  }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, setAuth, ...api }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
