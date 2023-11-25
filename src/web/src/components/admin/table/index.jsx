import { useEffect } from "react";
import {
  ContainerButtonAction,
  ContainerData,
  ContainerSearch,
  ContainerTable,
  ContentTable,
  NoContent,
  TableStyles,
  Td,
  Th,
  Tr,
} from "./styles";
import Paginator from "../paginator";
import Divisor from "../../common/divisor";
import Text from "../../common/text";
import Form from "../../common/formComponents";
import Button from "../../common/button";

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
      <ContainerSearch>
        <ContainerData>
          <Divisor justifyContent="space-between">
            <Text size="20px" weight="600">
              {props.titleSearch}
            </Text>
            {props.action && (
              <ContainerButtonAction>
                <Button
                  padding="8px 15px"
                  margin="0"
                  onClick={props.action.function}
                >
                  <Text color="#fff">{props.actionTitle}</Text>
                </Button>
              </ContainerButtonAction>
            )}
          </Divisor>

          <Divisor justifyContent="space-between">
            {props.search && <Text>{props.descriptionSearch}</Text>}
            <Text>
              Total de {props.textTotal}: {props.data?.length || 0}
            </Text>
          </Divisor>
          {props.search && (
            <Form data={{ search: "" }} onSubmit={props.handleSearch}>
              <Form.Input
                name="search"
                placeHolder="Pesquisar cliente..."
                search
                border="none"
                shadow
              />
            </Form>
          )}
        </ContainerData>
      </ContainerSearch>
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
            {props.loading ? (
              "Carregando"
            ) : newData.length > 0 ? (
              newData?.map((row) => {
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
              })
            ) : (
              <NoContent>
                <Text size="16px" weight="600">
                  {props.textNoContent}
                </Text>
              </NoContent>
            )}
          </ContentTable>
          <Paginator
            actualPage={props.page}
            lastPage={props.lastPage}
            setActualPage={props.setPage}
          />
        </TableStyles>
      </ContainerData>
    </ContainerTable>
  );
}
