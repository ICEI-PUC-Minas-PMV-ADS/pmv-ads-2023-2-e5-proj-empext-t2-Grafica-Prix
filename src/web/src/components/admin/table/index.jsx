import { useEffect } from "react";
import { TableStyles, Td, Th, Tr } from "./styles";

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
    <TableStyles>
      <Tr>
        {props.columns?.map((column) => {
          return <Th countColumns={props.columns.length}>{column.label}</Th>;
        })}
      </Tr>
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
    </TableStyles>
  );
}
