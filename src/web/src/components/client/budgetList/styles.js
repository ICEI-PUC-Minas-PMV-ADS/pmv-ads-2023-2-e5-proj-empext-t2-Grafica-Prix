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
`;

export const ProductBudget = styled.div`
  width: 100%;
  padding: 20px;
`;

export const Containeractions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  flex: 1;
`;

export const ActionBudgets = styled.div`
  background-color: #fff;
  width: 100%;
  height: fit-content;
  padding: 20px;
  box-shadow: 0 0 5px #e1e1e1;

  border-radius: 8px;
`;

export const CardSugestionProducts = styled.div`
  background-color: #fff;
  width: 100%;
  height: fit-content;
  padding: 20px;
  box-shadow: 0 0 5px #e1e1e1;
  flex: 1;
  border-radius: 8px;
`;
