import styled from "styled-components";

export const ContainerSelector = styled.div`
  width: 100%;
  display: flex;
  border-bottom: 1px solid #e1e1e1;
`;

export const Selector = styled.div`
  flex: 1;
  border-bottom: ${(props) => props.selected && "3px solid #ff5757"};
  cursor: pointer;
  position: relative;
  top: 2px;
`;

export const TextSelector = styled.p`
  font-size: ${(props) => props.size || "16px"};
  color: ${(props) => (props.selected ? "#ff5757" : "#e1e1e1")};
  margin-left: 20px;
  font-weight: 600;
`;
