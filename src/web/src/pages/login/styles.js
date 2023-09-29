import styled from "styled-components";

export const ContainerLogin = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  overflow: hidden;
`;

export const ContainerForm = styled.div`
  width: 100%;
  background: linear-gradient(135deg, #f2f2f2 0%, white 71%);
  height: 100vh;
  flex: 2;
  padding: 20px 50px;

  @media (max-width: 810px) {
    padding: 20px 20%;
  }

  @media (max-width: 500px) {
    padding: 20px 10%;
  }
`;

export const ContainerImage = styled.div`
  background: linear-gradient(#ff5757, #ed1c24);
  flex: 4;
  height: 100vh;
  position: relative;
  padding: 50px;

  @media (max-width: 810px) {
    display: none;
  }
`;

export const ImageLogin = styled.img`
  position: absolute;
  width: 600px;
  height: 470px;
  bottom: -60px;
  left: 50%;
  transform: translate(-50%);
`;

export const TitleImage = styled.p`
  font-size: 30px;
  color: #fff;
  font-weight: 600;
`;

export const TextImage = styled.p`
  font-size: 22px;
  color: #fff;
  margin-top: 20px;
`;

export const Logo = styled.img`
  width: 130px;
`;

export const FormOptions = styled.div`
  width: 80%;
  border-bottom: 1px solid #e1e1e1;
  display: flex;

  @media (max-width: 700px) {
    width: 100%;
  }
`;

export const Option = styled.div`
  flex: 1;
  border-bottom: ${(props) => props.border && "3px solid #ff5757"};
  cursor: pointer;
`;

export const TextOption = styled.p`
  font-size: 25px;
  color: ${(props) => (props.selected ? "#ff5757" : "#e1e1e1")};
  margin-left: 20px;
  font-weight: 600;
`;

export const JustifyForm = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: flex-start;
  flex-direction: column;
  gap: 10px;
  margin-top: 30px;
`;

export const TextForgotPassword = styled.p`
  font-size: 12px;
`;
