import styled from "styled-components";

export const ContainerCollapse = styled.div`
  width: 100%;
  position: relative;
  border-bottom: 1px solid #e1e1e1;
`;

export const ButtonStyles = styled.button`
  width: 100%;
  display: flex;
  gap: 5px;
  background-color: transparent;
  border: none;
  outline: none;
  align-items: center;
  cursor: pointer;
  color: #ff5757;
`;

export const CollapseStyles = styled.div`
  width: 100%;
  background-color: #fff;
  max-width: 200px;
  display: flex;
  flex-direction: column;
  position: relative;
  padding: ${(props) => (props.show ? "5px" : "0")};
  z-index: ${(props) => props.show && "2"};
  height: ${(props) => (props.show ? "auto" : "0")};
  overflow: ${(props) => props.show && "hidden"};
  opacity: ${(props) => (props.show ? "1" : "0")};
  transition: 0.3s;
`;

export const ItemStyle = styled.p`
  width: fit-content;
  padding: 5px;
  border-radius: 5px;
  display: ${(props) => (props.hidden ? "none" : "flex")};

  :hover {
    background-color: #e1e1e1;
  }
`;
