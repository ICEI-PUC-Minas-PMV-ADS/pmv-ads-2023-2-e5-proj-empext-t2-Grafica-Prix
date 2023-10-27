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
  ButtonSearch,
} from "./styles";
import {
  AiOutlineUser,
  AiOutlineShoppingCart,
  AiOutlineMenu,
  AiOutlineSearch,
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
import { ContainerLogo } from "./styles";
import { getProducts } from "../../../services/api/products";

export default function Header() {
  const { authed, user } = useAuth();
  const [profile, setProfile] = useState(false);
  const [optionAdmin, setOptionAdmin] = useState();
  const [menuMobile, setMenuMobile] = useState(false);
  const [itemsSearch, setItemsSearch] = useState();

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

  const products = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  useEffect(() => {
    let data = products.data?.map((item) => {
      return {
        label: item?.nome,
        value: item?.nome,
      };
    });
    setItemsSearch(data);
  }, [products.data]);

  function handleSearch(value) {
    if (value) {
      navigate("/search", {
        state: {
          search_result: value?.search,
        },
      });
    }
  }

  const itensMenu = [
    {
      title: "Admin",
      url: "/admin/dashboard",
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

          <ContainerLogo>
            <Link to="/">
              <Logo src={logo} />
            </Link>
          </ContainerLogo>

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
            <AiOutlineShoppingCart
              color="FF5757"
              cursor="pointer"
              size={30}
              onClick={() => navigate("/budgets")}
            />
          </ContainerActionsMobile>
          <ContainerSearch>
            <Form
              data={{ search: "" }}
              onSubmit={handleSearch}
              maxWidth={"700px"}
              width={"100%"}
            >
              <Form.Select
                name="search"
                placeHolder={"Buscar por..."}
                options={itemsSearch}
              />
              <ButtonSearch>
                <AiOutlineSearch size={20} color="#FF5757" />
              </ButtonSearch>
            </Form>
          </ContainerSearch>
          <ContainerActions justifyContent="flex-end">
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
            <AiOutlineShoppingCart
              color="#FF5757"
              size={30}
              cursor="pointer"
              onClick={() => navigate("/budgets")}
            />
            <AiOutlineMenu
              size={30}
              color="#ff5757"
              cursor="pointer"
              onClick={() => setMenuMobile(true)}
            />
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

      {authed && profile && (
        <Modal setModal={setProfile} width="40%">
          <Profile />
        </Modal>
      )}
      {menuMobile && (
        <Modal setModal={setMenuMobile} width="40%">
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
