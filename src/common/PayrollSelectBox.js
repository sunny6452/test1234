import React from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  formControl: {
    width: "200px",
    marginTop: "22px",
    marginLeft: "80px",
    "& label": {
      fontWeight: "bold",
    },
  },
});
const SelectBox = (props) => {
  const classes = useStyles();

  const handleChange = (e, setSelectData) => {
    setSelectData(e.target.value);
  };

  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel>{props.label}</InputLabel>
      <Select
        native
        value={props.selectData}
        label={props.label}
        onChange={(e) => handleChange(e, props.setSelectData)}
      >
        {props.selectList.map((select, index) => (
          <option key={index} value={select}>
            {select}
          </option>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectBox;
