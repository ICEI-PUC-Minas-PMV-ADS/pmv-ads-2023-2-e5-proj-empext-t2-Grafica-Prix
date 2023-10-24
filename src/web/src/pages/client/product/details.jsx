import { useLocation } from "react-router";
import Container from "../../../components/common/container";
import {
  ContainerDescriptionProduct,
  ContainerDetailProduct,
  ImageProduct,
} from "./styles";
import Text from "../../../components/common/text";
import {
  currencyFormatter,
  percentagePromotion,
} from "../../../services/priceServices";
import Button from "../../../components/common/button";
import Divisor from "../../../components/common/divisor";
import { PromotionAlert } from "../../../components/client/cardProduct/styles";
import { useState } from "react";
import Modal from "../../../components/common/modal";
import Budget from "../../../components/client/budgets";

export default function Detail() {
  const { state } = useLocation();
  const [kartModal, setKartModal] = useState(false);

  const product = state.product;

  return (
    <>
      <Container maxWidth="1100px">
        <Text>{`Home > ${product.nome}`}</Text>
        <ContainerDetailProduct>
          <ImageProduct src={`data:image/png;base64, ${product.imagem}`} />
          <ContainerDescriptionProduct>
            <Text size="40px" weight="600" margin="0 0 5px 0">
              {product.nome}
            </Text>
            {product.promocao && (
              <Divisor width="fit-content" alignItems="center">
                <Text size="25px" weight="600">
                  {currencyFormatter(product.promocao)}
                </Text>
                <PromotionAlert relative>
                  <Text size="10px" weight="600" color="#fff">
                    {percentagePromotion(product)}% de desconto
                  </Text>
                </PromotionAlert>
              </Divisor>
            )}
            <Text
              lineThrough={product.promocao}
              color="#FF5757"
              size="35px"
              weight="600"
            >
              {currencyFormatter(product.preco)}
            </Text>
            <Divisor gap="5px">
              <Text size="14px" weight="500">
                Quantidade em estoque:{" "}
              </Text>
              <Text size="14px" weight="500" color="#FF5757">
                {product.quantidade}
              </Text>
            </Divisor>
            <Button margin="10px 0 0 0" onClick={() => setKartModal(true)}>
              Adicionar à orçamentos
            </Button>
          </ContainerDescriptionProduct>
        </ContainerDetailProduct>
        <Text size="25px" weight="600" margin="20px 0 0 0">
          Detalhes do produto
        </Text>
        <Text dangerouslySetInnerHTML={{ __html: product.descricao }}></Text>
      </Container>
      {kartModal && (
        <Modal setModal={setKartModal} width="40%">
          <Budget product={product} />
        </Modal>
      )}
    </>
  );
}
