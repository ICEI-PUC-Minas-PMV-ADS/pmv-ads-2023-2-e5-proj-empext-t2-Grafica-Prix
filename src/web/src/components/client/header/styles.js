import styled from "styled-components";

export const ContainerFixed = styled.div`
  width: 100%;
  position: fixed;
  z-index: 2;
`;

export const ContainerHeader = styled.div`
  padding: 0.75rem 0px;
  border-bottom: 1px;
  background-color: #ffffff;
  width: 100%;
  border-bottom: 1px solid #e1e1e1;
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
  flex: 2;
  display: flex;
  justify-content: flex-end;
  position: relative;

  @media (max-width: 800px) {
    display: none;
  }
`;

export const ContainerActions = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  flex: 1;
  justify-content: ${(props) => props.justifyContent};

  @media (max-width: 800px) {
    display: none;
  }
`;

export const ContainerDataUser = styled.div`
  display: flex;
  gap: 5px;
  cursor: pointer;

  span {
    color: #ff5757;
  }
`;

export const ContainerCategories = styled.div`
  display: flex;
  gap: 40px;
  align-items: center;
  justify-content: center;
`;
export const Menu = styled.div`
  background-color: #fff;
  display: flex;
  position: relative;
  border-top: ${(props) => props.border};
  border-bottom: ${(props) => props.border};
  margin: 0 auto;
  width: 100%;

  @media (max-width: 800px) {
    display: none;
  }
`;
export const Datauser = styled.div`
  display: flex;
  flex-direction: column;
`;

export const MenuMobile = styled.div`
  display: none;

  @media (max-width: 800px) {
    display: flex;
    cursor: pointer;
  }
`;

export const ContainerActionsMobile = styled.div`
  display: none;

  @media (max-width: 800px) {
    display: flex;
    gap: 20px;
  }
`;

export const ContainerSearchMobile = styled.div`
  display: none;

  @media (max-width: 800px) {
    display: flex;
    width: 100%;
    padding: 10px;
  }
`;

export const ContainerLogo = styled.div`
  flex: 1;

  @media (max-width: 800px) {
    display: flex;
    justify-content: center;
  }
`;

export const ButtonSearch = styled.button`
  background-color: #fff;
  border: none;
  width: 20px;
  height: 20px;
  position: absolute;
  right: 7px;
  top: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
