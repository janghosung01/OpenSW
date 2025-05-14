import { useState } from 'react'
import './App.css'
import Header from './Components/Header'
function App() {
  const [isLogin,SetisLogin]=useState(false);
  function toHeaderLogin(){
    SetisLogin(isLogin=>!isLogin);
  }
  return (
    <>
      <Header LoginInfo={isLogin} toggleLogin={toHeaderLogin}/>
      <hr />
    </>
  )

}

export default App
