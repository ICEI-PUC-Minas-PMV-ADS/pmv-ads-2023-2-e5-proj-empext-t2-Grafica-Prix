import React, { useState } from "react";
import ClientLogin from "../../../components/common/forms/clientLogin";
import ClientRegister from "../../../components/common/forms/clientRegister";
import {
  ContainerForm,
  ContainerImage,
  ContainerLogin,
  FormOptions,
  ImageLogin,
  JustifyForm,
  Logo,
  Option,
  TextImage,
  TextOption,
  TitleImage,
} from "./styles";
import image from "../../../assets/image-login-removebg-preview.png";
import logo from "../../../assets/logo-prix-removebg-preview 1.png";
import useAuth from "../../../context/auth";
import { Navigate } from "react-router";
import { Link } from "react-router-dom";

export default function Login(props) {
  const [form, setForm] = useState("login");

  const { authed } = useAuth();

  if (authed) {
    const url = new URL(window.location.href);
    if (url.search.includes("?next=")) {
      window.location.href = url.search.replace("?next=", "");
      return <></>;
    }

    return <Navigate to="/" />;
  } else {
    return (
      <ContainerLogin>
        <ContainerForm>
          <Link to="/">
            <Logo src={logo} />
          </Link>
          <JustifyForm>
            <FormOptions>
              <Option
                border={form === "login"}
                onClick={() => setForm("login")}
              >
                <TextOption selected={form === "login"}>Login</TextOption>
              </Option>
              <Option
                border={form === "register"}
                onClick={() => setForm("register")}
              >
                <TextOption selected={form === "register"}>Cadastro</TextOption>
              </Option>
            </FormOptions>
            {form === "login" ? (
              <ClientLogin width="fit-content" />
            ) : (
              <ClientRegister setForm={setForm} />
            )}
          </JustifyForm>
        </ContainerForm>
        <ContainerImage>
          <TitleImage>Olá, bem-vindo!</TitleImage>
          <TextImage>
            Na nossa plataforma, você encontrará uma variedade de produtos e
            serviços gráficos para atender às suas necessidades criativas e
            profissionais.{" "}
          </TextImage>
          <ImageLogin src={image} />
        </ContainerImage>
      </ContainerLogin>
    );
  }
}
