import { useEffect } from "react";
import { ContainerData, TableStyles, Td, Th, Tr } from "./styles";
import Paginator from "../paginator";

export default function Table(props) {
  let newData = [];

  useEffect(() => {}, []);

  props.data?.forEach((item) => {
    let items = [];
    for (let key in item) {
      items[key] = item[key];
    }

    newData.push(items);
  });

  function renderDatas(row, column) {
    return row[column.key];
  }

  return (
    <TableStyles {...props}>
      <Tr>
        {props.columns?.map((column) => {
          return <Th countColumns={props.columns.length}>{column.label}</Th>;
        })}
      </Tr>
      <ContainerData>
        {newData?.map((row) => {
          return (
            <Tr>
              {props.columns.map((column) => {
                return (
                  <Td countColumns={props.columns.length}>
                    {renderDatas(row, column)}
                  </Td>
                );
              })}
            </Tr>
          );
        })}
      </ContainerData>
      <Paginator />
    </TableStyles>
  );
}
