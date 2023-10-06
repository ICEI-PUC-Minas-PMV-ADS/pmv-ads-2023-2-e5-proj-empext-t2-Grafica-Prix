import styled from "styled-components";

export const ContainerActions = styled.div`
  display: flex;
  justify-content: space-between;
  width: 50px;
  align-items: center;
`;

export const ContainerData = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  gap: 5px;

  @media (max-width: 900px) {
    width: 100%;
  }
`;

export const CardHowWeAre = styled.div`
  width: 100%;
  flex: 1;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 10px #e1e1e1;
  padding: 10px 20px;
`;
