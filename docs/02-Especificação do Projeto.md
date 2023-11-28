# Especificações do Projeto

<span style="color:red">Pré-requisitos: <a href="1-Documentação de Contexto.md"> Documentação de Contexto</a></span>

Definição do problema e ideia de solução a partir da perspectiva do usuário. É composta pela definição do  diagrama de personas, histórias de usuários, requisitos funcionais e não funcionais além das restrições do projeto.

Apresente uma visão geral do que será abordado nesta parte do documento, enumerando as técnicas e/ou ferramentas utilizadas para realizar a especificações do projeto

## Arquitetura e Tecnologias

React.Js no Front-end, C# .NET e SQL Server no back-end

## Project Model Canvas

![image](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-2-e5-proj-empext-t2-grupo-3-turma-2/assets/91069587/e6a71b97-cad5-465a-88f2-b5fc79bacb37)


## Requisitos

As tabelas que se seguem apresentam os requisitos funcionais e não funcionais que detalham o escopo do projeto. Para determinar a prioridade de requisitos, aplicar uma técnica de priorização de requisitos e detalhar como a técnica foi aplicada.

### Requisitos Funcionais

|ID    | Descrição do Requisito  | Prioridade |
|------|-----------------------------------------|----|
|RF-001| Garantir que o cliente tenha um acesso administrador | ALTA | 
|RF-002| CRUD categorias administrador   | ALTA |
|RF-003| CRUD produtos administrador | ALTA |
|RF-004| Permitir que o administrador possa visualizar um histórico de todos os orçamentos   | ALTA |
|RF-005| Possibilitar ao administrador editar texto quem somos  | MÉDIA |
|RF-006| Criação de conta e realização de login a usuários comuns, mediante o preenchimento de um formuláruio  | ALTA |
|RF-007| Vizualização de produtos a usuários comuns | ALTA |
|RF-008| Dar a possibilidade a usuários comuns de consiguir adicionar quantos produtos desejar ao carrinho, desde que esteja logado | ALTA |
|RF-009| Permitir que usuários comuns possam adicionar observações de texto livre ao adiiconar um produto ao carrinho  | ALTA |
|RF-010| Exclusão de produtos contidos no carrinho por usuários comuns  | ALTA |
|RF-011| Possibilitar que usuários comuns possam visualizar os produtos selecionados através do carrinho  | ALTA |
|RF-012| Comunicação direta com o emprresário por watassp através de um botão flutuante  | ALTA |
|RF-013| Deve ser enviada ao e-mail da gráfica as informações de poduto, quantidade, nome do cliente, e-mail, telefone e endereço (contidos no cadastro do usuário) assim que concluida uma solicitação de orçamento  |  ALTA | 
|RF-014| Disponilizar uma funcionalidade em que o administrador possa gerenciar os pedidos, de modo que possa atribuir um status: Fechado, negociando e venda concluída. Sempre uma solicitação de orçamento for enviada esta deve conter automaticamente o status de nogociando  |  ALTA | 
|RF-015| Visualização de produtos mais procurados (administrador) |  ALTA | 


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

![image](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-2-e5-proj-empext-t2-grupo-3-turma-2/assets/91069587/64776091-2e3d-440d-843a-350951a00096)


## Modelo ER (Projeto Conceitual)

![image](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-2-e5-proj-empext-t2-grupo-3-turma-2/assets/91069587/54809372-2255-4ff3-be4c-09d2dbebe517)



## Projeto da Base de Dados

![image](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-2-e5-proj-empext-t2-grupo-3-turma-2/assets/91069587/21910399-bdf3-4bd3-bd2b-0f907ee2c540)


## PlaneJamento das sprints

É importante ressalatra que este tópico possa sofrer alterações, já que durante o decorrer do projeto é possível que prioridades surjam e serão alinhadas junto ao cliente.

https://dev.azure.com/mystockgroup/Prix/_sprints/taskboard/Prix%20Team/Prix/Sprint%2001
