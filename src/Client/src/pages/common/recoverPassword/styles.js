import styled from "styled-components";

export const Background = styled.div`
  background: linear-gradient(135deg, #f2f2f2 0%, white 71%);
  width: 100%;
  height: 100vh;
`;

export const Card = styled.div`
  background-color: #fff;
  width: 100%;
  padding: 30px 30px 50px 30px;
  border-radius: 10px;
  position: relative;
  box-shadow: 0 0 10px #e1e1e1;
  margin-top: 100px;
`;

export const Logo = styled.img`
  width: 130px;
  position: relative;
  left: 50%;
  transform: translate(-50%);
`;

export const TitleRecoverPassword = styled.p`
  font-size: 18px;
  font-weight: 600;
  margin: 20px 0 10px 0;
  text-align: center;
`;

export const DescriptionRecoverPassword = styled.p`
  font-weight: 500;
  margin-bottom: 5px;
`;
