import styled from "styled-components";

export const TextStyles = styled.p`
  font-size: ${(props) => props.size || "12px"};
  font-weight: ${(props) => props.weight || "400"};
  color: ${(props) => props.color || "#505050"};
  text-align: ${(props) => props.textAlign || "left"};
  cursor: ${(props) => props.cursor};
  margin: ${(props) => props.margin};
`;
