import styled from "styled-components";

export const TextStyles = styled.p`
  font-size: ${(props) => props.size || "12px"};
  font-weight: ${(props) => props.weight || "400"};
`;
