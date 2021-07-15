import React from "react";
import styled from "styled-components";
import PayrollTable from "../common/PayrollTable";

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
  { field: "처리상태", name: "처리상태", width: 190 },
  { field: "등록날짜", name: "등록날짜", width: 190 },
  { field: "완료날짜", name: "완료날짜", width: 190 },
];

const rows = [
  {
    name: "(주)월급날",
    lastName: "오류[1건] / 전체[4]건",
    firstName: "완료",
    age: "2020-04-12",
    test: "2021-05-12",
  },
  {
    name: "이정회계법인",
    lastName: "오류[0건] / 전체[4]건",
    firstName: "처리중",
    age: "2020-04-12",
    test: "2021-05-12",
  },
  {
    name: "(주)연말정산",
    lastName: "오류[0건] / 전체[4]건",
    firstName: "대기중",
    age: "2020-04-12",
    test: "2021-05-12",
  },
  {
    name: "(주)시연",
    lastName: "오류[0건] / 전체[4]건",
    firstName: "대기중",
    age: "2020-04-12",
    test: "2021-05-12",
  },
];

const PayrollLeft = () => {
  return (
    <StyledPayrollLeft>
      <PayrollTable height="627px" rows={rows} columns={columns} />
    </StyledPayrollLeft>
  );
};

export default PayrollLeft;
