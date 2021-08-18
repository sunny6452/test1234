import axios from "axios";
import { createContext } from "react";

const SendPayMailContext = createContext({
  SendPayMailState: {},
  SendPayMailActions: {
    onSendPayMail: () => {},
  },
});

const SendPayMailProvider = (props) => {
  const onSendPayMail = (
    searchyy,
    searchMM,
    selectedPayday,
    htmInsaPerNm,
    htmInsaPerEmail,
    htmInsaPertel,
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
    var trimCheck = / /gi;
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
    }
    console.log("selectedPayday.length : ", selectedPayday.length);
    var confirm =
      "년도 : " +
      searchyy +
      "   월 : " +
      searchMM +
      "   급여일 : " +
      selectedPayday +
      " \n" +
      "선택하신 정보로 발송하시겠습니까?";
    if (selectedPayday.length === 0)
      confirm =
        "년도 : " +
        searchyy +
        "   월 : " +
        searchMM +
        " 전체 리스트가 발송됩니다.    \n" +
        "선택하신 정보로 발송하시겠습니까?";
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

  const value = {
    SendPayMailState: {},
    SendPayMailActions: { onSendPayMail },
  };

  return (
    <SendPayMailContext.Provider value={value}>
      {props.children}
    </SendPayMailContext.Provider>
  );
};

export { SendPayMailProvider };

export default SendPayMailContext;
