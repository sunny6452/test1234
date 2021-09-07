import React, { useContext } from "react";
import styled from "styled-components";
import PayrollTable from "../common/PayrollTable";
import PayrollButton from "../common/PayrollButton";
import PayrollContext from "../contexts/payrollData";
import SendPayMailContext from "../contexts/SendPayMail";

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
  max-width: 900px;
  height: 800px;
  transform: translateY(10%);
  margin: 0 auto;
  padding: 0px 10px;
  background: #ffff;
`;

const StyledHistory = styled.div`
  text-align: center;
  margin: auto;
  padding-top: 30px;
`;

//const StyleAllList = styled.div``;

const columns = [
  { name: "NO", width: 50 },
  { name: "사원번호", width: 190 },
  { name: "성명", width: 190 },
  { name: "메시지" },
];

const columns2 = [
  { field: "NO", name: "NO", width: 70 },
  { field: "처리결과", name: "처리결과", width: 190 },
  { field: "처리상태", name: "처리상태", width: 190 },
  { field: "급여일", name: "급여일", width: 190 },
  { field: "등록날짜", name: "등록날짜", width: 190 },
  { field: "완료날짜", name: "완료날짜", width: 190 },
];
const columns3 = [
  { field: "NO", name: "NO", width: 70 },
  { field: "회사명", name: "회사명", width: 190 },
  { field: "급여일", name: "급여일", width: 190 },
  { field: "발송 수", name: "발송 수", width: 190 },
];

const ModalForm = ({ history }) => {
  const { payrollState, payrollActions } = useContext(PayrollContext);
  //  const [historyList, setHistoryList] = useState(false);
  const onClose = (e) => {
    payrollActions.setSendFailedRows([]);
    payrollActions.setTotalResultListRows([]);
    history.push("/payroll");
  };

  return (
    <ModalOverlay>
      <ModalInner>
        {payrollState.historyList ? (
          <SendFailed payrollState={payrollState} onClose={onClose} />
        ) : (
          <AllList
            payrollState={payrollState}
            payrollActions={payrollActions}
            onClose={onClose}
          />
        )}
      </ModalInner>
    </ModalOverlay>
  );
};

export default ModalForm;

const AllList = (props) => {
  return (
    <StyledHistory>
      <div>
        {props.payrollState.totalResultListRows.length !== 0 && (
          <p style={{ fontWeight: "bold" }}>
            {props.payrollState.totalResultListRows[0].htmComNm} 급여명세서 전체
            리스트
          </p>
        )}
        <p>2021년 {props.payrollState.searchMM}월</p>
        <PayrollTable
          height="522px"
          rows={props.payrollState.totalResultListRows}
          columns={columns2}
          rowsPerPage={10}
          onSendFailed={props.payrollActions.onSendFailed}
          //failed={true}
        />
        <PayrollButton buttonName="닫기" onClick={props.onClose} />
      </div>
    </StyledHistory>
  );
};

const SendFailed = (props) => {
  return (
    <StyledHistory>
      <div>
        <p style={{ fontWeight: "bold" }}>
          {props.payrollState.htmComNm} 급여명세서 발송내역
        </p>
        <p>2021년 {props.payrollState.searchMM}월</p>
        <PayrollTable
          height="522px"
          rows={props.payrollState.sendFailedRows}
          columns={columns}
          failed={true}
          rowsPerPage={10}
        />
        <PayrollButton buttonName="닫기" onClick={props.onClose} />
      </div>
    </StyledHistory>
  );
};

export const ConfirmBox = ({ history }) => {
  const { SendPayMailState, SendPayMailActions } =
    useContext(SendPayMailContext);
  const { payrollState, payrollActions } = useContext(PayrollContext);
  const {
    searchyy,
    searchMM,
    //searchpayday,
    selectedComCd,
    selectedDBName,
    selectedPayday,
  } = payrollState;
  // const { htmInsaPerNm, htmInsaPerEmail, htmInsaPertel } = SendPayMailState;
  const { setSelectedComCd, setSelectedDBName, setSelectedPayday } =
    payrollActions;
  return (
    <ModalOverlay>
      <ModalInner>
        <StyledHistory>
          <div>
            <p style={{ fontWeight: "bold" }}>발송 정보를 확인하세요!</p>
            <p>
              {searchyy}년 {searchMM}월
            </p>
            <PayrollTable
              height="522px"
              rows={SendPayMailState.payMailCountList}
              columns={columns3}
              failed={true}
              rowsPerPage={10}
            />
            <PayrollButton
              buttonName="발송"
              onClick={(e) => {
                SendPayMailActions.onSendPayMail(
                  searchyy,
                  searchMM,
                  selectedPayday,
                  selectedComCd,
                  selectedDBName
                );
                history.push("/payroll");
              }}
            />
            <PayrollButton
              buttonName="닫기"
              class="close"
              onClick={(e) => {
                SendPayMailActions.setPayMailCountList([]);
                setSelectedComCd([]);
                setSelectedDBName([]);
                setSelectedPayday([]);
                history.push("/payroll");
              }}
            />
          </div>
        </StyledHistory>
      </ModalInner>
    </ModalOverlay>
  );
};
