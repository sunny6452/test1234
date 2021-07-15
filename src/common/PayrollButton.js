import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  button: {
    width: "105px",
    height: "48px",
    marginTop: "26px",
    backgroundColor: "#1976D2",
    "&.MuiButton-root:hover": {
      background: "#1976D2",
      fontWeight: "bold",
    },
  },
  search: {
    float: "right",
    marginRight: 50,
  },
});

const PayrollButton = (props) => {
  const classes = useStyles();
  var classNames = "";
  if (props.class === "search") classNames = classes.search;
  return (
    <Button
      variant="contained"
      color="primary"
      className={`${classNames} ${classes.button}`}
      onClick={(e) => {
        props.onClick();
      }}
    >
      {props.buttonName}
    </Button>
  );
};

export default PayrollButton;
