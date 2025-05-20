import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [formData, setFormData] = useState({
    loginId: "",
    password: "",
    name: "",
    gender: "",
  });

  const navigate = useNavigate(); // useNavigate 훅 호출

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { loginId, password, name, gender } = formData;

    if (
      loginId.trim() === "" ||
      password.trim() === "" ||
      name.trim() === "" ||
      gender.trim() === ""
    ) {
      alert("모든정보 입력바람");
      return;
    }

    console.log(loginId);
    console.log(password);
    console.log(name);
    console.log(gender);
    try {
      const response = await axios.post(
        `https://movie-api-test-latest.onrender.com/register`,
        {
          name:name,
          userId: loginId,
          password:password,
          gender:gender,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      alert("회원가입 성공!");
      navigate("/"); // 회원가입 성공 후 홈(또는 원하는 경로)으로 이동
    } catch (error) {
        console.error(error.response.data.detail  );
      alert(`회원가입 실패! ${error.response.data.detail}`);
      navigate("/"); // 회원가입 성공 후 홈(또는 원하는 경로)으로 이동
    }
  };

  return (
    <form id="mentee" onSubmit={handleSubmit}>
      <h1>mentee</h1>
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

      <label htmlFor="name">name</label>
      <input
        id="name"
        name="name"
        type="text"
        value={formData.name}
        onChange={handleChange}
      />

      <div>
        <input
          type="radio"
          id="male"
          name="gender"
          value="MALE"
          checked={formData.gender === "MALE"}
          onChange={handleChange}
        />
        <label htmlFor="male">Male</label>

        <input
          type="radio"
          id="female"
          name="gender"
          value="FEMALE"
          checked={formData.gender === "FEMALE"}
          onChange={handleChange}
        />
        <label htmlFor="female">Female</label>
      </div>

      <button type="submit">제출하기</button>
      <button type="button" onClick={() => navigate(-1)}>
        취소
      </button>
    </form>
  );
}

export default SignUp;
