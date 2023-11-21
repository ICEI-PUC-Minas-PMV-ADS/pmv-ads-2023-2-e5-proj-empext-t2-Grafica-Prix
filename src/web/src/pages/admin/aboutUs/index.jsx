import { useState } from "react";
import Container from "../../../components/common/container";
import Divisor from "../../../components/common/divisor";
import Form from "../../../components/common/formComponents";
import Text from "../../../components/common/text";
import { ContainerRegister } from "../categories/styles";
import { getAboutUs } from "../../../services/api/aboutUs";
import http from "../../../services/http";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { ContainerButtonAction } from "../../../components/admin/table/styles";
import Button from "../../../components/common/button";
import Modal from "../../../components/common/modal";

export default function AboutUs() {
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const client = useQueryClient();

  const aboutUs = useQuery({
    queryKey: ["aboutUs"],
    queryFn: getAboutUs,
  });

  function handleEdit(values) {
    setLoading(true);

    http
      .put(`/api/QuemSomos/${aboutUs.data && aboutUs.data[0]?.id}`, {
        ...values,
        id: aboutUs.data && aboutUs.data[0]?.id,
      })
      .then(
        () => {
          toast.success("Quem somos editado com sucesso");
          setLoading(false);
          client.invalidateQueries({ queryKey: ["aboutUs"] });
          setModal(false);
        },
        () => {
          setLoading(false);
          toast.error("Erro ao editar quem somos");
        }
      );
  }

  return (
    <>
      <Container
        gap="10px"
        maxWidth="100%"
        padding="0 "
        height="100%"
        direction="row"
      >
        {aboutUs.data && (
          <Divisor flex="3" height="100vh" padding="20px" direction="column">
            <Text size="25px" weight="600">
              {aboutUs.data[0]?.titulo}
            </Text>
            <Text
              size="16px"
              dangerouslySetInnerHTML={{
                __html: aboutUs.data[0]?.descricao,
              }}
            ></Text>
          </Divisor>
        )}
        <ContainerButtonAction margin="20px 10px">
          <Button padding="8px 15px" margin="0" onClick={() => setModal(true)}>
            <Text color="#fff">Editar quem somos</Text>
          </Button>
        </ContainerButtonAction>
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
              Editar quem somos
            </Text>
            {aboutUs.data && (
              <Form
                data={{
                  titulo: aboutUs.data[0]?.titulo,
                  descricao: aboutUs.data[0]?.descricao,
                }}
                onSubmit={handleEdit}
              >
                <Form.Input
                  name="titulo"
                  label="Título"
                  placeHolder="Ex: Quem somos"
                />
                <Form.Editor name="descricao" label="Descrição" />
                <Form.Button
                  type="submit"
                  title="Editar"
                  minWidth="fit-content"
                  padding="10px 30px"
                  margin="5px 0 0 0"
                  loading={loading}
                />
              </Form>
            )}
          </Divisor>
        </ContainerRegister>
      </Container>
      {modal && (
        <Modal setModal={setModal} width="40%">
          {aboutUs.data && (
            <Form
              data={{
                titulo: aboutUs.data[0]?.titulo,
                descricao: aboutUs.data[0]?.descricao,
              }}
              onSubmit={handleEdit}
            >
              <Text size="20px" weight="600">
                Editar quem somos
              </Text>
              <Form.Input
                name="titulo"
                label="Título"
                placeHolder="Ex: Quem somos"
              />
              <Form.Editor name="descricao" label="Descrição" />
              <Form.Button
                type="submit"
                title="Editar"
                minWidth="fit-content"
                padding="10px 30px"
                margin="5px 0 0 0"
                loading={loading}
              />
            </Form>
          )}
        </Modal>
      )}
    </>
  );
}
