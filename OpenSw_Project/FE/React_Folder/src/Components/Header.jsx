import { useState } from "react";
import "./Header.css";
function Header(props) {
  const isLogin = props.LoginInfo;
  const toggleLogin = props.toggleLogin;
  const name = "장호성";
  return (
    <div className="headerContainer">
      <h2>영화 리뷰 사이트 </h2>

      <div className="Group right">
      <a className="right word" href="#">홈</a>
      <div className="right word">{name} 님</div>
      <a className="right word" href="#">
        마이페이지
      </a>

        {isLogin ? (
          <button className="loginBtn" onClick={toggleLogin}>
            Login
          </button>
        ) : (
          <button className="logoutBtn" onClick={toggleLogin}>
            Logout
          </button>
        )}
        <button className="signUpBtn"> 회원 가입</button>
      </div>
    </div>
  );
}

export default Header;
