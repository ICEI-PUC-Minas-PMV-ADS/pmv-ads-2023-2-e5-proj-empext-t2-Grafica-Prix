import React, { useState } from "react";
import {
  CardProfile,
  ContainerArrow,
  ContainerOptions,
  ContainerSidebar,
  ContainerTextProfile,
  Divisor,
  ImageProfile,
  NameProfile,
  Option,
  RoleProfile,
  TextOption,
} from "./styles";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";
import Logo from "../../common/logo";
import { useNavigate } from "react-router";

export default function Sidebar(props) {
  const [toggleSidebar, setToggleSidebar] = useState(true);

  const navigate = useNavigate();

  const options = [
    { title: "Home", route: "/admin/dashboard" },
    { title: "Categorias", route: "/admin/categories" },
    { title: "Produtos", route: "/admin/products" },
    { title: "Orçamentos" },
    { title: "Colaboradores" },
  ];
  return (
    <ContainerSidebar toggle={toggleSidebar}>
      <ContainerArrow>
        {toggleSidebar ? (
          <IoIosArrowDropleftCircle
            onClick={() => setToggleSidebar(false)}
            size={22}
            style={{ color: "#FF5757", cursor: "pointer" }}
          />
        ) : (
          <IoIosArrowDroprightCircle
            onClick={() => setToggleSidebar(true)}
            size={22}
            style={{ color: "#FF5757", cursor: "pointer" }}
          />
        )}
      </ContainerArrow>
      {toggleSidebar && <Logo />}

      <Divisor>
        <ContainerOptions>
          {options.map((option) => {
            return (
              <Option onClick={() => navigate(option.route)}>
                <TextOption>{option.title}</TextOption>
              </Option>
            );
          })}
        </ContainerOptions>
        <CardProfile toggle={toggleSidebar}>
          <ImageProfile />
          {toggleSidebar && (
            <ContainerTextProfile>
              <NameProfile>Teste</NameProfile>
              <RoleProfile>Administrador</RoleProfile>
            </ContainerTextProfile>
          )}
        </CardProfile>
      </Divisor>
    </ContainerSidebar>
  );
}
