import styled from "styled-components";

export const ContainerRegister = styled.div`
  display: flex;
  flex: 2;

  @media (max-width: 850px) {
    display: none;
  }
`;

export const ButtonRegister = styled.div`
  display: none;

  @media (max-width: 850px) {
    display: flex;
    position: absolute;
    right: 20px;
    top: 10px;
  }
`;
