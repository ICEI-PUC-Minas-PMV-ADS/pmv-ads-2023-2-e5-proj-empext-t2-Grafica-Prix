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
    if (localStorage.getItem("id") === "undefined") {
      localStorage.removeItem("id");
    }
    http.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }, [token, localStorage.getItem("id")]);

  useEffect(() => {
    let userFinded = employees.data?.find(
      (x) => x.email === localStorage.getItem("email")
    );
    setUserIsEmployee(userFinded ? true : false);
  }, [localStorage.getItem("email")]);

  console.log(userIsEmployee);

  async function register(reqData) {
    const { data } = await http.post("api/Usuario/", reqData);
    return data;
  }

  async function login(reqData) {
    const { data } = await http.post("api/Usuario/Autenticacao", reqData);
    localStorage.setItem("id", data.user?.id);
    localStorage.setItem("token", data.jwtToken);
    localStorage.setItem("email", data.user?.email);
    setToken(data.jwtToken);
    client.setQueryData({ queryKey: ["me", null] }, data.user);
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
        user: userIsEmployee ? employee.data : user?.data,
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
