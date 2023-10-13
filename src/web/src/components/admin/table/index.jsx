import { useEffect } from "react";
import {
  ContainerData,
  ContainerSearch,
  ContainerTable,
  ContentTable,
  TableStyles,
  Td,
  Th,
  Tr,
} from "./styles";
import Paginator from "../paginator";
import Divisor from "../../common/divisor";
import Text from "../../common/text";
import Form from "../../common/formComponents";

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
    <ContainerTable {...props}>
      {props.search && (
        <ContainerSearch>
          <ContainerData>
            <Text size="20px" weight="600">
              {props.titleSearch}
            </Text>
            <Divisor justifyContent="space-between">
              <Text>{props.descriptionSearch}</Text>
              <Text>
                Total de {props.textTotal}: {props.data?.length || 0}
              </Text>
            </Divisor>
            <Form>
              <Form.Input
                name="search"
                placeHolder="Pesquisar cliente..."
                search
                border="none"
                shadow
              />
            </Form>
          </ContainerData>
        </ContainerSearch>
      )}
      <ContainerData>
        <TableStyles {...props}>
          <Tr>
            {props.columns?.map((column) => {
              return (
                <Th countColumns={props.columns.length}>{column.label}</Th>
              );
            })}
          </Tr>
          <ContentTable>
            {props.loading
              ? "Carregando"
              : newData?.map((row) => {
                  return (
                    <Tr>
                      {props.columns.map((column) => {
                        return column.html ? (
                          <Td
                            countColumns={props.columns.length}
                            dangerouslySetInnerHTML={{
                              __html: renderDatas(row, column),
                            }}
                          ></Td>
                        ) : (
                          <Td countColumns={props.columns.length}>
                            {renderDatas(row, column)}
                          </Td>
                        );
                      })}
                    </Tr>
                  );
                })}
          </ContentTable>
          <Paginator />
        </TableStyles>
      </ContainerData>
    </ContainerTable>
  );
}
