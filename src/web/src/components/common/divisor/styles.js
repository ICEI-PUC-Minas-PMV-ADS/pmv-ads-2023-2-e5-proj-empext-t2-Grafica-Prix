import styled from "styled-components";

export const DivisorStyles = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  gap: ${(props) => props.gap || "10px"};
  justify-content: ${(props) => props.justifyContent || "flex-start"};
`;
