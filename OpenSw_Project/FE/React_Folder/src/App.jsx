import { useState } from 'react'
import './App.css'
import Header from './Components/Header'
import MovieList from './Components/MovieList/MovieList'
function App() {
  const [isLogin,SetisLogin]=useState(false);
  function toHeaderLogin(){
    SetisLogin(isLogin=>!isLogin);
  }
  return (
    <>
      <Header LoginInfo={isLogin} toggleLogin={toHeaderLogin}/>
      <MovieList/>
    </>
  )
}

export default App