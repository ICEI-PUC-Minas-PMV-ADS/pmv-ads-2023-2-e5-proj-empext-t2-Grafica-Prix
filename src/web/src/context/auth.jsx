import { useContext, createContext } from "react";
import http from "../services/http";

const authContext = createContext();

export function AuthProvider({ children }) {
  async function register(reqData) {
    const { data } = await http.post("api/Usuario/", reqData);
  }

  async function login(reqData) {
    const { data } = await http.post("api/Usuario/Autenticacao", reqData);
  }

  async function logout(reqData) {}

  return (
    <authContext.Provider
      value={{
        login,
        register,
      }}
    >
      {children}
    </authContext.Provider>
  );
}

export default function useAuth() {
  return useContext(authContext);
}
