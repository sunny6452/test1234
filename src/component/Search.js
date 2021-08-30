import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import SelectBox from "../common/PayrollSelectBox";
import PayrollButton from "../common/PayrollButton";
import PayrollContext from "../contexts/payrollData";
import Checkbox from "@material-ui/core/Checkbox";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import { useEffect } from "react";
import axios from "axios";

var url = "https://api.himgt.net/payMail/searchPayday";
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

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
      //marginLeft: "80px",
      width: "450px",
      maxHeight: "57px",
      marginTop: "25px",
      borderRadius: "5.33333px 5.33333px 0px 0px",
      overflowY: "scroll",

      "& .MuiFilledInput-root": {
        backgroundColor: "#f5f5f5",
        maxHeight: "57px",
      },
    },
    Autocomplete: {
      position: "absolute",
      top: "85px",
      left: "1080px",
    },
  });
  const { payrollState, payrollActions } = useContext(PayrollContext);
  const { yy, MM, payday, totalResultListRows } = payrollState;
  const classes = useStyles();
  const [yastatus, setYastatus] = useState("전체");
  const [searchComNm, setSearchComNm] = useState([]);
  const [selectPayday, setSelectPayday] = useState(["전체"]);
  const [autoCompleteList, setAutoCompleteList] = useState([]);
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
  const selectYastatusList = [
    "전체",
    "대기",
    "진행중",
    "완료",
    "오류",
    "발송이력없음",
  ];
  const [test, setTest] = useState([]);

  useEffect(() => {
    console.log(
      "sessionStorage.getItem('sabun')",
      sessionStorage.getItem("sabun")
    );
    //payrollActions.onSearch(yy, MM, payday, yastatus);
    axios
      .post("https://api.himgt.net/payMail/searchPayday")
      .then((response) => {
        if (
          response.status !== 200 ||
          response.data.ResultCodeVo.resultCode !== 200
        ) {
          console.log(
            "response.status !== 200",
            response.status !== 200,
            response.data
          );
          alert("오류");
        } else {
          const data = response.data.PayMailVo;
          //console.log("data", data);
          var getPayday = ["전체"];
          data.map((item) => getPayday.push(item.htmPayDay));
          setSelectPayday(getPayday);
        }
      })
      .catch((e) => {
        alert("Error!! 관리자에게 문의하세요.");
      });
    axios
      .post("https://api.himgt.net/payMail/getAutoComplete")
      .then((response) => {
        if (
          response.status !== 200 ||
          response.data.ResultCodeVo.resultCode !== 200
        ) {
          alert("오류");
          console.log(
            "response.status !== 2002222222222",
            response.status !== 200,
            response.data
          );
        } else {
          console.log(" response.data", response.data.PayMailVo);
          const data = response.data.PayMailVo;
          console.log("data", data);
          setAutoCompleteList(data);
          //setSearchComNm(data);
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
      {/* <TextField
        label="회사명"
        variant="filled"
        value={searchComNm}
        onChange={(e) => {
          setSearchComNm(e.target.value);
        }}
        className={classes.textField}
      /> */}
      <Autocomplete
        multiple
        className={classes.Autocomplete}
        id="checkboxes-tags-demo"
        //limitTags={1}
        options={autoCompleteList}
        disableCloseOnSelect
        getOptionLabel={(option) => option}
        renderOption={(option, { selected }) => {
          // console.log("test", searchComNm);
          //console.log("option", option);
          //var test2 = [];
          // selected === true
          //   ? setSearchComNm(searchComNm.push(option))
          //   : setSearchComNm(searchComNm.slice(option));
          // console.log("test", searchComNm);
          //setSearchComNm(test);
          return (
            <React.Fragment>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={selected}
              />
              {option}
            </React.Fragment>
          );
        }}
        // value={searchComNm}
        // style={{ width: 500 }}
        renderInput={(params) => {
          // console.log("param", params);
          return (
            <TextField
              {...params}
              className={classes.textField}
              variant="outlined"
              label="회사명"

              //placeholder="Favorites"
            />
          );
        }}
      />
      <PayrollButton
        class="search"
        buttonName="검색"
        onClick={(e) => {
          payrollActions.onSearch(yy, MM, payday, yastatus, searchComNm);
          //  payrollActions.setSelectedDBName([]);
          //   payrollActions.setSelectedComCd([]);
        }}
      />
    </div>
  );
};
export default TopMenu;
