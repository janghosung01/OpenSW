import { useNavigate } from "react-router-dom";
import axios from "axios";
import React, { useState } from "react";
function Login({ onLoginSuccess }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    loginId: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { loginId, password } = formData;

    if (loginId.trim() === "" || password.trim() === "") {
      alert("모든정보 입력바람");
      return;
    }

    console.log(loginId);
    console.log(password);
    try {
      const response = await axios.post(
        `https://movie-api-test-latest.onrender.com/login`,
        {
          userId: loginId,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      //console.log(response.data);
      alert("로그인 성공!");

      // response.data 에서 사용자 정보 구조에 맞게 꺼내기
      // 예: { loginId, keyId, name, gender } 포함되어 있다고 가정
      const user = {
        loginId: response.data.userId,
        keyId: response.data.id,
        name: response.data.name,
        gender: response.data.gender,
      };
      // 로그인 성공 시 (예시)
      onLoginSuccess(user);
      navigate("/"); // 로그인 후 홈으로 이동

      navigate("/"); // 회원가입 성공 후 홈(또는 원하는 경로)으로 이동
    } catch (error) {
      console.error(error);
      alert(`로그인 실패! ${error.response.data.detail}`);
    }
  };

  return (
    <form id="mentee" onSubmit={handleSubmit}>
      <h1>Login</h1>
      <label htmlFor="loginId">Login ID</label>
      <input
        id="loginId"
        name="loginId"
        type="text"
        value={formData.loginId}
        onChange={handleChange}
      />

      <label htmlFor="password">Password</label>
      <input
        id="password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
      />
      <button type="submit">로그인</button>
      <button type="button" onClick={() => navigate(-1)}>
        취소
      </button>
    </form>
  );
}

export default Login;
