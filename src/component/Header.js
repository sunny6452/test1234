import logo from "../img/logo.gif";
import React from "react";
import styled from "styled-components";

const StyledHeader = styled.header`
  width: 100%;
  height: 60px;
  background: #ffffff;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.15);
  font-family: "Noto Sans KR";
  font-style: normal;
  letter-spacing: -0.01em;
  color: #333333;
  .headerTitle {
    font-size: 18px;
    font-weight: bold;
  }
  .headerContents {
    margin-left: 20px;
  }
  img {
    margin-top: 10px;
    margin-left: 50px;
    width: 60px;
    height: 40px;
  }
  div {
    margin-top: -40px;
    margin-left: 130px;
  }
`;
const Header = () => {
  return (
    <StyledHeader>
      <img src={logo} alt="logo" />
      <div>
        <span className="headerTitle">월급날</span>
        <span className="headerContents">급여명세서 일괄 처리 게시판</span>
      </div>
    </StyledHeader>
  );
};
export default Header;
