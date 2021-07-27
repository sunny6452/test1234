import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import SelectBox from "../common/PayrollSelectBox";
import PayrollButton from "../common/PayrollButton";
import PayrollContext from "../contexts/payrollData";
import { useEffect } from "react";
import axios from "axios";

var url = "https://api.himgt.net/payMail/searchPayday";

const TopMenu = () => {
  const useStyles = makeStyles({
    menuc: {
      marginLeft: "30px",
      marginTop: "30px",
      width: "1860px",
      height: "100px",
      backgroundColor: "#ffff",
      borderRadius: "10px",
      //display: "flex",
      justifyContent: "space-between",
    },
    textField: {
      marginLeft: "80px",
      width: "220px",
      height: "48px",
      marginTop: "25px",
      borderRadius: "5.33333px 5.33333px 0px 0px",
      "& .MuiFilledInput-root": { backgroundColor: "#f5f5f5", height: 48 },
    },
  });
  const { payrollState, payrollActions } = useContext(PayrollContext);
  const { yy, MM, payday } = payrollState;
  const classes = useStyles();
  const [yastatus, setYastatus] = useState("전체");
  const [searchComNm, setSearchComNm] = useState("");
  const [selectPayday, setSelectPayday] = useState(["전체"]);
  const selectYYList = [2021, 2020, 2019, 2018];
  const selectMMList = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];
  const selectYastatusList = ["전체", "대기", "진행중", "완료", "오류"];

  useEffect(() => {
    //payrollActions.onSearch(yy, MM, payday, yastatus);
    axios
      .post("https://api.himgt.net/payMail/searchPayday")
      .then((response) => {
        if (response.status !== 200) {
          alert("오류");
        } else {
          const data = response.data;
          //console.log("data", data);
          var getPayday = ["전체"];
          data.map((item) => getPayday.push(item.htmPayDay));
          setSelectPayday(getPayday);
        }
      })
      .catch((e) => {
        alert("Error!! 관리자에게 문의하세요.");
      });
  }, []);

  return (
    <div className={classes.menuc}>
      <SelectBox
        label="귀속년"
        selectList={selectYYList}
        setSelectData={payrollActions.setYy}
        selectData={yy}
      />
      <SelectBox
        label="월"
        selectList={selectMMList}
        setSelectData={payrollActions.setMM}
        selectData={MM}
      />
      <SelectBox
        label="급여일"
        selectList={selectPayday}
        setSelectData={payrollActions.setPayday}
        selectData={payday}
      />
      <SelectBox
        label="처리상태"
        selectList={selectYastatusList}
        setSelectData={setYastatus}
        selectData={yastatus}
      />
      <TextField
        label="회사명"
        variant="filled"
        value={searchComNm}
        onChange={(e) => {
          setSearchComNm(e.target.value);
        }}
        className={classes.textField}
      />
      <PayrollButton
        class="search"
        buttonName="검색"
        onClick={(e) =>
          payrollActions.onSearch(yy, MM, payday, yastatus, searchComNm)
        }
      />
    </div>
  );
};
export default TopMenu;
