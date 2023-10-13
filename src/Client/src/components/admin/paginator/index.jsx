import { ContainerPaginator, PageButton, TextPaginator } from "./styles";

export default function Paginator({ actualPage, lastPage, setActualPage }) {
  return (
    <ContainerPaginator>
      <PageButton
        onClick={() => {
          setActualPage(actualPage - 1);
        }}
        disabled={actualPage <= 1}
      >
        Anterior
      </PageButton>
      <TextPaginator>
        {actualPage} de {lastPage ? lastPage : 0}
      </TextPaginator>
      <PageButton
        onClick={() => {
          setActualPage(actualPage + 1);
        }}
        disabled={actualPage >= lastPage || !lastPage}
      >
        Próximo
      </PageButton>
    </ContainerPaginator>
  );
}
