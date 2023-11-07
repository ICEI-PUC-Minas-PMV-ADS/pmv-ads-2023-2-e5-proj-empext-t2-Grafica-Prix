import { useContext, createContext, useEffect, useState } from "react";
import http from "../services/http";
import { getMe } from "../services/api/user";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const authContext = createContext();

export function AuthProvider({ children }) {
  const user = useQuery({
    queryKey: ["me", localStorage.getItem("id")],
    queryFn: getMe,
  });
  const [token, setToken] = useState();

  const client = useQueryClient();

  useEffect(() => {
    http.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }, [token]);

  async function register(reqData) {
    const { data } = await http.post("api/Usuario/", reqData);
    return data;
  }

  async function login(reqData) {
    const { data } = await http.post("api/Usuario/Autenticacao", reqData);
    localStorage.setItem("id", data.dbusuario?.id);
    localStorage.setItem("token", data.jwtToken);
    setToken(data.jwtToken);
    client.setQueryData({ queryKey: ["me", null] }, data.dbusuario);
    return data;
  }

  async function logout() {
    client.setQueryData({ queryKey: ["me", localStorage.getItem("id")] }, null);
    localStorage.removeItem("id");
    localStorage.removeItem("token");
  }

  return (
    <authContext.Provider
      value={{
        login,
        register,
        logout,
        authed: !!localStorage.getItem("id"),
        user: user?.data,
        isLoading: user?.isLoading,
      }}
    >
      {children}
    </authContext.Provider>
  );
}

export default function useAuth() {
  return useContext(authContext);
}
