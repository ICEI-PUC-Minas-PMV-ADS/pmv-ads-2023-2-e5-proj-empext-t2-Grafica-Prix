import React, { useEffect, useState } from "react";
import {
  ContainerActions,
  ContainerDataUser,
  ContainerHeader,
  ContainerSearch,
  Logo,
  ContainerCategories,
  Menu,
} from "./styles";
import { AiOutlineUser, AiOutlineShoppingCart, AiOutlineInstagram, AiFillFacebook, AiOutlineWhatsApp, AiOutlinePhone } from "react-icons/ai";
import Form from "../../../components/common/formComponents";
import logo from "../../../assets/logo-prix-removebg-preview 1.png";
import Container from "../../common/container";
import Dropdown from "../../common/dropdown";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../../common/modal";
import Profile from "../profile";
import useAuth from "../../../context/auth";

export default function Header(props) {
  const { authed, user } = useAuth();
  const [profile, setProfile] = useState(false);
  const [optionAdmin, setOptionAdmin] = useState();

  useEffect(() => {
    if (!authed) {
      setOptionAdmin(true);
    }

    if (authed) {
      if (user?.email !== "lennon@email.com") {
        setOptionAdmin(false);
      }
    }
  }, [authed]);

  const navigate = useNavigate();

  const categories = [
    { name: "Categoria 1" },
    { name: "Categoria 2" },
    { name: "Categoria 3" },
    { name: "Categoria 4" },
    { name: "Categoria 5" },
    { name: "Categoria 6" },
    { name: "Categoria 7" },
  ];

  const itensMenu = [
    {
      title: "Admin",
      url: "/admin/dashboard/",
      hidden: optionAdmin,
    },
    { title: "Quem somos", url: "" },
    { title: "Contato", url: "" },
  ];

  return (
    <>
      <ContainerHeader>
        <Container
          direction="row"
          padding="5px 20px"
          justifyContent="space-between"
          alignItems="center"
        >
          <Link to="/">
            <Logo src={logo} />
          </Link>
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
            <ContainerDataUser
              onClick={() => {
                if (authed) {
                  setProfile(true);
                } else {
                  navigate("/login");
                }
              }}
            >
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
        <Container direction="row" padding="5px 20px" gap="185px">
          <Dropdown title="Menu" itemsList={itensMenu} />
          <ContainerCategories>
            {categories?.map((category, index) => {
              return <p key={index}>{category.name}</p>;
            })}
          </ContainerCategories>
        </Container>
      </Menu>
      {authed && profile && (
        <Modal setModal={setProfile} width="40%">
          <Profile />
        </Modal>
      )}
    </>
  );
}
