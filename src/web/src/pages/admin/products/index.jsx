import React, { useEffect, useState } from "react";
import Container from "../../../components/common/container";
import Divisor from "../../../components/common/divisor";
import Table from "../../../components/admin/table";
import Text from "../../../components/common/text";
import Register from "../../../components/admin/forms/products/register";
import { useQuery } from "@tanstack/react-query";
import { BsBoxArrowUpRight, BsTrash3 } from "react-icons/bs";
import { BiEditAlt } from "react-icons/bi";
import ContainerActions from "../../../components/admin/containerActions";
import Modal from "../../../components/common/modal";
import Edit from "../../../components/admin/forms/products/edit";
import Delete from "../../../components/admin/forms/products/delete";
import Details from "../../../components/admin/forms/products/detail";
import { getProducts } from "../../../services/api/products";
import { currencyFormatter } from "../../../services/priceServices";

export default function Products(props) {
  const [dataWithAction, setDataWithAction] = useState();
  const [modal, setModal] = useState(false);

  const products = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const columns = [
    {
      label: "Nome",
      key: "nome",
    },
    {
      label: "Preço",
      key: "preco",
    },
    {
      label: "Quantidade",
      key: "quantidade",
    },
    {
      label: "Ações",
      key: "action",
    },
  ];

  useEffect(() => {
    setDataWithAction(
      products.data?.map((data) => {
        const priceFormat = currencyFormatter(data.preco);
        return {
          ...data,
          preco: priceFormat,
          action: (
            <ContainerActions>
              <BsTrash3
                size={18}
                onClick={() => {
                  setModal({
                    key: "delete",
                    data: data,
                  });
                }}
                style={{ cursor: "pointer" }}
              />
              <BiEditAlt
                size={18}
                onClick={() => {
                  setModal({
                    key: "edit",
                    data: data,
                  });
                }}
                style={{ cursor: "pointer" }}
              />
              <BsBoxArrowUpRight
                size={18}
                onClick={() => {
                  setModal({
                    key: "details",
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
  }, [products.data]);

  return (
    <>
      <Container
        gap="10px"
        maxWidth="100%"
        padding="0 0 0 20px"
        height="100%"
        direction="row"
      >
        <Divisor flex="3" height="100vh" padding="20px 0 0 0">
          <Table
            loading={products.isLoading}
            data={dataWithAction}
            columns={columns}
            search
            titleSearch="Produtos"
            descriptionSearch="Consulte ou gerencie seus produtos"
            textTotal="produtos"
            heightTable="calc(100vh - 5%)"
            textNoContent="Nenhum produto cadastrado"
          />
        </Divisor>
        <Divisor
          flex="2"
          direction="column"
          height="100vh"
          bgColor="#fff"
          boxShadow
          padding="20px"
          overflow="auto"
        >
          <Text size="20px" weight="600">
            Cadastrar novo produto
          </Text>
          <Text size="14px" weight="500">
            Informe o nome e uma descrição (opcional) para seu produto.
          </Text>
          <Register />
        </Divisor>
      </Container>
      {modal?.key === "edit" && (
        <Modal setModal={setModal} width="40%">
          <Text size="20px" weight="600">
            Editar produto
          </Text>
          <Text size="14px" weight="500">
            Edite o nome e a descrição (opcional) do produto.
          </Text>
          <Edit data={modal?.data} setModal={setModal} />
        </Modal>
      )}
      {modal?.key === "delete" && (
        <Modal setModal={setModal} width="40%">
          <Text size="20px" weight="600">
            Deletar produto
          </Text>
          <Text size="14px" weight="500">
            Tem certeza que deseja deletar o produto:
          </Text>
          <Delete data={modal?.data} setModal={setModal} />
        </Modal>
      )}
      {modal?.key === "details" && (
        <Modal setModal={setModal} width="40%">
          <Details data={modal?.data} />
        </Modal>
      )}
    </>
  );
}
