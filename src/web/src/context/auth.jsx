import { useContext, createContext, useEffect, useState } from "react";
import http from "../services/http";
import { getMe } from "../services/api/user";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getEmployees, getSingleEmployees } from "../services/api/employees";

const authContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("id"));
  const [userIsEmployee, setUserIsEmployee] = useState();

  const client = useQueryClient();

  const user = useQuery({
    queryKey: ["me", localStorage.getItem("id")],
    queryFn: getMe,
    onError: () => {
      localStorage.removeItem("id");
      localStorage.removeItem("token");
    },
  });

  const employees = useQuery({
    queryKey: ["employees"],
    queryFn: getEmployees,
  });

  const employee = useQuery({
    queryKey: ["employee", localStorage.getItem("id")],
    queryFn: getSingleEmployees,
  });

  useEffect(() => {
    let userFinded = employees.data?.find(
      (x) => x.email === localStorage.getItem("email")
    );
    setUserIsEmployee(userFinded ? true : false);
  }, [localStorage.getItem("email"), employees.data]);

  useEffect(() => {
    if (localStorage.getItem("email") === "admin@gmail.com") {
      localStorage.setItem("admin", "admin@gmail.com");
    }
  }, [localStorage.getItem("email")]);

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
    if (data.user?.permissao) {
      localStorage.setItem("permissao", data.user?.permissao);
    }
    setToken(data.jwtToken);
    client.setQueryData({ queryKey: ["me", null] }, data.user);
    return data;
  }

  async function logout() {
    client.setQueryData({ queryKey: ["me", localStorage.getItem("id")] }, null);
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
        user: userIsEmployee ? employee.data : user?.data,
        isLoading: user?.isLoading,
        admin:
          localStorage.getItem("admin") || localStorage.getItem("permissao"),
      }}
    >
      {children}
    </authContext.Provider>
  );
}

export default function useAuth() {
  return useContext(authContext);
}
