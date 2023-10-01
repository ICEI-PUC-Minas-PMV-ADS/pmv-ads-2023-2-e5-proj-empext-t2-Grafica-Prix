import styled from "styled-components";

export const ContainerSidebar = styled.div`
  background-color: #fff;
  border-right: 1px solid #e1e1e1;
  width: ${(props) => (props.toggle ? "200px" : "50px")};
  height: 100vh;
  padding: ${(props) => (props.toggle ? "20px" : "5px")};
  position: relative;
  transition: 0.3s;
`;

export const ContainerArrow = styled.div`
  position: absolute;
  right: -11px;
  z-index: 1;
`;

export const Divisor = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  height: calc(100% - 40px);
`;

export const ContainerOptions = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

export const Option = styled.div`
  background-color: #fff;
  width: 100%;
  border-radius: 5px;

  padding: 10px;
`;

export const TextOption = styled.p`
  font-size: 14px;
  cursor: pointer;
`;

export const CardProfile = styled.div`
  width: 100%;
  display: flex;
  padding: ${(props) => (props.toggle ? "5px 10px" : "0")};
  border-radius: 5px;
  border: ${(props) => props.toggle && "1px solid #e1e1e1"};
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const ImageProfile = styled.img`
  background-color: #ccc;
  width: 30px;
  height: 30px;
  border-radius: 50%;
`;

export const ContainerTextProfile = styled.div`
  flex: 1;
  border-left: 1px solid #e1e1e1;
  height: 100%;
  padding: 0 10px;
  margin-left: 10px;
`;

export const NameProfile = styled.p`
  font-size: 14px;
  font-weight: 600;
`;

export const RoleProfile = styled.p`
  font-size: 11px;
`;
