import React, { useContext } from "react";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import SendPayMailContext from "../contexts/SendPayMail";
import PayrollContext from "../contexts/payrollData";
import { withRouter } from "react-router-dom";
const StyledPayrollRight = styled.div`
  //  border: 1px solid black;
  height: 100%;
  float: right;
  width: 820px;
  background: #ffffff;
  box-shadow: 0px 5px 15px rgb(0 0 0 / 15%);
  border-radius: 10px;
  text-align: center;
  p {
    float: left;
    margin-left: 20px;
  }
  span {
    vertical-align: middle;
    display: table-cell;
  }
  .container {
    padding: 30px 20px 20px 20px;
  }
  .guideBox {
    border-radius: 10px;
    background-color: #f5f5f5;
    height: 400px;
    margin-top: 100px;
    display: table;
    width: 780px;
    text-align: left;
    & li {
      margin-left: 20px;
    }
  }
`;
const useStyles = makeStyles({
  textField: {
    //position: "absolute",
    float: "left",
    width: "180px",
    height: "48px",
    marginLeft: "10px",
    borderRadius: "5.33333px 5.33333px 0px 0px",
    "& .MuiFilledInput-root": { backgroundColor: "#f5f5f5", height: 48 },
  },
  searchButton: {
    width: "105px",
    height: "48px",
    marginTop: "26px",
    backgroundColor: "#1976D2",
    "&.MuiButton-root:hover": {
      background: "#1976D2",
      fontWeight: "bold",
    },
  },
});
const PayrollRight = (props) => {
  const classes = useStyles();
  const { SendPayMailState, SendPayMailActions } =
    useContext(SendPayMailContext);
  const { payrollState } = useContext(PayrollContext);
  const {
    searchyy,
    searchMM,
    //searchpayday,
    selectedComCd,
    selectedDBName,
    selectedPayday,
  } = payrollState;
  // const [htmInsaPerNm, setHtmInsaPerNm] = useState("");
  // const [htmInsaPerEmail, setHtmInsaPerEmail] = useState("");
  // const [htmInsaPertel, setHtmInsaPertel] = useState("");
  const { htmInsaPerNm, htmInsaPerEmail, htmInsaPertel } = SendPayMailState;
  const { setHtmInsaPerNm, setHtmInsaPerEmail, setHtmInsaPertel } =
    SendPayMailActions;

  return (
    <StyledPayrollRight>
      <div className="container">
        <div style={{ textAlign: "left", fontWeight: "bold" }}>
          [발신자 정보]
        </div>
        <div style={{ marginTop: 20 }}>
          <p>이름</p>
          <TextField
            label="ex)홍길동"
            variant="filled"
            value={htmInsaPerNm}
            className={classes.textField}
            onChange={(e) => {
              setHtmInsaPerNm(e.target.value);
            }}
          />
          <p>이메일</p>
          <TextField
            label="ex)xxxx@payday.co.kr"
            variant="filled"
            className={classes.textField}
            value={htmInsaPerEmail}
            onChange={(e) => {
              setHtmInsaPerEmail(e.target.value);
            }}
          />
          <p>전화번호</p>
          <TextField
            label="ex)010-****-****"
            variant="filled"
            className={classes.textField}
            value={htmInsaPertel}
            onChange={(e) => {
              setHtmInsaPertel(e.target.value);
            }}
          />
        </div>
        <div className="guideBox">
          <span>
            <ul>
              <span>급여명세서 일괄발송기능 안내입니다.</span>
              <br />
              <li>급여대장(기본대장)에 대해서만 발송됩니다.</li>
              <li>
                전달유형은 메일+알림톡이며, 메일은 '기본' 형식으로 발송됩니다.
              </li>
              <li>
                급여대장에 마감처리가 되어있는 경우 보이기마감 유무와 상관없이
                발송됩니다.
              </li>
              <li>
                선택한 지급일에 포함되는 인원이 없는 경우 '대상자 없음'으로
                표기됩니다.
              </li>
            </ul>
          </span>
        </div>
      </div>
      <Button
        variant="contained"
        color="primary"
        className={classes.searchButton}
        onClick={
          (e) => {
            SendPayMailActions.getPayMailPreview(
              searchyy,
              searchMM,
              selectedComCd,
              selectedDBName,
              selectedPayday,
              props.history
            );
            //props.history.push("/confirm");
          }
          // SendPayMailActions.onSendPayMail(
          //   searchyy,
          //   searchMM,
          //   selectedPayday,
          //   htmInsaPerNm,
          //   htmInsaPerEmail,
          //   htmInsaPertel,
          //   selectedComCd,
          //   selectedDBName
          // )
        }
      >
        일괄발송
      </Button>
    </StyledPayrollRight>
  );
};

export default withRouter(PayrollRight);
