import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import MyPage from './pages/MyPage'
import Header from './Components/Header'
import ProtectedRoute from './Components/ProtectedRoute'

function App() {
  const [isLogin,SetisLogin]=useState(false);
  function toHeaderLogin(){
    SetisLogin(isLogin=>!isLogin);
  }
  return (
    <>
      <Header LoginInfo={isLogin} toggleLogin={toHeaderLogin}/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
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