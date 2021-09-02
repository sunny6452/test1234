import React, { useContext, useRef } from "react";
import styled from "styled-components";
import PayrollTable from "../common/PayrollTable";
import PayrollContext from "../contexts/payrollData";

const StyledPayrollLeft = styled.div`
  // border: 1px solid black;
  width: 1000px;
  height: 100%;
  float: left;
  background: #ffffff;
  box-shadow: 0px 5px 15px rgb(0 0 0 / 15%);
  border-radius: 10px;
`;
const columns = [
  { field: "회사명", name: "회사명", width: 190 },
  { field: "처리결과", name: "처리결과", width: 190 },
  { field: "처리상태", name: "처리상태", width: 180 },
  { field: "급여일", name: "급여일", width: 100 },
  { field: "등록날짜", name: "등록날짜", width: 190 },
  { field: "완료날짜", name: "완료날짜", width: 190 },
  { field: "더보기", name: "더보기", width: 50 },
];

const PayrollLeft = () => {
  // const textInput = useRef();

  // const copy = () => {
  //   const el = textInput.current;
  //   el.select();
  //   document.execCommand("copy");
  // };
  const { payrollState } = useContext(PayrollContext);
  return (
    <StyledPayrollLeft>
      <PayrollTable
        height="627px"
        rows={payrollState.payrollRows}
        // onSendFailed={payrollActions.onSendFailed}
        columns={columns}
        rowsPerPage={12}
        payroll={true}
      />
    </StyledPayrollLeft>
  );
};

export default PayrollLeft;
