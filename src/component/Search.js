import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import SelectBox from "../common/PayrollSelectBox";
import PayrollButton from "../common/PayrollButton";
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

  const classes = useStyles();
  const [yy, setYy] = useState("2021");
  const [MM, setMM] = useState("01");
  const [payday, setPayday] = useState("전체");
  const [yastatus, setYastatus] = useState("");

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
  const onSearch = (e) => {
    console.log("yy   :", "yy", "MM    :", MM, "htmPayday : ", payday);
    axios
      .post("https://api.himgt.net/payMail/mianLoad", {
        htmYy: "2021",
        htmMm: "06",
        htmPayDay: "전체",
      })
      .then((response) => {
        if (response.status !== 200) {
          alert("오류");
        } else {
          console.log("response", response);
        }
      })
      .catch((e) => {
        alert("Error!! 관리자에게 문의하세요.");
      });
  };

  useEffect(() => {
    axios
      .post("https://api.himgt.net/payMail/searchPayday")
      .then((response) => {
        if (response.status !== 200) {
          alert("오류");
        } else {
          const data = response.data;
          console.log("data", data);
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
        setSelectData={setYy}
        selectData={yy}
      />
      <SelectBox
        label="월"
        selectList={selectMMList}
        setSelectData={setMM}
        selectData={MM}
      />
      <SelectBox
        label="급여일"
        selectList={selectPayday}
        setSelectData={setPayday}
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
        className={classes.textField}
      />
      <PayrollButton class="search" buttonName="검색" onClick={onSearch} />
    </div>
  );
};
export default TopMenu;
