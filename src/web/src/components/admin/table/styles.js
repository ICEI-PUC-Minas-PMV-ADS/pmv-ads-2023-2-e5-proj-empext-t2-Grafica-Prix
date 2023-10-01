import styled from "styled-components";

export const TableStyles = styled.table`
  background-color: #fff;
  width: ${(props) => props.width || "100%"};
  height: ${(props) => props.height || "100%"};
  border-radius: 5px;
  box-shadow: 0 0 10px #e1e1e1;
`;

export const Tr = styled.tr`
  width: 100%;
  padding: 5px;
  border-bottom: 1px solid #e1e1e1;
  display: flex;
  justify-content: space-between;
`;

export const Th = styled.th`
  font-weight: 600;
  font-size: 12px;
`;

export const Td = styled.td`
  font-size: 12px;
`;
