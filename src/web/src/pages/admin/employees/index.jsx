import React, { useEffect, useState } from "react";
import Container from "../../../components/common/container";
import Divisor from "../../../components/common/divisor";
import Table from "../../../components/admin/table";
import Text from "../../../components/common/text";
import Register from "../../../components/admin/forms/employees/register";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../../../services/api/categories";
import { BsBoxArrowUpRight, BsTrash3 } from "react-icons/bs";
import { BiEditAlt } from "react-icons/bi";
import ContainerActions from "../../../components/admin/containerActions";
import Modal from "../../../components/common/modal";
import Edit from "../../../components/admin/forms/categories/edit";
import Delete from "../../../components/admin/forms/categories/delete";
import Details from "../../../components/admin/forms/categories/detail";
import { ContainerRegister } from "../categories/styles";
import { getEmployees } from "../../../services/api/employees";

export default function Employees(props) {
  const [dataWithAction, setDataWithAction] = useState();
  const [modal, setModal] = useState(false);

  const employees = useQuery({
    queryKey: ["employees"],
    queryFn: getEmployees,
  });

  const columns = [
    {
      label: "Nome",
      key: "nome",
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

  useEffect(() => {
    setDataWithAction(
      employees.data?.map((data) => {
        return {
          ...data,
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
  }, [employees.data]);

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
          />
        </Divisor>
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
