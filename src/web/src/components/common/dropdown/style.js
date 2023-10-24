import styled from "styled-components";

export const ContainerButtonDropdown = styled.div`
  width: fit-content;
  position: relative;
`;

export const ButtonMenuStyles = styled.button`
  display: flex;
  gap: 5px;
  background-color: transparent;
  border: none;
  outline: none;
  align-items: center;
  cursor: pointer;
  color: #ff5757;
`;

export const DropdownStyles = styled.div`
  min-width: 120px;
  background-color: #fff;
  max-width: 200px;
  border-radius: 5px;
  box-shadow: 0 0 5px #e1e1e1;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 23px;
  padding: ${(props) => (props.show ? "10px" : "0")};
  z-index: ${(props) => props.show && "2"};
  height: ${(props) => (props.show ? "auto" : "0")};
  overflow: ${(props) => !props.show && "hidden"};
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
