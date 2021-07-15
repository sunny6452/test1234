import React, { useEffect } from "react";
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
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(11);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = props.rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;
  useEffect(() => {
    if (props.colsCount === 2) {
      setRowsPerPage(10);
    }
  }, [props]);

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
                  onChange={handleSelectAllClick}
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
            {props.rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                const isItemSelected = isSelected(row.name);
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.name)}
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
                      var onSendFailed = () => {};
                      if (rowIndex === 1) {
                        onSendFailed = () => {
                          props.history.push("./sendfailed");
                        };
                      }
                      return (
                        <TableCell
                          className={classes.bodyCell}
                          key={rowIndex}
                          onClick={onSendFailed}
                        >
                          {item}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10]}
        component="div"
        count={10}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default withRouter(PayrollTable);
