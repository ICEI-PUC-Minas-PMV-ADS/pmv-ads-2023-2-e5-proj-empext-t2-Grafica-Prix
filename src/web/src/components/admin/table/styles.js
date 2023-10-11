import styled from "styled-components";

export const ContainerTable = styled.div`
  width: 100%;
  height: ${(props) => props.heightTable || "calc(100vh - 60px)"};
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const ContainerSearch = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const TableStyles = styled.table`
  background-color: #fff;
  width: ${(props) => props.width || "100%"};
  height: ${(props) => props.height || "100%"};
  margin: ${(props) => props.margin || "0"};
  border-radius: 5px;
  box-shadow: 0 0 5px #e1e1e1;
  display: flex;
  flex-direction: column;
  flex: 6;
  overflow: auto;
`;

export const Tr = styled.tr`
  width: 100%;
  padding: 5px;
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
  font-size: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 0 20px;
`;

export const ContainerData = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  height: 100%;
  padding: 5px;
  overflow: auto !important;

  @media (max-width: 900px) {
    width: 100%;
  }
`;
