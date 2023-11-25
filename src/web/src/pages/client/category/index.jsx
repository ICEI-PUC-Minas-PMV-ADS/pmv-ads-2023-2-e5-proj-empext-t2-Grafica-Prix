import { useLocation } from "react-router";
import Container from "../../../components/common/container";
import Text from "../../../components/common/text";
import { ContainerProductsInCategory } from "./styles";
import CardProduct from "../../../components/client/cardProduct";

export default function Category() {
  const { state } = useLocation();

  const category = state.category;

  return (
    <Container maxWidth="1100px" minHeight="calc(100vh - 70px)">
      <Text>{`Home > ${category.nome}`}</Text>
      <Text size="25px" weight="600">
        {category.nome}
      </Text>
      {category && (
        <ContainerProductsInCategory>
          {category?.produtos.map((product) => {
            return <CardProduct product={product} />;
          })}
        </ContainerProductsInCategory>
      )}
    </Container>
  );
}
