import './App.css'

import React, { useEffect } from 'react'
import axios from 'axios'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './Login'
import Kakao from './Kakao'
import Main from './Main'

//const API_URL = 'http://172.10.5.102:80'
import Madcomponent from './Mapcomponent'
function App() {
  /*
  const sendRequest = async () => {
    const response = await axios.get('http://172.10.5.102:80')
    try {
      console.log(response.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    sendRequest()
  }, [])*/

  const Rest_api_key = 'dcb8c3b23d720c296085cbdc9046ece9'
  const redirect_uri = 'http://localhost:3000/auth'

  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type =code`
  const handleLogin = () => {
    window.location.href = kakaoURL
    const code = new URL(window.location.href).searchParams.get('code')
    //인가 코드 -> 엑세스 토큰을 얻을 수 있음. 카카오 api를 사용하여 사용자 정보를 가져오거나 다른 작업 수행 가능
  }
  /*

  const kakaoClientId = 'bfb50c9024a6d76bfe483d7601fc1aa5'
  const kakaoOnSuccess = async data => {
    console.log(data)
    const idToken = data.response.access_token //엑세스 토큰 -> 백엔드
    const kakaoResponse = await axios.post(
      'https://kapi.kakao.com/v2/user/me',
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    )
    kakaoResponse()
  }
  const kakaoOnFailure = error => {
    console.log(error)
  }
*/
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/oauth" element={<Kakao />} />
        <Route path="/Madcomponent" element={<Madcomponent />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
