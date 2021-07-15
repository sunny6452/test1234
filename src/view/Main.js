import React from "react";
import styled from "styled-components";

const ModalOverlay = styled.div`
  box-sizing: border-box;
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 999;
`;

const ModalInner = styled.div`
  box-sizing: border-box;
  position: relative;
  box-shadow: 0 0 6px 0 rgb(0 0 0 / 50%);
  border-radius: 10px;
  max-width: 1300px;
  height: 800px;
  transform: translateY(10%);
  margin: 0 auto;
  padding: 0px 10px;
  background: #ffff;
`;

const StyledStart = styled.div`
  text-align: center;
  height: 450px;
  margin-left: auto;
  margin-right: auto;
`;

const Main = ({ history }) => {
  return (
    <ModalOverlay>
      <ModalInner>
        <StyledStart></StyledStart>
      </ModalInner>
    </ModalOverlay>
  );
};

export default Main;
