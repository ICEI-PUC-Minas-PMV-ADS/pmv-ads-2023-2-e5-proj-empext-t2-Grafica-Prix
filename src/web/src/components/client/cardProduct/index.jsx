import { CardStyles, ImageProduct } from "./styles";
import Text from "../../common/text";

export default function CardProduct(props) {
  return (
    <CardStyles {...props}>
      <ImageProduct src={props.url} />
      <Text>{props.name}</Text>
      <Text size="18px" weight="600">
        {props.price}
      </Text>
    </CardStyles>
  );
}
