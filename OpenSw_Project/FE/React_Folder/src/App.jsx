import { useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import MyPage from './pages/MyPage'
import Header from './Components/Header'
import ProtectedRoute from './Components/ProtectedRoute'

function App() {
  const [isLogin,SetIsLogin]=useState(false);
    const [userData, SetUserData] = useState({
      loginId: "",
      keyId:"",
      name: "",
      gender: "",
    });
  // 로그인 성공 시 호출, response에서 사용자 정보 받아 상태 업데이트
  const handleLoginSuccess = (user) => {
    SetIsLogin(true);
    SetUserData(user); // user는 로그인 API 응답에서 받은 사용자 정보 객체
  };

  const handleLogout = () => {
    SetIsLogin(false);
     SetUserData({
      loginId: "",
      keyId: "",
      name: "",
      gender: "",
    });
  };
  function check(){
    console.log(userData);
  }

  const location = useLocation();
  return (
    <>
      <Header LoginInfo={isLogin} onLogout={handleLogout} userData={userData.name}/>
      <button onClick={check}>check user</button>
      <Routes>
        <Route path='/' element={<Home key={location.key} />} />
        <Route path='/login' element={<Login onLoginSuccess={handleLoginSuccess} />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/mypage' element={
          <ProtectedRoute isLogin={isLogin}> <MyPage /> </ProtectedRoute>
        } 
        />
      </Routes>
    </>
  )
}

export default App