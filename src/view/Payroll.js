import React from "react";
import Header from "../component/Header";
import Search from "../component/Search";
import PayrollLeft from "../component/PayrollLeft";
import PayrollRight from "../component/PayrollRight";
import styled from "styled-components";

const StyledPayrollBody = styled.div`
  position: absolute;
  height: 680px;
  margin-top: 30px;
  margin-left: 30px;
  width: 1860px;
  //  border-radius: 10px;
  // border: 1px black solid;
`;

const Payroll = () => {
  return (
    <div>
      <Header />
      <div style={{ margin: "auto", width: "1920px" }}>
        <Search />
        <StyledPayrollBody>
          <PayrollLeft />
          <PayrollRight />
        </StyledPayrollBody>
      </div>
    </div>
  );
};

export default Payroll;
