import React, { useState } from "react";
import {
  ContainerActions,
  ContainerDataUser,
  ContainerHeader,
  ContainerSearch,
  Logo,
  ContainerCategories,
  Menu
} from "./styles";
import { AiOutlineUser, AiOutlineShoppingCart } from "react-icons/ai";
import Form from "../../../components/common/formComponents";
import logo from "../../../assets/logo-prix-removebg-preview 1.png";
import Container from "../../common/container";
import Dropdown from "../../common/dropdown";

export default function Header(props) {
  const categories = [
    { name: "Categoria 1" },
    { name: "Categoria 2" },
    { name: "Categoria 3" },
    { name: "Categoria 4" },
    { name: "Categoria 5" },
    { name: "Categoria 6" },
    { name: "Categoria 7" },
    ];
  return (
  <>
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
    <Menu border="1px solid #E1E1E1">
      <Container direction="row">
        <Dropdown title="Menu">
        <p>Admin</p>
        <p>Quem Somos</p>
        <p>Contato</p>
        
        </Dropdown>
        <ContainerCategories>
        {categories?.map((category, index) => {
        return <p key={index}>{category.name}</p>;
        })}
        </ContainerCategories>
    </Container>   
  </Menu>
  </>
  );
}
