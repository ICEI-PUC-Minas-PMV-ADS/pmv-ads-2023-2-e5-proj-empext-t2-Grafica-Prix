# Especificações do Projeto

<span style="color:red">Pré-requisitos: <a href="1-Documentação de Contexto.md"> Documentação de Contexto</a></span>

Definição do problema e ideia de solução a partir da perspectiva do usuário. É composta pela definição do  diagrama de personas, histórias de usuários, requisitos funcionais e não funcionais além das restrições do projeto.

Apresente uma visão geral do que será abordado nesta parte do documento, enumerando as técnicas e/ou ferramentas utilizadas para realizar a especificações do projeto

## Arquitetura e Tecnologias

o	Descreva brevemente a arquitetura definida para o projeto e as tecnologias a serem utilizadas. Sugere-se a criação de um diagrama de componentes da solução.

## Project Model Canvas

![image](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-2-e5-proj-empext-t2-grupo-3-turma-2/assets/91069587/e6a71b97-cad5-465a-88f2-b5fc79bacb37)


## Requisitos

As tabelas que se seguem apresentam os requisitos funcionais e não funcionais que detalham o escopo do projeto. Para determinar a prioridade de requisitos, aplicar uma técnica de priorização de requisitos e detalhar como a técnica foi aplicada.

### Requisitos Funcionais

|ID    | Descrição do Requisito  | Prioridade |
|------|-----------------------------------------|----|
|RF-001| Permitir que o cliente tenha um acesso administrador | ALTA | 
|RF-002| Permitir que o administrador possa criar categorias   | ALTA |
|RF-002| Permitir que o administrador possa criar produtos   | ALTA |
|RF-003| Permitir que o administrador possa excluir categorias   | ALTA |
|RF-004| Permitir que o administrador possa excluir produtos   | ALTA |
|RF-005| Permitir que o administrador possa editar categorias   | ALTA |
|RF-006| Permitir que o administrador possa editar produtos   | ALTA |
|RF-007| Permitir que o administrador possa visualizar um histórico de todos os orçamentos   | ALTA |
|RF-008| Permitir que o administrador possa editar texto quem somos  | MÉDIA |
|RF-009| Permitir que usuários comuns consigam criar uma conta e realizar login, mediante o preenchimento de um formuláruio  | ALTA |
|RF-010| Permitir que usuários comuns consigam visualizar produtos  | ALTA |
|RF-011| Permitir que usuários comuns consigam adicionar quantos produtos quisererem ao carrinho, desde que esteja logado | ALTA |
|RF-012| Permitir que usuários comuns possam adicionar observações de texto livre ao adiiconar um produto ao carrinho  | ALTA |
|RF-013| Permitir que usuários comuns possam excluir produtos contidos no carrinho  | ALTA |
|RF-014| Permitir que usuários comuns possam visualizar os produtos selecionados através do carrinho  | ALTA |
|RF-015| Permitir que usuários comuns possam entrar em contato direto por watassp através de um botão flutuante  | ALTA |
|RF-016| Deve ser enviada ao e-mail da gráfica as informações de poduto, quantidade, nome do cliente, e-mail, telefone e endereço (contidos no cadastro do usuário) assim que concluida uma solicitação de orçamento  |  ALTA | 
|RF-017| Permitir que o administrador possa gerenciar os pedidos, de modo que possa atribuir um status: Fechado, negociando e venda concluída. Sempre uma solicitação de orçamento for enviada esta deve conter automaticamente o status de nogociando  |  ALTA | 
|RF-018| Permitir que o administrador possa visulizar um relatório de quantos pedidos possuem cada um dos status.  |  ALTA | 
|RF-019| Permitir que o administrador possa visualizar a quantidade de cliques cada um dos produtos teve |  ALTA | 


### Requisitos não Funcionais

|ID     | Descrição do Requisito  |Prioridade |
|-------|-------------------------|----|
|RNF-001| O sistema deve ser responsivo para rodar em um dispositivos móvel | MÉDIA | 
|RNF-002| Deve ser implementado nível de segurança para o administrador e para os usuários comuns |  ALTA |
|RNF-003| Deve conter em todas as páginas os logos das gráficas Prix e Reigraf |  ALTA |
|RNF-004| Deve conter informações de horário de funcionamento, telefone de contato e endereço |  ALTA |
|RNF-005| Os produtos do carrinho devem ser excluídos assim que finalizada a solicitação de um orçamento |  BAIXA |


## Restrições

O projeto está restrito pelos itens apresentados na tabela a seguir.

|ID| Restrição                                             |
|--|-------------------------------------------------------|
|01| O projeto deverá ser entregue até o final do semestre |
|03| Não pode existir contratação de pessoal externo à equipe pré-definida        |

## Diagrama de Casos de Uso

O diagrama de casos de uso é o próximo passo após a elicitação de requisitos, que utiliza um modelo gráfico e uma tabela com as descrições sucintas dos casos de uso e dos atores. Ele contempla a fronteira do sistema e o detalhamento dos requisitos funcionais com a indicação dos atores, casos de uso e seus relacionamentos. 

As referências abaixo irão auxiliá-lo na geração do artefato “Diagrama de Casos de Uso”.

> **Links Úteis**:
> - [Criando Casos de Uso](https://www.ibm.com/docs/pt-br/elm/6.0?topic=requirements-creating-use-cases)
> - [Como Criar Diagrama de Caso de Uso: Tutorial Passo a Passo](https://gitmind.com/pt/fazer-diagrama-de-caso-uso.html/)
> - [Lucidchart](https://www.lucidchart.com/)
> - [Astah](https://astah.net/)
> - [Diagrams](https://app.diagrams.net/)

## Modelo ER (Projeto Conceitual)

O Modelo ER representa através de um diagrama como as entidades (coisas, objetos) se relacionam entre si na aplicação interativa.

Sugestão de ferramentas para geração deste artefato: LucidChart e Draw.io.

A referência abaixo irá auxiliá-lo na geração do artefato “Modelo ER”.

> - [Como fazer um diagrama entidade relacionamento | Lucidchart](https://www.lucidchart.com/pages/pt/como-fazer-um-diagrama-entidade-relacionamento)

## Projeto da Base de Dados

O projeto da base de dados corresponde à representação das entidades e relacionamentos identificadas no Modelo ER, no formato de tabelas, com colunas e chaves primárias/estrangeiras necessárias para representar corretamente as restrições de integridade.
