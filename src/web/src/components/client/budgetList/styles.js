import styled from "styled-components";

export const BudgetsStyles = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  gap: 20px;
`;

export const ProductList = styled.div`
  background-color: #fff;
  overflow: auto;
  height: calc(100% - 40px);
  box-shadow: 0 0 5px #e1e1e1;
  flex: 2;
  border-radius: 8px;
  padding: 10px;
`;

export const ProductBudget = styled.div`
  width: 100%;
  padding: 20px;
  position: relative;
  border-bottom: 1px solid #e1e1e1;
`;

export const Containeractions = styled.div`
  display: flex;
  flex-flow: column;
  gap: 10px;
  flex: 1;
  height: calc(100vh - 150px);
`;

export const ActionBudgets = styled.div`
  background-color: #fff;
  width: 100%;
  height: fit-content;
  padding: 20px;
  box-shadow: 0 0 5px #e1e1e1;
  flex-grow: 0;
  flex-basis: auto;
  border-radius: 8px;
`;

export const CardSugestionProducts = styled.div`
  width: 100%;
  flex-grow: 1;
  flex-basis: auto;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: auto;
`;
