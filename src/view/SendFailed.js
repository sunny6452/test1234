import React, { useContext } from "react";
import styled from "styled-components";
import PayrollTable from "../common/PayrollTable";
import PayrollButton from "../common/PayrollButton";
import PayrollContext from "../contexts/payrollData";

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
  max-width: 800px;
  height: 800px;
  transform: translateY(10%);
  margin: 0 auto;
  padding: 0px 10px;
  background: #ffff;
`;

const StyledStart = styled.div`
  text-align: center;
  margin: auto;
  padding-top: 30px;
`;
const columns = [
  { name: "NO", width: 50 },
  { name: "사원번호", width: 150 },
  { name: "성명", width: 150 },
  { name: "메시지" },
];

const rows = [
  {
    no: "1",
    sabun: "20210615",
    name: "김성진",
    message: "이메일 전송 실패(미등록)",
  },
  {
    no: "2",
    sabun: "20210616",
    name: "한단비",
    message: 42,
  },
  {
    no: "3",
    sabun: "20210617",
    name: "유성욱",
    message: 45,
  },
  {
    no: "4",
    sabun: "20210618",
    name: "김선희",
    message: 16,
  },
];
const SendFailed = ({ history }) => {
  const { payrollState, payrollActions } = useContext(PayrollContext);
  const onClose = (e) => {
    console.log("test");
    history.push("./");
  };

  return (
    <ModalOverlay>
      <ModalInner>
        <StyledStart>
          <div>
            <p style={{ fontWeight: "bold" }}>
              {payrollState.htmComNm} 급여명세서 발송 실패내역
            </p>
            <p>2021년 {payrollState.searchMM}월</p>
            <PayrollTable
              height="500px"
              rows={payrollState.sendFailedRows}
              columns={columns}
              failed={true}
            />
            <PayrollButton buttonName="닫기" onClick={onClose} />
          </div>
        </StyledStart>
      </ModalInner>
    </ModalOverlay>
  );
};

export default SendFailed;
