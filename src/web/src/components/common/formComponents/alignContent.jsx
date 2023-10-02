import { InputGroup, Label, AlignedContentStyled } from "./styles";

export default function AlignContent(props) {
  return (
    <InputGroup>
      {props.label && <Label>{props.label}</Label>}
      <AlignedContentStyled {...props}>{props.children}</AlignedContentStyled>
    </InputGroup>
  );
}
