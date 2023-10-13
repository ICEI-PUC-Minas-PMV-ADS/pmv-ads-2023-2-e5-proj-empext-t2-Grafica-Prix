import React, { useEffect, useState } from "react";
import { CardHowWeAre, ContainerActions, ContainerData } from "./styles";
import TitlePage from "../../../components/admin/titlePages";
import Container from "../../../components/common/container";
import Table from "../../../components/admin/table";
import { BsTrash3 } from "react-icons/bs";
import { BiEditAlt } from "react-icons/bi";
import Divisor from "../../../components/common/divisor";
import Form from "../../../components/common/formComponents";
import Text from "../../../components/common/text";
import CardProduct from "../../../components/client/cardProduct";
import SwiperComponent from "../../../components/common/swiper";
import { SwiperSlide } from "swiper/react";
import { useQuery } from "@tanstack/react-query";
import { getClients } from "../../../services/api/user";
import Modal from "../../../components/common/modal";

export default function Dashboard(props) {
  const [dataWithAction, setDataWithAction] = useState();
  const [modal, setModal] = useState(false);

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
                    key: "trash",
                    data: data,
                  });
                }}
              />
              <BiEditAlt
                size={25}
                onClick={() => {
                  setModal({
                    key: "editUser",
                    data: data,
                  });
                }}
              />
            </ContainerActions>
          ),
        };
      })
    );
  }, [clients.data]);

  return (
    <>
      <Container gap="10px" height="100%">
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
            />
          </ContainerData>
          <ContainerData>
            <Text size="20px" weight="600">
              Produtos mais procurados
            </Text>
            <Text>Lista de produtos com mais acessos</Text>
            <SwiperComponent slidesPerView={3} countItems={cards?.length}>
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
            <CardHowWeAre>
              <Divisor justifyContent="space-between" margin="0 0 5px 0">
                <Text size="20px" weight="600">
                  Quem somos
                </Text>
                <BiEditAlt
                  setModal={{ key: "editHowWeAre" }}
                  size={25}
                  style={{ cursor: "pointer" }}
                />
              </Divisor>
              <Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at
                dui at leo suscipit placerat. Aenean lacinia arcu eget elementum
                consectetur. Sed eu odio vitae leo suscipit sagittis. Vivamus
                varius vulputate magna, pellentesque placerat nunc eleifend nec.
                Ut at quam quis ligula ornare blandit eget tempus justo. Integer
                porta metus nec elementum varius.
                <br />
                <br />
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at
                dui at leo suscipit placerat. Aenean lacinia arcu eget elementum
                consectetur. Sed eu odio vitae leo suscipit sagittis. Vivamus
                varius vulputate magna, pellentesque placerat nunc eleifend nec.
                Ut at quam quis ligula ornare blandit eget tempus justo. Integer
                porta metus nec elementum varius. Suspendisse faucibus vel
                tortor at mollis.
              </Text>
            </CardHowWeAre>
          </ContainerData>
        </Divisor>
      </Container>
      {modal?.key === "trash" && (
        <Modal setModal={setModal} width="40%"></Modal>
      )}
      {modal?.key === "editUser" && (
        <Modal setModal={setModal} width="40%"></Modal>
      )}
      {modal?.key === "editHowWeAre" && (
        <Modal setModal={setModal} width="40%"></Modal>
      )}
    </>
  );
}
