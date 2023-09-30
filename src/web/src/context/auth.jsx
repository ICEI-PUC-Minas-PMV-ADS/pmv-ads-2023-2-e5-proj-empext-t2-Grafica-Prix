import { useContext, createContext, useState } from "react";
import http from "../services/http";
import { getMe } from "../services/api/user";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const authContext = createContext();

export function AuthProvider({ children }) {
  const user = useQuery({
    queryKey: ["me", localStorage.getItem("id")],
    queryFn: getMe,
    retry: false,
    retryOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const client = useQueryClient();

  async function register(reqData) {
    const { data } = await http.post("api/Usuario/", reqData);
  }

  async function login(reqData) {
    const { data } = await http.post("api/Usuario/Autenticacao", reqData);
    localStorage.setItem("id", data.dbusuario?.id);
    localStorage.setItem("token", data.token);
    client.setQueryData({ queryKey: ["me", null] }, data.dbusuario);
    return data;
  }

  async function logout(reqData) {}

  return (
    <authContext.Provider
      value={{
        login,
        register,
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
