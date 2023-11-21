import React, { useState } from "react";
import TitlePage from "../../../components/admin/titlePages";
import Container from "../../../components/common/container";
import {
  ActionBanner,
  BannerContainer,
  BannerList,
  BannerStyles,
  ConatinerActionsBanner,
} from "./styles";
import Divisor from "../../../components/common/divisor";
import Button from "../../../components/common/button";
import { FaTrashAlt } from "react-icons/fa";
import Modal from "../../../components/common/modal";
import Form from "../../../components/common/formComponents";
import Text from "../../../components/common/text";
import http from "../../../services/http";
import { toast } from "react-toastify";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBanners } from "../../../services/api/banners";

export default function Banners() {
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const client = useQueryClient();

  const banners = useQuery({
    queryKey: ["banners"],
    queryFn: getBanners,
  });

  function handleSubmit(values) {
    setLoading(true);

    const formData = new FormData();

    for (let key in values) {
      formData.append(key, values[key]);
    }

    http.post("/api/Banner", formData).then(
      () => {
        toast.success("Banner cadastrado com sucesso");
        setLoading(false);
        client.invalidateQueries({ queryKey: ["banners"] });
        setModal(false);
      },
      () => {
        setLoading(false);
        toast.error("Erro ao cadastrar banner");
      }
    );
  }

  function handleDelete() {
    setLoading(true);

    http.delete(`/api/Banner/${modal.id}`).then(
      () => {
        toast.success("Banner deletado com sucesso");
        setLoading(false);
        client.invalidateQueries({ queryKey: ["banners"] });
        setModal(false);
      },
      () => {
        setLoading(false);
        toast.error("Erro ao deletar banner");
      }
    );
  }

  return (
    <>
      <Container gap="10px" height="100%" maxWidth="100%">
        <Divisor justifyContent="space-between">
          <TitlePage>Banners</TitlePage>
          <Button
            width="fit-content"
            padding="5px 10px"
            onClick={() => setModal("register")}
          >
            Adicionar banner
          </Button>
        </Divisor>
        <BannerList>
          {banners.data?.map((banner) => {
            return (
              <BannerContainer>
                <ConatinerActionsBanner>
                  <ActionBanner
                    onClick={() => setModal({ form: "delete", id: banner.id })}
                  >
                    <FaTrashAlt color="#fff" size={16} />
                  </ActionBanner>
                </ConatinerActionsBanner>
                <BannerStyles src={`data:image/png;base64,${banner.imagem}`} />
              </BannerContainer>
            );
          })}
        </BannerList>
      </Container>
      {modal === "register" && (
        <Modal width="40%" setModal={setModal}>
          <Form data={{ Imagem: "" }} onSubmit={handleSubmit} gap="10px">
            <Text size="20px" weight="600">
              Adicionar Banner
            </Text>
            <Form.File name="Imagem" dimensions="1920x640" />
            <Form.Button
              type="submit"
              title="Cadastrar"
              minWidth="fit-content"
              padding="10px 30px"
              margin="5px 0 0 0"
              loading={loading}
            />
          </Form>
        </Modal>
      )}
      {modal?.form === "delete" && (
        <Modal width="40%" setModal={setModal}>
          <Form data={{ Id: "" }} onSubmit={handleDelete} gap="10px">
            <Text size="20px" weight="600">
              Deletar Banner
            </Text>
            <Text>Tem certeza que deseja deletar esse banner?</Text>
            <Form.Button
              type="submit"
              title="Deletar"
              minWidth="fit-content"
              padding="10px 30px"
              margin="5px 0 0 0"
              loading={loading}
            />
          </Form>
        </Modal>
      )}
    </>
  );
}
