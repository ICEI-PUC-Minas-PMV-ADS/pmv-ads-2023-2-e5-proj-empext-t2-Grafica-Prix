import React, { useState } from "react";
import {
  ContainerActions,
  ContainerDataUser,
  ContainerHeader,
  ContainerMainHeader,
  ContainerSearch,
  Logo,
} from "./styles";
import { AiOutlineUser, AiOutlineShoppingCart } from "react-icons/ai";
import Form from "../../../components/common/formComponents";
import logo from "../../../assets/logo-prix-removebg-preview 1.png";
import Container from "../../common/container";

export default function Header(props) {
  return (
    <ContainerHeader>
      <Container
        direction="row"
        padding="5px 20px"
        justifyContent="space-between"
      >
        <Logo src={logo} />
        <ContainerSearch>
          <Form data={{ search: "" }} maxWidth={"700px"} width={"100%"}>
            <Form.Input
              name="search"
              placeHolder={"Buscar por..."}
              maxWidth="700px"
              marginCenter
              search
            />
          </Form>
        </ContainerSearch>
        <ContainerActions>
          <ContainerDataUser>
            <AiOutlineUser color="FF5757" size={35} />
            <p>
              <span>Entre</span> ou <span>cadastre-se</span>{" "}
            </p>
          </ContainerDataUser>
          <AiOutlineShoppingCart color="FF5757" size={35} />
        </ContainerActions>
      </Container>
    </ContainerHeader>
  );
}
