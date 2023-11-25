import React, { useEffect, useState } from "react";
import Container from "../../../components/common/container";
import Divisor from "../../../components/common/divisor";
import Table from "../../../components/admin/table";
import Text from "../../../components/common/text";
import Register from "../../../components/admin/forms/products/register";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { BsBoxArrowUpRight, BsTrash3 } from "react-icons/bs";
import { BiEditAlt } from "react-icons/bi";
import ContainerActions from "../../../components/admin/containerActions";
import Modal from "../../../components/common/modal";
import Edit from "../../../components/admin/forms/products/edit";
import Delete from "../../../components/admin/forms/products/delete";
import Details from "../../../components/admin/forms/products/detail";
import { getProducts } from "../../../services/api/products";
import { currencyFormatter } from "../../../services/priceServices";
import { ContainerRegister } from "../categories/styles";
import http from "../../../services/http";
import { toast } from "react-toastify";
import useAuth from "../../../context/auth";

export default function Products(props) {
  const [dataWithAction, setDataWithAction] = useState();
  const [modal, setModal] = useState(false);
  const [dateWithPagination, setDateWithPagination] = useState();
  const [page, setPage] = useState(1);

  const { user } = useAuth();

  const client = useQueryClient();

  const products = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  useEffect(() => {
    const take = 10;
    const newData = [];

    for (let i = 0; i < products.data?.length; i += take) {
      newData.push(products.data?.slice(i, i + take));
    }

    setDateWithPagination(newData);
  }, [products.data]);

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
      dateWithPagination &&
        dateWithPagination[page - 1]?.map((data) => {
          const priceFormat = currencyFormatter(data.preco);
          return {
            ...data,
            preco: priceFormat,
            action: (
              <ContainerActions>
                {user?.permissao === 2 && (
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
                )}
                {user?.permissao !== 0 && (
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
                )}
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
  }, [products.data, dateWithPagination, page]);

  function handleSearch(value) {
    http
      .get(`/api/Produto/nome/${value.search === "" ? "all" : value.search}`)
      .then(
        (res) => {
          client.setQueryData({ queryKey: ["products"] }, res.data);
        },
        () => {
          toast.error("Erro ao buscar produto");
        }
      );
  }

  return (
    <>
      <Container
        gap="10px"
        maxWidth="100%"
        padding="0"
        height="100%"
        direction="row"
      >
        <Divisor flex="3" height="100vh" padding="20px">
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
            action={{
              exists: true,
              function: () =>
                setModal({
                  key: "register",
                  data: [],
                }),
            }}
            actionTitle="Novo produto"
            handleSearch={handleSearch}
            setPage={setPage}
            page={page}
            lastPage={dateWithPagination && dateWithPagination?.length}
          />
        </Divisor>
        {user?.permissao === 2 && (
          <ContainerRegister>
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
          </ContainerRegister>
        )}
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
      {modal?.key === "register" && (
        <Modal setModal={setModal} width="40%">
          <Text size="20px" weight="600">
            Cadastrar novo produto
          </Text>
          <Text size="14px" weight="500">
            Informe o nome e uma descrição (opcional) para seu produto.
          </Text>
          <Register />
        </Modal>
      )}
      {modal?.key === "details" && (
        <Modal setModal={setModal} width="40%">
          <Details data={modal?.data} setModal={setModal} />
        </Modal>
      )}
    </>
  );
}
