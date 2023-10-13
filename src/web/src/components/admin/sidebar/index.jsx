import React, { useState } from "react";
import {
  CardProfile,
  ContainerArrow,
  ContainerIcon,
  ContainerOptions,
  ContainerSidebar,
  ContainerTextProfile,
  Divisor,
  ImageProfile,
  NameProfile,
  Option,
  RoleProfile,
  TextIcon,
  TextOption,
} from "./styles";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";
import Logo from "../../common/logo";
import { useNavigate } from "react-router";
import { RiHome2Line } from "react-icons/ri";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsGrid } from "react-icons/bs";
import { GoTasklist } from "react-icons/go";
import { HiOutlineUsers } from "react-icons/hi2";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const [toggleSidebar, setToggleSidebar] = useState(true);
  const [showTextIcon, setShowTextIcon] = useState(false);
  const [optionSelected, setOptionSelected] = useState(location.pathname);

  const navigate = useNavigate();

  const options = [
    {
      title: "Home",
      route: "/admin/dashboard",
      icon: <RiHome2Line size={20} color="#FF5757" />,
    },
    {
      title: "Categorias",
      route: "/admin/categories",
      icon: <BsGrid size={20} color="#FF5757" />,
    },
    {
      title: "Produtos",
      route: "/admin/products",
      icon: <AiOutlineShoppingCart size={20} color="#FF5757" />,
    },
    {
      title: "Orçamentos",
      icon: <GoTasklist size={20} color="#FF5757" />,
    },
    {
      title: "Colaboradores",
      icon: <HiOutlineUsers size={20} color="#FF5757" />,
    },
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
      {toggleSidebar && (
        <Link to="/">
          <Logo />
        </Link>
      )}

      <Divisor>
        <ContainerOptions center={toggleSidebar === false}>
          {options.map((option, index) => {
            return (
              <Option
                onClick={() => {
                  setOptionSelected(option.route);
                  navigate(option.route);
                }}
                padding={toggleSidebar === false ? "5px" : "5px 10px 3px 10px"}
                justify={toggleSidebar === false && "center"}
                selected={optionSelected === option.route}
              >
                <ContainerIcon
                  onMouseEnter={() => setShowTextIcon(index)}
                  onMouseLeave={() => setShowTextIcon(false)}
                >
                  {option.icon}
                  {toggleSidebar === false && showTextIcon === index && (
                    <TextIcon>{option.title}</TextIcon>
                  )}
                </ContainerIcon>

                <TextOption hidden={toggleSidebar === false}>
                  {option.title}
                </TextOption>
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
