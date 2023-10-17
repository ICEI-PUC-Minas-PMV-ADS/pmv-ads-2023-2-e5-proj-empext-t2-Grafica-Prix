import { SectionStyles } from "./styles";
import Text from "../../common/text";
import Container from "../../common/container";

export default function Section(props) {
  return <Container>
    <SectionStyles>
      <Text size="20px" weight="600">
        {props.title}
      </Text>
    {props.children}
    </SectionStyles>
  </Container>
}
