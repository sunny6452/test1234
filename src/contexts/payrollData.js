import axios from "axios";
import { createContext, useState } from "react";

const PayrollContext = createContext({
  payrollState: {
    payrollRows: [],
    sendFailedRows: [],
    selectedComCd: [],
    selectedDBName: [],
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
  },
});

const PayrollProvider = (props) => {
  const [payrollRows, setPayrollRows] = useState([]);
  const [sendFailedRows, setSendFailedRows] = useState([]);
  const [yy, setYy] = useState("2021"); //단순 셀렉트 표시를 위한 yy
  const [searchyy, setSearchyy] = useState("2021"); //일괄 발송할 때 보내야할 yy
  const [MM, setMM] = useState("01"); //단순 셀렉트 표시를 위한 MM
  const [searchMM, setSearchMM] = useState("01"); //일괄 발송할 때 보내야할 MM
  const [payday, setPayday] = useState("전체"); //단순 셀렉트 표시를 위한 payday
  const [searchpayday, setSearchpayday] = useState("전체"); //일괄 발송할 때 보내야할 payday
  const [selectedComCd, setSelectedComCd] = useState([]); //일괄 발송용
  const [selectedDBName, setSelectedDBName] = useState([]); //일괄 발송용
  const [htmComNm, setHtmComNm] = useState(""); //발송실패 팝업에 회사이름

  const onSearch = (yy, MM, payday, yastatus, searchComNm) => {
    var htmState = 0;
    if (yastatus === "대기") htmState = 1;
    else if (yastatus === "진행중") htmState = 2;
    else if (yastatus === "완료") htmState = 8;
    else if (yastatus === "오류") htmState = 9;
    axios
      .post("https://api.himgt.net/payMail/mainLoad", {
        htmYy: yy,
        htmMm: MM,
        htmPayDay: payday,
        htmSearchComNm: searchComNm,
        htmState: htmState,
      })
      .then((response) => {
        if (response.status !== 200) {
          alert("오류");
        } else {
          const data = response.data;
          console.log("리스트", data);
          var payrollList = [];
          data.map((item) =>
            payrollList.push({
              name: item.htmComNm,
              htm002: item.htm002,
              htm001: item.htm001,
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

  const onSendFailed = (htmComCd, htmSeq, htmComNm) => {
    console.log("htmComCd : ", htmComCd, "htmSeq : ", htmSeq);
    if (htmSeq !== null) {
      axios
        .post("https://api.himgt.net/payMail/getFailListLoad", {
          htmComCd: htmComCd,
          htmSeq: htmSeq,
        })
        .then((response) => {
          if (response.status !== 200) {
            alert("오류");
          } else {
            console.log("response222222", response.data);
            const data = response.data;
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

  const value = {
    payrollState: {
      payrollRows,
      sendFailedRows,
      yy,
      MM,
      payday,
      searchyy,
      searchMM,
      searchpayday,
      selectedComCd,
      selectedDBName,
      htmComNm,
    },
    payrollActions: {
      setPayrollRows,
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
      setHtmComNm,
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
