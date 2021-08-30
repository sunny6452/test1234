import axios from "axios";
import { createContext, useState } from "react";

const SendPayMailContext = createContext({
  SendPayMailState: {
    payMailCountList: [],
    htmInsaPerNm: "",
    htmInsaPerEmail: "",
    htmInsaPertel: "",
  },
  SendPayMailActions: {
    onSendPayMail: () => {},
    getPayMailPreview: () => {},
    setPayMailCountList: () => {},
    setHtmInsaPerNm: () => {},
    setHtmInsaPerEmail: () => {},
    setHtmInsaPertel: () => {},
  },
});

const SendPayMailProvider = (props) => {
  const [payMailCountList, setPayMailCountList] = useState([]);
  const [htmInsaPerNm, setHtmInsaPerNm] = useState("");
  const [htmInsaPerEmail, setHtmInsaPerEmail] = useState("");
  const [htmInsaPertel, setHtmInsaPertel] = useState("");

  const onSendPayMail = (
    searchyy,
    searchMM,
    selectedPayday,
    htmComCdAry,
    htmComDbAry
  ) => {
    console.log(
      "    searchyy, searchMM, searchpayday, htmInsaPerNm, htmInsaPerEmail, htmInsaPertel, htmComCdAry,  htmComDbAry  :",
      searchyy,
      searchMM,
      selectedPayday,
      htmInsaPerNm,
      htmInsaPerEmail,
      htmInsaPertel,
      htmComCdAry,
      htmComDbAry
    );

    /* var trimCheck = / /gi;
    var emailCheck = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
    if (!emailCheck.test(htmInsaPerEmail)) {
      //이메일 형식체크
      alert("올바른 이메일 형식이 아닙니다.");
      return;
    }
    if (
      htmInsaPerNm.replace(trimCheck, "") === "" ||
      htmInsaPerEmail.replace(trimCheck, "") === "" ||
      htmInsaPertel.replace(trimCheck, "") === ""
    ) {
      //발신자 정보 미입력시
      alert("발신자 정보를 확인하세요.");
      return;
    } */
    console.log("selectedPayday.length : ", selectedPayday.length);
    var confirm = "정말 발송하시겠습니까?";
    window.confirm(confirm) &&
      axios
        .post("https://api.himgt.net/payMail/sendPayMail", {
          htmYy: searchyy,
          htmMm: searchMM,
          htmPayDayAry: selectedPayday,
          htmInsaPerNm: htmInsaPerNm,
          htmInsaPerEmail: htmInsaPerEmail,
          pm003: htmInsaPertel,
          htmComCdAry: htmComCdAry,
          htmComDbAry: htmComDbAry,
        })
        .then((response) => {
          if (response.status !== 200) {
            alert("오류");
          } else {
            const data = response.data;
            alert(data.resultMsg);
          }
        })
        .catch((e) => {
          alert("Error!! 관리자에게 문의하세요.");
        });
  };

  const getPayMailPreview = (
    htmYy,
    htmMm,
    htmComCdAry,
    htmComDbAry,
    htmPayDayAry,
    history
  ) => {
    console.log(
      "    htmYy,    htmMm,    htmComCdAry,    htmComDbAry,    htmPayDayAry,",
      htmYy,
      htmMm,
      htmComCdAry,
      htmComDbAry,
      htmPayDayAry
    );
    var trimCheck = / /gi;
    var emailCheck = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
    if (
      htmInsaPerNm.replace(trimCheck, "") === "" ||
      htmInsaPerEmail.replace(trimCheck, "") === "" ||
      htmInsaPertel.replace(trimCheck, "") === ""
    ) {
      //발신자 정보 미입력시
      alert("발신자 정보를 확인하세요.");
      return;
    }
    if (!emailCheck.test(htmInsaPerEmail)) {
      //이메일 형식체크
      alert("올바른 이메일 형식이 아닙니다.");
      return;
    }

    if (htmComCdAry.length === 0) {
      alert("선택하지 않을 경우 리스트의 모든 회사에 급여명세서가 발송됩니다.");
    }
    axios
      .post("https://api.himgt.net/payMail/getPayMailPreView", {
        htmYy: htmYy,
        htmMm: htmMm,
        htmComCdAry: htmComCdAry,
        htmComDbAry: htmComDbAry,
        htmPayDayAry: htmPayDayAry,
      })
      .then((response) => {
        if (response.status !== 200) {
          alert("오류");
        } else {
          var payrollList = [];
          const data = response.data;
          data.map((item, index) =>
            payrollList.push({
              no: index + 1,
              name: item.htmComNm,
              htmPayDay: item.htmPayDay,
              count: item.htmCnt,
            })
          );
          setPayMailCountList(payrollList);
          console.log("payrollList", payrollList);
        }
        console.log("PayMailCountList", payMailCountList.length);
        history.push("/confirm");
      })
      .catch((e) => {
        alert("Error!! 관리자에게 문의하세요.");
      });
  };

  const value = {
    SendPayMailState: {
      payMailCountList,
      htmInsaPerNm,
      htmInsaPerEmail,
      htmInsaPertel,
    },
    SendPayMailActions: {
      onSendPayMail,
      getPayMailPreview,
      setPayMailCountList,
      setHtmInsaPerNm,
      setHtmInsaPerEmail,
      setHtmInsaPertel,
    },
  };

  return (
    <SendPayMailContext.Provider value={value}>
      {props.children}
    </SendPayMailContext.Provider>
  );
};

export { SendPayMailProvider };

export default SendPayMailContext;
