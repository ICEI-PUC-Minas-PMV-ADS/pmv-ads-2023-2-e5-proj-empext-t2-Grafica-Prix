import styled from "styled-components";

export const ContainerHeader = styled.div`
  padding: 0.75rem 0px;
  border-bottom: 1px;
  background-color: #ffffff;
  width: 100%;
`;
export const ContainerMainHeader = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const Logo = styled.img`
  width: 130px;
`;

export const ContainerSearch = styled.div`
  border-radius: 5px;
  border: 0px;
  padding-left: 0.25rem;
  padding-right: 0.25rem;
  outline: 0px;
  width: 100%;
  height: 2.3125rem;
  font-size: 0.875rem;
  background-color: transparent;
`;

export const ContainerActions = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

export const ContainerDataUser = styled.div`
  display: flex;
  gap: 5px;

  span {
    color: #ff5757;
  }
  p {
    color: #505050;
    font-size: 12px;
  }
`;

export const ContainerCategories = styled.div`
  display: flex;
  gap: 40px;
  align-items: center;
  position: relative;
  left: 50%;
  transform: translate(-50%);
`;
export const Menu = styled.div`
  display: flex;
  position: relative;
  border-top: ${(props) => props.border};
  border-bottom: ${(props) => props.border};
  margin: 0 auto;
  width: 100%;
`;
