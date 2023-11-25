import { useContext, createContext, useEffect, useState } from "react";
import http from "../services/http";
import { getMe } from "../services/api/user";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getSingleEmployees } from "../services/api/employees";

const authContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("id"));

  const permissions = [0, 1, 2];

  const client = useQueryClient();

  let user;

  if (localStorage.getItem("permissao")) {
    user = useQuery({
      queryKey: ["employee", localStorage.getItem("id")],
      queryFn: getSingleEmployees,
      retry: false,
      refetchInterval: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    });
  } else {
    user = useQuery({
      queryKey: ["me", localStorage.getItem("id")],
      queryFn: getMe,
      onError: () => {
        localStorage.removeItem("id");
        localStorage.removeItem("token");
      },
    });
  }

  useEffect(() => {
    if (localStorage.getItem("id") === "undefined") {
      localStorage.removeItem("id");
    }
    http.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }, [token, localStorage.getItem("id")]);

  async function register(reqData) {
    const { data } = await http.post("api/Usuario/", reqData);
    return data;
  }

  async function login(reqData) {
    const { data } = await http.post("api/Usuario/Autenticacao", reqData);
    localStorage.setItem("id", data.user?.id);
    localStorage.setItem("token", data.jwtToken);
    localStorage.setItem("email", data.user?.email);
    if (permissions.includes(data.user?.permissao)) {
      localStorage.setItem("permissao", data.user?.permissao);
    }
    setToken(data.jwtToken);
    return data;
  }

  async function logout() {
    if (localStorage.getItem("permissao")) {
      client.setQueryData(
        { queryKey: ["employee", localStorage.getItem("id")] },
        null
      );
    } else {
      client.setQueryData(
        { queryKey: ["me", localStorage.getItem("id")] },
        null
      );
    }
    localStorage.removeItem("admin");
    localStorage.removeItem("id");
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("permissao");
  }

  return (
    <authContext.Provider
      value={{
        login,
        register,
        logout,
        authed: !!localStorage.getItem("id") && user.data,
        user: user?.data,
        isLoading: user?.isLoading,
        admin: localStorage.getItem("permissao"),
      }}
    >
      {children}
    </authContext.Provider>
  );
}

export default function useAuth() {
  return useContext(authContext);
}
