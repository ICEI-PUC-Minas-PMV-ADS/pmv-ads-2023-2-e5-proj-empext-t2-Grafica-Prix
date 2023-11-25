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
import useAuth from "../../../context/auth";
import { AiOutlineUser } from "react-icons/ai";
import Modal from "../../common/modal";
import Text from "../../common/text";
import Edit from "../forms/clients/edit";

export default function Sidebar() {
  const [toggleSidebar, setToggleSidebar] = useState(true);
  const [showTextIcon, setShowTextIcon] = useState(false);
  const [optionSelected, setOptionSelected] = useState(location.pathname);
  const [modal, setModal] = useState(false);

  const navigate = useNavigate();

  const { user } = useAuth();

  const permissions = ["Consultor", "Gestor", "Administrador"];

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
      route: "/admin/budgets",
      icon: <GoTasklist size={20} color="#FF5757" />,
    },
    {
      title: "Colaboradores",
      route: "/admin/employees",
      icon: <HiOutlineUsers size={20} color="#FF5757" />,
    },
  ];
  return (
    <>
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
                  padding={
                    toggleSidebar === false ? "5px" : "5px 10px 3px 10px"
                  }
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
          <CardProfile
            toggle={toggleSidebar}
            onClick={() => setModal({ open: true, data: user })}
          >
            <AiOutlineUser
              size={22}
              style={{ color: "#FF5757", cursor: "pointer" }}
            />
            {toggleSidebar && user && (
              <ContainerTextProfile>
                <NameProfile>{user?.name}</NameProfile>
                <RoleProfile>{permissions[user?.permissao]}</RoleProfile>
              </ContainerTextProfile>
            )}
          </CardProfile>
        </Divisor>
      </ContainerSidebar>
      {modal.open && (
        <Modal setModal={setModal} width="40%">
          <Text size="20px" weight="600">
            Editar cliente
          </Text>
          <Text size="14px" weight="500">
            Edite o nome, email, telefone, cpf e endereço do cliente.
          </Text>
          <Edit data={modal?.data} setModal={setModal} />
        </Modal>
      )}
    </>
  );
}
