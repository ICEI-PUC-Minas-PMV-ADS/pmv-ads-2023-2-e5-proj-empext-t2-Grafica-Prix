import React, { useEffect, useState } from "react";
import {
  ContainerActions,
  ContainerDataUser,
  ContainerHeader,
  ContainerSearch,
  Logo,
  ContainerCategories,
  Menu,
  Datauser,
  MenuMobile,
  ContainerActionsMobile,
  ContainerSearchMobile,
  ContainerFixed,
} from "./styles";
import {
  AiOutlineUser,
  AiOutlineShoppingCart,
  AiOutlineMenu,
} from "react-icons/ai";
import Form from "../../../components/common/formComponents";
import logo from "../../../assets/logo-prix-removebg-preview 1.png";
import Container from "../../common/container";
import Dropdown from "../../common/dropdown";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../../common/modal";
import Profile from "../profile";
import useAuth from "../../../context/auth";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../../../services/api/categories";
import Text from "../../common/text";

export default function Header() {
  const { authed, user } = useAuth();
  const [profile, setProfile] = useState(false);
  const [optionAdmin, setOptionAdmin] = useState();
  const [menuMobile, setMenuMobile] = useState(false);

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

  const categories = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

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
    <ContainerFixed>
      <ContainerHeader>
        <Container
          direction="row"
          padding="0 20px"
          justifyContent="space-between"
          alignItems="center"
        >
          <MenuMobile onClick={() => setMenuMobile(true)}>
            <AiOutlineMenu size={30} color="#ff5757" />
          </MenuMobile>
          <Link to="/">
            <Logo src={logo} />
          </Link>
          <ContainerActionsMobile>
            <AiOutlineUser
              color="FF5757"
              cursor="pointer"
              size={30}
              onClick={() => {
                if (authed) {
                  setProfile(true);
                } else {
                  navigate("/login");
                }
              }}
            />
            <AiOutlineShoppingCart color="FF5757" cursor="pointer" size={30} />
          </ContainerActionsMobile>
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
              <AiOutlineUser color="FF5757" size={30} />
              {user ? (
                <Datauser>
                  <Text>
                    <span>Olá,</span>
                  </Text>
                  <Text weight="600" color>
                    {`${user?.name?.split(" ")[0]} ${
                      user?.name?.split(" ").length > 1 &&
                      user?.name?.split(" ")[user?.name?.split(" ").length - 1]
                    }`}
                  </Text>
                </Datauser>
              ) : (
                <Datauser>
                  <Text>
                    <span>Entre</span> ou
                  </Text>
                  <Text>
                    <span>cadastre-se</span>
                  </Text>
                </Datauser>
              )}
            </ContainerDataUser>
            <AiOutlineShoppingCart color="FF5757" size={35} />
          </ContainerActions>
        </Container>
        <ContainerSearchMobile>
          <Form data={{ search: "" }} maxWidth={"700px"} width={"100%"}>
            <Form.Input
              name="search"
              placeHolder={"Buscar por..."}
              maxWidth="700px"
              marginCenter
              search
            />
          </Form>
        </ContainerSearchMobile>
      </ContainerHeader>
      <Menu border="1px solid #E1E1E1">
        <Container direction="row" padding="5px 20px" gap="185px">
          <Dropdown
            title="Menu"
            itemsList={itensMenu}
            icon={<AiOutlineMenu size={20} color="#ff5757" />}
          />
          <ContainerCategories>
            {categories?.data?.map((category) => {
              return (
                <Link to="">
                  <Text key={category.nome} size="14px" cursor="pointer">
                    {category.nome}
                  </Text>
                </Link>
              );
            })}
          </ContainerCategories>
        </Container>
      </Menu>
      {authed && profile && (
        <Modal setModal={setProfile} width="40%">
          <Profile />
        </Modal>
      )}
      {menuMobile && (
        <Modal setModal={setMenuMobile} hidden="800px" width="40%">
          {itensMenu.map((item) => {
            return (
              <Link to={item.url}>
                <Text
                  key={item.title}
                  size="14px"
                  cursor="pointer"
                  weight="600"
                  margin="0 0 10px 0"
                  width="100%"
                  bordeBottom="1px solid #e1e1e1"
                  padding="5px 0"
                >
                  {item.title}
                </Text>
              </Link>
            );
          })}
          {categories?.data?.map((category) => {
            return (
              <Text
                key={category.nome}
                size="14px"
                cursor="pointer"
                weight="600"
                margin="0 0 10px 0"
                width="100%"
                bordeBottom="1px solid #e1e1e1"
                padding="5px 0"
              >
                {category.nome}
              </Text>
            );
          })}
        </Modal>
      )}
    </ContainerFixed>
  );
}
