import React, { useEffect, useState } from "react";
import Container from "../../../components/common/container";
import Divisor from "../../../components/common/divisor";
import Table from "../../../components/admin/table";
import Text from "../../../components/common/text";
import Register from "../../../components/admin/forms/employees/register";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { BsBoxArrowUpRight, BsTrash3 } from "react-icons/bs";
import { BiEditAlt } from "react-icons/bi";
import ContainerActions from "../../../components/admin/containerActions";
import Modal from "../../../components/common/modal";
import Edit from "../../../components/admin/forms/employees/edit";
import Delete from "../../../components/admin/forms/employees/delete";
import Details from "../../../components/admin/forms/employees/detail";
import { ContainerRegister } from "../categories/styles";
import { getEmployees } from "../../../services/api/employees";
import http from "../../../services/http";
import { toast } from "react-toastify";
import useAuth from "../../../context/auth";

export default function Employees(props) {
  const [dataWithAction, setDataWithAction] = useState();
  const [modal, setModal] = useState(false);
  const [dateWithPagination, setDateWithPagination] = useState();
  const [page, setPage] = useState(1);

  const { user } = useAuth();

  const employees = useQuery({
    queryKey: ["employees"],
    queryFn: getEmployees,
  });

  useEffect(() => {
    const take = 10;
    const newData = [];

    for (let i = 0; i < employees.data?.length; i += take) {
      newData.push(employees.data?.slice(i, i + take));
    }

    setDateWithPagination(newData);
  }, [employees.data]);

  const client = useQueryClient();

  const columns = [
    {
      label: "Nome",
      key: "name",
    },
    {
      label: "Email",
      key: "email",
      html: true,
    },
    {
      label: "Telefone",
      key: "telefone",
      html: true,
    },
    {
      label: "Ações",
      key: "action",
    },
  ];

  function handleSearch(value) {
    http
      .get(
        `/api/Colaborador/Name/${value.search === "" ? "all" : value.search}`
      )
      .then(
        (res) => {
          client.setQueryData({ queryKey: ["employees"] }, res.data);
        },
        () => {
          toast.error("Erro ao buscar colaborador");
        }
      );
  }

  useEffect(() => {
    setDataWithAction(
      dateWithPagination &&
        dateWithPagination[page - 1]?.map((data) => {
          return {
            ...data,
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
  }, [employees.data, dateWithPagination, page]);

  return (
    <>
      <Container
        gap="10px"
        maxWidth="100%"
        padding="0 "
        height="100%"
        direction="row"
      >
        <Divisor flex="3" height="100vh" padding="20px">
          <Table
            loading={employees.isLoading}
            data={dataWithAction}
            columns={columns}
            search
            titleSearch="Funcionários"
            descriptionSearch="Consulte ou gerencie seus funcionários"
            textTotal="funcionários"
            heightTable="calc(100vh - 5%)"
            textNoContent="Nenhum funcionário cadastrado"
            action={{
              exists: true,
              function: () =>
                setModal({
                  key: "register",
                  data: [],
                }),
            }}
            actionTitle="Novo funcionário"
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
            >
              <Text size="20px" weight="600">
                Cadastrar novo funcionário
              </Text>
              <Text size="14px" weight="500">
                Informe os dados do funcionário.
              </Text>
              <Register />
            </Divisor>
          </ContainerRegister>
        )}
      </Container>
      {modal?.key === "edit" && (
        <Modal setModal={setModal} width="40%">
          <Text size="20px" weight="600">
            Editar funcionário
          </Text>
          <Text size="14px" weight="500">
            Edite os dados do funcionário.
          </Text>
          <Edit data={modal?.data} setModal={setModal} />
        </Modal>
      )}
      {modal?.key === "delete" && (
        <Modal setModal={setModal} width="40%">
          <Text size="20px" weight="600">
            Deletar funcionário
          </Text>
          <Text size="14px" weight="500">
            Tem certeza que deseja deletar o funcionário:
          </Text>
          <Delete data={modal?.data} setModal={setModal} />
        </Modal>
      )}
      {modal?.key === "details" && (
        <Modal setModal={setModal} width="40%">
          <Details data={modal?.data} />
        </Modal>
      )}
      {modal?.key === "register" && (
        <Modal setModal={setModal} width="40%">
          <Text size="20px" weight="600">
            Cadastrar novo funcionário
          </Text>
          <Text size="14px" weight="500">
            Informe os dados do funcionário.
          </Text>
          <Register />
        </Modal>
      )}
    </>
  );
}
