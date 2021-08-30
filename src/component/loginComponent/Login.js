import { makeStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import React, { useCallback } from 'react';
import LoginInput from './LoginInput';
import { lcst } from '../../common/globalFunction';

const Login = ({
  onLogin,
  id,
  password,
  setId,
  setPassword,
  isRemember,
  setIsRemember,
  reset,
}) => {
  const useStyles = makeStyles(() => ({
    Section: {
      position: 'absolute',
      width: '400px',
      backgroundColor: '#ffffff',
      borderRadius: '10px',
    },
    loginSection: {
      height: '350px',
      top: '190px',
      borderRadius: '10px',
      backgroundColor: '#ffffff',
    },
    loginTitle: {
      position: 'absolute',
      marginTop: '55px',
      marginLeft: '70px',
      fontWeight: 'bold',
      fontSize: '18px',
      lineHeight: '26px',
      letterSpacing: '-0.01em',
    },
    checkedTitle: {
      fontSize: '14px',
      lineHeight: '26px',
      color: '#666666',
    },
    searchButton: {
      '&.MuiButton-root:hover': {
        backgroundColor: '#3474E4',
        fontWeight: 'bold',
      },
      width: 270,
      height: 45,
      backgroundColor: '#3474E4',
      borderRadius: 10,
      marginTop: 10,
      fontSize: 16,
    },
    loginChecked: {
      marginLeft: -125,
    },
  }));

  const classes = useStyles();
  return (
    <article className={`${classes.Section} ${classes.loginSection} `}>
      <h3 className={classes.loginTitle}>HTMS 계정 정보</h3>
      <LoginInput
        reset={reset}
        setUser={setId}
        lcst={lcst}
        userValue={id}
        label="아이디"
        inputName="id"
      />
      <LoginInput
        reset={reset}
        setUser={setPassword}
        lcst={lcst}
        userValue={password}
        label="비밀번호"
        inputName="pass"
      />
      <Checkbox
        size="small"
        className={classes.loginChecked}
        inputProps={{ 'aria-label': 'checkbox with small size' }}
        checked={isRemember}
        onChange={useCallback(
          (e) => {
            setIsRemember((isRemember) => e.target.checked);
            lcst('isRemember', e.target.checked);
            if (!e.target.checked) lcst('', '', true);
          },
          [setIsRemember],
        )}
      />
      <span className={classes.checkedTitle}>아이디/비밀번호 저장</span>
      <br />
      <Button
        variant="contained"
        className={classes.searchButton}
        color="primary"
        disableElevation
        onClick={(e) => {
          onLogin(id, password);
        }}
      >
        조회하기
      </Button>
    </article>
  );
};

export default React.memo(Login);
