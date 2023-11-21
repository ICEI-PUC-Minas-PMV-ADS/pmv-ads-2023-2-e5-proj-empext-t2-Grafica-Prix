import styled from "styled-components";

export const ConatinerActions = styled.div`
  display: flex;
  gap: 10px;
  position: absolute;
  left: ${(props) => props.left && "10px"};
  right: ${(props) => props.right && "10px"};
  top: 5px;
  z-index: 1;
`;

export const Action = styled.div`
  background-color: #ff5757;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  cursor: pointer;
`;
