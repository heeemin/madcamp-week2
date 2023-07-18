//리다이렉트될 화면

import axios from 'axios'
import React, { useEffect } from 'react'

import Main from './Main'
import Login from './Login'
import { Navigate, useNavigate, Link } from 'react-router-dom'

const Kakao = props => {
  const navigate = useNavigate()
  //인가 코드 받기
  let code = new URL(window.location.href).searchParams.get('code')
  let grant_type = 'authorization_code'
  let client_id = 'dcb8c3b23d720c296085cbdc9046ece9'
  const API_URL = 'http://172.10.5.102:443'

  //인가 코드 전달
  useEffect(() => {
    const auth_code = async () => {
      try {
        const response = await axios({
          method: 'post',
          url: `${API_URL}/kakao`,
          data: { data: code },
        })
        console.log(response.data)
        //const data = await response.json()
        const token = response.data.token
        const isNewUser = response.data.isNewUser
        console.log('token:', token)
        console.log(isNewUser)
        //토큰을 로컬 스토리지에 저장
        localStorage.setItem('user_token', token)
        if (isNewUser) {
          navigate('/Login')
        } else {
          navigate('/')
        }
      } catch (error) {
        if (error.response) {
          // 서버에서 응답을 받았지만, HTTP 상태 코드가 200(성공) 범위에 있지 않은 경우
          console.error(
            '응답 오류:',
            error.response.status,
            error.response.data
          )
        } else if (error.request) {
          // 서버에서 응답을 받지 않았지만, 클라이언트 측에서 요청을 보낸 경우(네트워크 에러 등)
          console.error('네트워크 오류:', error.request)
        } else {
          // axios의 설정이나 다른 요청 생성 중에 발생한 오류
          console.error('요청 오류:', error)
        }
      }
    }
    auth_code()
  }, [])

  //권한이 필요한 api 요청을 보낼때 이 토큰을 불러와서 authorization 헤더에 포함
  async function fetchData() {
    // 로컬 스토리지에서 토큰 가져오기
    const token = localStorage.getItem('user_token')

    try {
      const response = await fetch(
        'https://your-server.com/api/some-secured-data',
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      )

      const data = await response.json()
      console.log('Data from secured API:', data)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }
  return <></>
}

export default Kakao
