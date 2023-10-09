import styled from "styled-components";

export const BackgroundModal = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #ffffff21;
  backdrop-filter: brightness(100%);
  position: fixed;
  top: 0;
  right: 0;
  z-index: 1000;
  display: flex;
  justify-content: flex-end;
`;

export const ContainerPage = styled.div`
  width: ${(props) => (props.width ? props.width : "70%")};
  height: 100%;
  padding: 30px;
  background-color: #fff;
  overflow: auto;
  z-index: 99999;

  @media (max-width: 1000px) {
    width: 70%;
  }
  @media (max-width: 700px) {
    width: 100%;
  }
`;

export const ContainerBtn = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;

  button {
    background-color: transparent;
    border: none;
    font-size: 30px;
    color: #8463a9;
    font-weight: 700;
    cursor: pointer;
  }
`;

export const Overlay = styled.div`
  width: 100%;
  height: 100vh;
  position: absolute;
  background-color: #0003;
  opacity: ${(props) => props.transparent && "0"};
  z-index: 99998;
  top: 0;
  left: 0;
`;
