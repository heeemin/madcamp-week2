import React from 'react'
import { useNavigate } from 'react-router-dom'
import './App.css'

function Main() {
  const navigate = useNavigate()
  const NavLogin = () => {
    navigate('/Login')
  }
  const Rest_api_key = 'dcb8c3b23d720c296085cbdc9046ece9'
  const redirect_uri = 'http://localhost:3000/oauth'

  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`
  const handleLogin = () => {
    window.location.href = kakaoURL
  }
  return (
    <>
      <div className="mainBox">
        <video className="mainVideo" loop autoPlay>
          <source src="/animation/main.mp4" type="video/mp4" />
        </video>
        <div className="mainVideo-text">
          <p className="mainVideo-light">Join, Connect, Bond.</p>
          <p className="mainVideo-bold">Madder</p>
          <p className="mainVideo-light">Shared Passions, New Friends</p>
        </div>
      </div>
      <div className="mainFixed"></div>
      <div className="mainFixed"></div>
      <div className="mainFixed"></div>
      <div className="mainFixed"></div>
      <button onClick={handleLogin}>로그인</button>
    </>
  )
}
export default Main
