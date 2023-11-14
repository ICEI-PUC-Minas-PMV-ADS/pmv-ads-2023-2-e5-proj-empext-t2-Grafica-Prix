import React, { useEffect, useState } from "react";
import { ActionCard, ContainerActions, ContainerData } from "./styles";
import TitlePage from "../../../components/admin/titlePages";
import Container from "../../../components/common/container";
import Table from "../../../components/admin/table";
import { BsTrash3 } from "react-icons/bs";
import { BiEditAlt } from "react-icons/bi";
import Divisor from "../../../components/common/divisor";
import Text from "../../../components/common/text";
import CardProduct from "../../../components/client/cardProduct";
import SwiperComponent from "../../../components/common/swiper";
import { SwiperSlide } from "swiper/react";
import { useQuery } from "@tanstack/react-query";
import { getClients } from "../../../services/api/user";
import Modal from "../../../components/common/modal";
import Edit from "../../../components/admin/forms/clients/edit";
import Delete from "../../../components/admin/forms/clients/delete";
import { useNavigate } from "react-router";

export default function Dashboard(props) {
  const [dataWithAction, setDataWithAction] = useState();
  const [modal, setModal] = useState(false);

  const navigate = useNavigate();

  const clients = useQuery({
    queryKey: ["clients"],
    queryFn: getClients,
  });

  let cards = [];

  for (let i = 0; i < 10; i++) {
    cards.push({
      image: "",
      name: "Nome do produto",
      price: "RS 99,90",
    });
  }

  const breakpoints = {
    0: {
      slidesPerView: 1,
    },
    390: {
      slidesPerView: 2,
    },
    502: {
      slidesPerView: 3,
    },
    1034: {
      slidesPerView: 4,
    },
    1280: {
      slidesPerView: 3,
    },
  };

  const columns = [
    {
      label: "Perfil",
      key: "name",
    },
    {
      label: "Email",
      key: "email",
    },
    {
      label: "Telefone",
      key: "telefone",
    },
    {
      label: "Ações",
      key: "action",
    },
  ];

  useEffect(() => {
    setDataWithAction(
      clients.data?.map((data) => {
        return {
          ...data,
          action: (
            <ContainerActions>
              <BsTrash3
                size={25}
                onClick={() => {
                  setModal({
                    key: "delete",
                    data: data,
                  });
                }}
                style={{ cursor: "pointer" }}
              />
              <BiEditAlt
                size={25}
                onClick={() => {
                  setModal({
                    key: "edit",
                    data: data,
                  });
                }}
                style={{ cursor: "pointer" }}
              />
            </ContainerActions>
          ),
        };
      })
    );
  }, [clients.data]);

  return (
    <>
      <Container gap="10px" height="100%" maxWidth="100%">
        <TitlePage>Painel</TitlePage>
        <Divisor gap="30px" breakPoint="900px">
          <ContainerData>
            <Table
              loading={clients.isLoading}
              data={dataWithAction}
              height="fit-content"
              columns={columns}
              search
              titleSearch="Clientes"
              descriptionSearch="Consulte ou gerencie seus clientes"
              textTotal="clientes"
              maxHeight="400px"
              textNoContent="Nenhum cliente cadastrado"
            />
          </ContainerData>
          <ContainerData>
            <Text size="20px" weight="600">
              Produtos mais procurados
            </Text>
            <Text>Lista de produtos com mais acessos</Text>
            <SwiperComponent
              countItems={cards?.length}
              breakpoints={breakpoints}
            >
              {cards?.map((card, index) => {
                return (
                  <SwiperSlide key={index + 10023332}>
                    <CardProduct
                      url={card.image}
                      name={card.name}
                      price={card.price}
                    />
                  </SwiperSlide>
                );
              })}
            </SwiperComponent>
            <ActionCard>
              <Divisor justifyContent="space-between" margin="0 ">
                <Text size="20px" weight="600">
                  Quem somos
                </Text>
                <BiEditAlt
                  setModal={{ key: "editHowWeAre" }}
                  size={25}
                  style={{ cursor: "pointer" }}
                />
              </Divisor>
            </ActionCard>
            <ActionCard onClick={() => navigate("/admin/banners")}>
              <Divisor justifyContent="space-between" margin="0 ">
                <Text size="20px" weight="600">
                  Banners
                </Text>
                <BiEditAlt
                  setModal={{ key: "editHowWeAre" }}
                  size={25}
                  style={{ cursor: "pointer" }}
                />
              </Divisor>
            </ActionCard>
          </ContainerData>
        </Divisor>
      </Container>
      {modal?.key === "delete" && (
        <Modal setModal={setModal} width="40%">
          <Text size="20px" weight="600">
            Deletar cliente
          </Text>
          <Text size="14px" weight="500">
            Tem certeza que deseja deletar o cliente:
          </Text>
          <Delete data={modal?.data} setModal={setModal} />
        </Modal>
      )}
      {modal?.key === "edit" && (
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
      {modal?.key === "editHowWeAre" && (
        <Modal setModal={setModal} width="40%"></Modal>
      )}
    </>
  );
}
