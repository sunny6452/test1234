import axios from "axios";
import { createContext, useState } from "react";

const PayrollContext = createContext({
  payrollState: {
    payrollRows: [],
    sendFailedRows: [],
    selectedComCd: [],
    selectedDBName: [],
    totalResultListRows: [],
    historyList: Boolean,
    yy: "",
    MM: "",
    payday: "",
    searcyy: "",
    searcMM: "",
    searcpayday: "",
    htmComNm: "",
  },
  payrollActions: {
    setPayrollRows: () => {},
    setYy: () => {},
    setMM: () => {},
    setPayday: () => {},
    setSearchyy: () => {},
    setSearchMM: () => {},
    setSearchpayday: () => {},
    setSendFailedRows: () => {},
    onSearch: () => {},
    onSendFailed: () => {},
    setSelectedComCd: () => {},
    setSelectedDBName: () => {},
    setHtmComNm: () => {},
    getTotalResultList: () => {},
    setTotalResultListRows: () => {},
    setHistoryList: () => {},
  },
});

const PayrollProvider = (props) => {
  const [payrollRows, setPayrollRows] = useState([]);
  const [totalResultListRows, setTotalResultListRows] = useState([]);
  const [sendFailedRows, setSendFailedRows] = useState([]);
  const [yy, setYy] = useState("2021"); //단순 셀렉트 표시를 위한 yy
  const [searchyy, setSearchyy] = useState("2021"); //일괄 발송할 때 보내야할 yy
  const [MM, setMM] = useState("01"); //단순 셀렉트 표시를 위한 MM
  const [searchMM, setSearchMM] = useState("01"); //일괄 발송할 때 보내야할 MM
  const [payday, setPayday] = useState("전체"); //단순 셀렉트 표시를 위한 payday
  const [searchpayday, setSearchpayday] = useState("전체"); //일괄 발송할 때 보내야할 payday
  const [selectedComCd, setSelectedComCd] = useState([]); //일괄 발송용
  const [selectedDBName, setSelectedDBName] = useState([]); //일괄 발송용
  const [selectedPayday, setSelectedPayday] = useState([]); //일괄 발송용
  const [htmComNm, setHtmComNm] = useState(""); //발송실패 팝업에 회사이름
  const [historyList, setHistoryList] = useState(false); //모달 뭐띄울지 결정하는애

  const onSearch = (yy, MM, payday, yastatus, searchComNm) => {
    var htmState = 0;
    if (yastatus === "대기") htmState = 1;
    else if (yastatus === "진행중") htmState = 2;
    else if (yastatus === "완료") htmState = 8;
    else if (yastatus === "오류") htmState = 9;
    else if (yastatus === "발송이력없음") htmState = 999;
    axios
      .post("https://api.himgt.net/payMail/mainLoad", {
        htmYy: yy,
        htmMm: MM,
        htmPayDay: payday,
        htmSearchComNm: searchComNm,
        htmState: htmState,
      })
      .then((response) => {
        if (
          response.status !== 200 ||
          response.data.ResultCodeVo.resultCode !== 200
        ) {
          alert("오류");
        } else {
          const data = response.data.PayMailVo;
          console.log("리스트", data);
          var payrollList = [];
          data.map((item) =>
            payrollList.push({
              name: item.htmComNm,
              htm002: item.htm002,
              htm001: item.htm001,
              htmPayDay: item.htmPayDay,
              htmRegDate: item.htmRegDate,
              htmmDate: item.htmmDate,
              htmComCd: item.htmComCd,
              htmSeq: item.htmSeq,
              dbName: item.dbName,
            })
          );
          payrollList.find((item) => {
            if (item.htm001 === "1") {
              item.htm001 = "대기";
            } else if (
              item.htm001 === "2" ||
              item.htm001 === "3" ||
              item.htm001 === "4" ||
              item.htm001 === "5"
            ) {
              item.htm001 = "진행중";
            } else if (item.htm001 === "8") {
              item.htm001 = "완료";
            } else if (item.htm001 === "9") {
              item.htm001 = "오류";
            } else {
              item.htm001 = "발송 이력 없음";
            }
          });
          setPayrollRows(payrollList);
          setSearchyy(yy);
          setSearchMM(MM);
          setSearchpayday(payday);
        }
      })
      .catch((e) => {
        alert("Error!! 관리자에게 문의하세요.");
      });
  };

  const onSendFailed = (htmComCd, htmSeq, htmComNm, checkNum) => {
    console.log(
      "htmComCd : ",
      htmComCd,
      "htmSeq : ",
      htmSeq,
      "checkNum : ",
      checkNum
    );
    if (htmSeq !== null) {
      axios
        .post("https://api.himgt.net/payMail/getResultListLoad", {
          htmComCd: htmComCd,
          htmSeq: htmSeq,
          htmFailFlag: checkNum,
        })
        .then((response) => {
          if (
            response.status !== 200 ||
            response.data.ResultCodeVo.resultCode !== 200
          ) {
            alert("오류");
          } else {
            console.log("response222222", response.data.PayMailVo);
            const data = response.data.PayMailVo;
            var test = [];
            data.map((item, index) =>
              test.push({
                name: index + 1,
                htmPerSabun: item.htmPerSabun,
                htmInsaPerNm: item.htmInsaPerNm,
                htm002: item.htm002,
              })
            );
            setSendFailedRows(test);
            console.log("test", test);
          }
        })
        .catch((e) => {
          alert("Error!! 관리자에게 문의하세요.");
        });
    } else {
      setSendFailedRows([]);
    }
    setHtmComNm(htmComNm);
  };

  const getTotalResultList = (htmComCd, htmYy, htmMm, htmPayDay) => {
    console.log(
      "htmComCd, htmYy, htmMm, htmPayDay",
      htmComCd,
      htmYy,
      htmMm,
      htmPayDay
    );
    axios
      .post("https://api.himgt.net/payMail/getToTalResultListLoad", {
        htmComCd: htmComCd,
        htmYy: htmYy,
        htmMm: htmMm,
        htmPayDay: htmPayDay,
      })
      .then((response) => {
        if (
          response.status !== 200 ||
          response.data.ResultCodeVo.resultCode !== 200
        ) {
          alert("오류");
        } else {
          const data = response.data.PayMailVo;
          console.log("전체리스트", data);
          var payrollList = [];
          data.map((item, index) =>
            payrollList.push({
              name: index + 1,
              htm002: item.htm002,
              htm001: item.htm001,
              htmPayDay: item.htmPayDay,
              htmRegDate: item.htmRegDate,
              htmmDate: item.htmmDate,
              htmComCd: item.htmComCd,
              htmSeq: item.htmSeq,
              dbName: item.dbName,
              htmComNm: item.htmComNm,
            })
          );
          payrollList.find((item) => {
            if (item.htm001 === "1") {
              item.htm001 = "대기";
            } else if (
              item.htm001 === "2" ||
              item.htm001 === "3" ||
              item.htm001 === "4" ||
              item.htm001 === "5"
            ) {
              item.htm001 = "진행중";
            } else if (item.htm001 === "8") {
              item.htm001 = "완료";
            } else if (item.htm001 === "9") {
              item.htm001 = "오류";
            } else {
              item.htm001 = "발송 이력 없음";
            }
          });
          //console.log("payrollList", payrollList);
          setTotalResultListRows(payrollList);
        }
      })
      .catch((e) => {
        alert("Error!! 관리자에게 문의하세요.");
      });
  };

  const value = {
    payrollState: {
      payrollRows,
      sendFailedRows,
      totalResultListRows,
      yy,
      MM,
      payday,
      searchyy,
      searchMM,
      searchpayday,
      selectedComCd,
      selectedDBName,
      selectedPayday,
      htmComNm,
      historyList,
    },
    payrollActions: {
      setPayrollRows,
      setTotalResultListRows,
      setYy,
      setMM,
      setPayday,
      setSearchyy,
      setSearchMM,
      setSearchpayday,
      onSearch,
      onSendFailed,
      setSendFailedRows,
      setSelectedComCd,
      setSelectedDBName,
      setSelectedPayday,
      setHtmComNm,
      getTotalResultList,
      setHistoryList,
    },
  };

  return (
    <PayrollContext.Provider value={value}>
      {props.children}
    </PayrollContext.Provider>
  );
};

export { PayrollProvider };

export default PayrollContext;
