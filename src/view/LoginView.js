import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Login from "../component/loginComponent/Login";
import { withRouter } from "react-router";
import axios from "axios";
import UserContext from "../contexts/userInfo";

const StyledLogin = styled.div`
  margin: 0 auto;
  text-align: center;
  font-family: Noto Sans KR;
  font-style: normal;
  width: 400px;
  background-color: #ffffff;
`;

var url = "https://api.himgt.net/login/payMail";

const LoginView = ({ history }) => {
  const { userActions } = useContext(UserContext);
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [isRemember, setIsRemember] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("isRemember")) {
      setIsRemember(true);
      setId(localStorage.getItem("id"));
      setPassword(localStorage.getItem("pass"));
    }
  }, []);

  const onLogin = () => {
    console.log("id", id, "password", password);
    axios.post(url, { htmComId: id, htmComPass: password }).then((response) => {
      console.log("response.data.ResultCodeVo", response.data.ResultCodeVo);
      if (response.data.ResultCodeVo.resultCode !== "200") {
        alert("아이디 또는 비밀번호를 확인하세요.");
      } else {
        userActions.setUserid(id);
        userActions.setUserpw(password);

        // userActions.setSabun(response.data.resultMsg);
        sessionStorage.setItem("userid", id);
        sessionStorage.setItem("userpw", password);
        sessionStorage.setItem(
          "JSESSIONID",
          response.data.PayMailVo.jsessionid
        );
        console.log("JSESSIONID", response.data.PayMailVo.jsessionid);
        sessionStorage.setItem("sabun", response.data.PayMailVo.htmPerSabun);
        history.push({
          pathname: "/",
          state: {
            userid: id,
            userpw: password,
            sabun: response.data.PayMailVo.htmPerSabun,
            JSESSIONID: response.data.PayMailVo.jsessionid,
          },
        });
      }
    });
  };

  const test = 1;

  return test === 1 ? (
    <StyledLogin>
      <Login
        id={id}
        setId={setId}
        password={password}
        setPassword={setPassword}
        isRemember={isRemember}
        setIsRemember={setIsRemember}
        onLogin={onLogin}
      />
    </StyledLogin>
  ) : (
    <UserContext.Consumer>
      {(value) => {
        console.log(value);
        return (
          <StyledLogin>
            <Login
              id={value.userState.userid}
              setId={setId}
              password={password}
              setPassword={setPassword}
              isRemember={isRemember}
              setIsRemember={setIsRemember}
              onLogin={onLogin}
            />
          </StyledLogin>
        );
      }}
    </UserContext.Consumer>
  );
};

export default withRouter(LoginView);
