import React, { useState } from "react";
import TitlePage from "../../../components/admin/titlePages";
import Container from "../../../components/common/container";
import { useNavigate } from "react-router";
import {
  ActionBanner,
  BannerContainer,
  BannerList,
  BannerStyles,
  ConatinerActionsBanner,
} from "./styles";
import Divisor from "../../../components/common/divisor";
import Button from "../../../components/common/button";
import { MdModeEdit } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";

export default function Banners() {
  const [modal, setModal] = useState(false);

  const navigate = useNavigate();

  return (
    <Container gap="10px" height="100%" maxWidth="100%">
      <Divisor justifyContent="space-between">
        <TitlePage>Banners</TitlePage>
        <Button width="fit-content" padding="5px 10px">
          Adicionar banner
        </Button>
      </Divisor>

      <BannerList>
        <BannerContainer>
          <ConatinerActionsBanner>
            <ActionBanner>
              <MdModeEdit color="#fff" size={20} />
            </ActionBanner>
            <ActionBanner>
              <FaTrashAlt color="#fff" size={16} />
            </ActionBanner>
          </ConatinerActionsBanner>
          <BannerStyles />
        </BannerContainer>
      </BannerList>
    </Container>
  );
}
