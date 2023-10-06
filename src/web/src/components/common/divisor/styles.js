import styled from "styled-components";

export const DivisorStyles = styled.div`
  width: 100%;
  height: ${(props) => props.height};
  display: flex;
  gap: ${(props) => props.gap || "10px"};
  justify-content: ${(props) => props.justifyContent || "flex-start"};
  margin: ${(props) => props.margin};

  @media (max-width: ${(props) => props.breakPoint}) {
    flex-direction: column;
  }
`;
