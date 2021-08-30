import React, { useContext, useState } from "react";
import PayrollContext from "../contexts/payrollData";
import Table from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import Paper from "@material-ui/core/Paper";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import Checkbox from "@material-ui/core/Checkbox";
import { makeStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import PayrollButton from "./PayrollButton";

const useStyles = makeStyles({
  headerCell: {
    backgroundColor: "#FFFF",
    borderRight: "1px solid #E5E5E5;",
    fontSize: "12px",
    textAlign: "center",
    fontWeight: "bold",
    height: "44px",
    color: "#000000",
  },
  firstHeaderCell: {
    width: "190px",
    textAlign: "left",
    paddingLeft: "16px",
  },
  bodyCell: {
    textAlign: "center",
    fontSize: "12px",
    height: "46px",
    color: "#000000",
  },
});

const PayrollTable = (props) => {
  const classes = useStyles();
  const [selectedName, setSelectedName] = React.useState([]);
  const [selectedNum, setSelectedNum] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(props.rowsPerPage);
  const { payrollState, payrollActions } = useContext(PayrollContext);
  const { setSelectedComCd, setSelectedDBName, setSelectedPayday } =
    payrollActions;
  const { selectedComCd, selectedDBName, selectedPayday } = payrollState;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, rowsPerPage));
    setPage(0);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelectNum = props.rows.map((n, index) => index);
      const newSelectedNames = props.rows.map((n) => n.name);
      const newSelectedComCds = props.rows.map((n) => n.htmComCd);
      const newSelectedDbNames = props.rows.map((n) => n.dbName);
      const newSelectedPayday = props.rows.map((n) => n.htmPayDay);

      setSelectedNum(newSelectNum);
      setSelectedName(newSelectedNames);
      if (!props.failed) {
        setSelectedComCd(newSelectedComCds);
        setSelectedDBName(newSelectedDbNames);
        setSelectedPayday(newSelectedPayday);
      }

      return;
    }

    setSelectedNum([]);
    setSelectedName([]);
    if (props.payroll) {
      setSelectedComCd([]);
      setSelectedDBName([]);
      setSelectedPayday([]);
    }
  };

  const handleClick = (event, name, htmComCd, dbName, htmPayDay, index) => {
    const selectedIndex = selectedNum.indexOf(index);

    let newSelectedName = [];
    let newSelectedComCd = [];
    let newSelectedDBName = [];
    let newSelectedPayday = [];
    //이름이 중복된 게 많아서 index 로 체크박스 체크를 결정함
    let newSelectNum = [];

    if (selectedIndex === -1) {
      //체크박스 체크를 위해
      newSelectNum = newSelectNum.concat(selectedNum, index);
      //체크했을 때 일괄발송을 위한 ComCd, Name, DB이름 저장
      newSelectedName = newSelectedName.concat(selectedName, name);
      newSelectedComCd = newSelectedComCd.concat(selectedComCd, htmComCd);
      newSelectedDBName = newSelectedDBName.concat(selectedDBName, dbName);
      newSelectedPayday = newSelectedPayday.concat(selectedPayday, htmPayDay);
    } else if (selectedIndex === 0) {
      newSelectNum = newSelectNum.concat(selectedNum.slice(1));
      newSelectedName = newSelectedName.concat(selectedName.slice(1));
      newSelectedComCd = newSelectedComCd.concat(selectedComCd.slice(1));
      newSelectedDBName = newSelectedDBName.concat(selectedDBName.slice(1));
      newSelectedPayday = newSelectedPayday.concat(selectedPayday.slice(1));
    } else if (selectedIndex === selectedNum.length - 1) {
      newSelectNum = newSelectNum.concat(selectedNum.slice(0, -1));
      newSelectedName = newSelectedName.concat(selectedName.slice(0, -1));
      newSelectedComCd = newSelectedComCd.concat(selectedComCd.slice(0, -1));
      newSelectedDBName = newSelectedDBName.concat(selectedDBName.slice(0, -1));
      newSelectedPayday = newSelectedPayday.concat(selectedPayday.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectNum = newSelectNum.concat(
        selectedNum.slice(0, selectedIndex),
        selectedNum.slice(selectedIndex + 1)
      );
      newSelectedName = newSelectedName.concat(
        selectedName.slice(0, selectedIndex),
        selectedName.slice(selectedIndex + 1)
      );
      newSelectedComCd = newSelectedComCd.concat(
        selectedComCd.slice(0, selectedIndex),
        selectedComCd.slice(selectedIndex + 1)
      );
      newSelectedDBName = newSelectedDBName.concat(
        selectedDBName.slice(0, selectedIndex),
        selectedDBName.slice(selectedIndex + 1)
      );
      newSelectedPayday = newSelectedPayday.concat(
        selectedPayday.slice(0, selectedIndex),
        selectedPayday.slice(selectedIndex + 1)
      );
    }
    setSelectedNum(newSelectNum);
    setSelectedName(newSelectedName);
    if (props.payroll) {
      //발송실패 페이지에서는 db, comcd 정보를 저장하지 않음.
      setSelectedComCd(newSelectedComCd);
      setSelectedDBName(newSelectedDBName);
      setSelectedPayday(newSelectedPayday);
    }
  };

  const isSelected = (index) => selectedNum.indexOf(index) !== -1;

  return (
    <Paper style={{ borderRadius: 10, overflowY: "hidden" }}>
      <TableContainer style={{ height: props.height }}>
        <Table style={{ width: props.containerWidth }} padding="none">
          <TableHead>
            <TableRow>
              {props.payroll && (
                <TableCell
                  align="center"
                  padding="checkbox"
                  style={{ height: 50 }}
                >
                  <Checkbox
                    size="small"
                    color="primary"
                    onChange={(e) => {
                      handleSelectAllClick(e);
                    }}
                    inputProps={{ "aria-label": "sall desserts" }}
                  />
                </TableCell>
              )}
              {props.columns.map((col, index) => {
                return (
                  <TableCell
                    key={index}
                    className={classes.headerCell}
                    style={{ width: col.width, borderRight: "none" }}
                  >
                    {col.name}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {props.rows !== undefined ? (
              props.rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(index);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      hover
                      onClick={(event) =>
                        handleClick(
                          event,
                          row.name,
                          row.htmComCd,
                          row.dbName,
                          row.htmPayDay,
                          index
                        )
                      }
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={index}
                      selected={isItemSelected}
                    >
                      {props.payroll && (
                        <TableCell align="center" padding="checkbox">
                          <Checkbox
                            color="primary"
                            size="small"
                            checked={isItemSelected}
                            inputProps={{
                              "aria-labelledby": labelId,
                            }}
                          />
                        </TableCell>
                      )}
                      {Object.values(row).map((item, rowIndex) => {
                        //두번째 행 클릭시 발송실패 페이지 보이게처리
                        if (rowIndex === 1) {
                          var strArray = [];
                          if (item !== null) {
                            strArray = item.split("/");

                            var errorStr = strArray[0];
                          }
                          if (strArray[1] !== undefined)
                            errorStr = errorStr + "/";
                          return (
                            <TableCell
                              className={classes.bodyCell}
                              key={rowIndex}
                            >
                              <span
                                onClick={(e) => {
                                  if (!props.failed) {
                                    payrollActions.onSendFailed(
                                      row.htmComCd,
                                      row.htmSeq,
                                      row.name,
                                      1
                                    );
                                    payrollActions.setHistoryList(true);
                                    props.history.push("./history");
                                  }
                                }}
                              >
                                {errorStr}
                              </span>
                              <span
                                onClick={(e) => {
                                  if (!props.failed) {
                                    payrollActions.onSendFailed(
                                      row.htmComCd,
                                      row.htmSeq,
                                      row.name,
                                      0
                                    );
                                    payrollActions.setHistoryList(true);
                                    props.history.push("./history");
                                  }
                                }}
                              >
                                {strArray[1]}
                              </span>
                              {/* {item} */}
                            </TableCell>
                          );
                        } else if (rowIndex <= 5) {
                          //5번째 행까지만 보이게 처리
                          return (
                            <TableCell
                              className={classes.bodyCell}
                              key={rowIndex}
                            >
                              {item}
                            </TableCell>
                          );
                        }
                      })}
                      {props.payroll && (
                        <TableCell className={classes.bodyCell}>
                          <PayrollButton
                            class="more"
                            buttonName="더보기"
                            onClick={(e) => {
                              console.log("row.htmComCd", row.htmComCd);
                              payrollActions.getTotalResultList(
                                row.htmComCd,
                                payrollState.searchyy,
                                payrollState.searchMM,
                                row.htmPayDay
                              );
                              payrollActions.setHistoryList(false);
                              props.history.push("./history");
                            }}
                          />
                        </TableCell>
                      )}
                    </TableRow>
                  );
                })
            ) : (
              <TableRow></TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10]}
        component="div"
        //  count={props.rows.length}
        count={props.rows.length} //전체 데이터 수 표시
        rowsPerPage={rowsPerPage} //테이블 몇 열까지 표시할 건지
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default withRouter(PayrollTable);

/*
const HistoryTable = (props) => {
  const classes = useStyles();

  return (
    <Paper style={{ borderRadius: 10, overflowY: "hidden" }}>
      <TableContainer style={{ height: props.height }}>
        <Table style={{ width: props.containerWidth }} padding="none">
          <TableHead>
            <TableRow>
              <TableCell
                align="center"
                padding="checkbox"
                style={{ height: 50 }}
              >
                <Checkbox
                  size="small"
                  color="primary"
                  onChange={(e) => {
                    props.handleSelectAllClick(e);
                  }}
                  inputProps={{ "aria-label": "sall desserts" }}
                />
              </TableCell>
              {props.columns.map((col, index) => {
                return (
                  <TableCell
                    key={index}
                    className={classes.headerCell}
                    style={{ width: col.width, borderRight: "none" }}
                  >
                    {col.name}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {props.rows !== undefined ? (
              props.rows
                .slice(
                  props.page * props.rowsPerPage,
                  props.page * props.rowsPerPage + props.rowsPerPage
                )
                .map((row, index) => {
                  const isItemSelected = props.isSelected(index);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      hover
                      onClick={(event) =>
                        props.handleClick(
                          event,
                          row.name,
                          row.htmComCd,
                          row.dbName,
                          row.htmPayDay,
                          index
                        )
                      }
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={index}
                      selected={isItemSelected}
                    >
                      <TableCell align="center" padding="checkbox">
                        <Checkbox
                          color="primary"
                          size="small"
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell>
                      {Object.values(row).map((item, rowIndex) => {
                        //두번째 행 클릭시 발송실패 페이지 보이게처리
                        if (rowIndex === 1) {
                          var strArray = [];
                          if (item !== null) {
                            strArray = item.split("/");
                            console.log("strArray ", strArray[0], strArray[1]);
                            var errorStr = strArray[0];
                          }
                          if (strArray[1] !== undefined)
                            errorStr = errorStr + "/";
                          return (
                            <TableCell
                              className={classes.bodyCell}
                              key={rowIndex}
                            >
                              <span
                                onClick={(e) => {
                                  !props.failed &&
                                    props.onSendFailed(
                                      row.htmComCd,
                                      row.htmSeq,
                                      row.name,
                                      1
                                    );
                                  props.history.push("./history");
                                }}
                              >
                                {errorStr}
                              </span>
                              <span
                                onClick={(e) => {
                                  !props.failed &&
                                    props.onSendFailed(
                                      row.htmComCd,
                                      row.htmSeq,
                                      row.name,
                                      0
                                    );
                                  props.history.push("./history");
                                }}
                              >
                                {strArray[1]}
                              </span>
                              {/* {item} 
                            </TableCell>
                          );
                        } else if (rowIndex <= 5) {
                          //5번째 행까지만 보이게 처리
                          return (
                            <TableCell
                              className={classes.bodyCell}
                              key={rowIndex}
                            >
                              {item}
                            </TableCell>
                          );
                        }
                      })}
                    </TableRow>
                  );
                })
            ) : (
              <TableRow></TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10]}
        component="div"
        //  count={props.rows.length}
        count={props.rows.length} //전체 데이터 수 표시
        rowsPerPage={props.rowsPerPage} //테이블 몇 열까지 표시할 건지
        page={props.page}
        onChangePage={props.handleChangePage}
        onChangeRowsPerPage={props.handleChangeRowsPerPage}
      />
    </Paper>
  );
};
*/
