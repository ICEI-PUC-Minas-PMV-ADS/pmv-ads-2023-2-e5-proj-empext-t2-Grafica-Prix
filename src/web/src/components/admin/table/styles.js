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
  padding: 5px 30px;
  border-bottom: 1px solid #e1e1e1;
  display: flex;
  justify-content: space-between;
`;

export const Th = styled.th`
  width: ${(props) => `calc(100% / ${props.countColumns})`};
  font-weight: 600;
  font-size: 12px;
  display: flex;
  justify-content: center;
`;

export const Td = styled.td`
  width: ${(props) => `calc(100% / ${props.countColumns})`};
  font-size: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
