import styled from "styled-components";

export const ContainerDetailProduct = styled.div`
  width: 100%;
  display: flex;
  height: 400px;
  gap: 50px;

  @media (max-width: 800px) {
    flex-direction: column;
    padding-top: 0;
  }

  @media (max-width: 500px) {
    height: auto;
  }
`;

export const ImageProduct = styled.img`
  width: 520px;
  background-color: #fff;
  flex: 1;

  @media (max-width: 500px) {
    width: 100%;
    border-radius: 0;
  }
`;

export const ContainerDescriptionProduct = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;
