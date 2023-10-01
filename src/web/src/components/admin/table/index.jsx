import React, { useMemo, useState } from "react";
import { TableStyles, Td, Th, Tr } from "./styles";

export default function Table(props) {
  let newData = [];

  props.data?.forEach((item) => {
    let obj = [];
    for (let key in item) {
      obj.push({
        key: key,
        content: item[key],
      });
    }

    newData.push(obj);
  });

  return (
    <TableStyles>
      <Tr>
        {props.columns?.map((column) => {
          return <Th>{column.label}</Th>;
        })}
      </Tr>
      {newData?.map((data) => {
        return (
          <Tr>
            {data.map((obj, index) => {
              console.log(obj.key, props.columns[index].key);
              return (
                <Td>{props.columns[index].key === obj.key && obj.content}</Td>
              );
            })}
          </Tr>
        );
      })}
    </TableStyles>
  );
}
