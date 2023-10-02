import styled from "styled-components";

export const DivisorStyles = styled.div`
  width: 100%;
  display: flex;
  gap: ${(props) => props.gap || "10px"};
`;
