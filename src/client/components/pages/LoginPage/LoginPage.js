//web 87153119383-6jkkldpf8u9cd47fnup8rp68qoq5asqb.apps.googleusercontent.com
//ios 87153119383-c31t0st1bel70lefmb5uj4l4so1jog3m.apps.googleusercontent.com
//android 87153119383-uqn7kvins5qae0u0mkaef04cukcsoc85.apps.googleusercontent.com
//expo 87153119383-vfr3as4a4dfjekfveili07h8tbtdjeoq.apps.googleusercontent.com
import React, { useState, useEffect } from 'react'
import {
  TouchableOpacity,
  View,
  Text,
  TextInput,
  Button,
  Platform,
} from 'react-native'
import axios from 'axios'
import * as Google from 'expo-auth-session/providers/google'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session'
import * as Device from 'expo-device'
import jwt_decode from 'jwt-decode'
import SignupDialog from './SignupDialog'
import SignInDialog from './SignInDialog'

const useProxy = Platform.select({ web: false, default: true })
const redirectUri = makeRedirectUri({ useProxy: true })

const API_URL = 'http://143.248.194.161:5000'
//const API_URL = 'http://127.0.0.1:5000'
const LoginPage = ({ navigation }) => {
  //회원가입
  const [nickname, setNickName] = useState('')
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  const [team, setTeam] = useState('')

  //로그인
  const [LoginId, setLoginId] = useState('')
  const [LoginPassword, setLoginPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const [loginInfo, setLoginInfo] = useState(null)
  //google 로그인에 필요한 권한 요청 처리
  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId:
      '87153119383-6jkkldpf8u9cd47fnup8rp68qoq5asqb.apps.googleusercontent.com',
    expoClientId:
      '87153119383-6jkkldpf8u9cd47fnup8rp68qoq5asqb.apps.googleusercontent.com',
    iosClientId:
      ' 87153119383-c31t0st1bel70lefmb5uj4l4so1jog3m.apps.googleusercontent.com',
    androidClientId:
      '87153119383-uqn7kvins5qae0u0mkaef04cukcsoc85.apps.googleusercontent.com',
    redirectUri,
    responseType: 'id_token',
    prompt: 'consent', // 강제로 사용자 동의를 시도할 때 마다 화면에 표시
  })
  //console.log('Redirect URI:', redirectUri)
  const [signupVisible, setSignUpVisible] = useState('')

  useEffect(() => {
    const init = async () => {
      const token = getStoredToken()
      await AsyncStorage.removeItem('jwtToken')
    }

    init()
  }, [])

  React.useEffect(() => {
    //google 인증에 대한 응답이 성공적으로 완료되었을 때
    const sendLoginToken = async () => {
      if (response?.type == 'success') {
        const { id_token } = response.params
        try {
          const response = await axios({
            method: 'post',
            url: `${API_URL}/googleSignIn`,
            data: { id_token },
            headers: { 'Content-Type': 'application/json' },
          })
          // 서버로부터 응답을 받았을 때 토큰 추출
          const serverToken = response.data.token

          // 추출한 토큰을 AsyncStorage에 저장
          await AsyncStorage.setItem('jwtToken', serverToken)
        } catch (err) {
          console.log(err)
        }
        setIsAuthenticated(true)
      } else {
        setIsAuthenticated(false)
      }
    }
    sendLoginToken()
  }, [response])

  const getModelName = () => {
    const modelName = Device.modelName
    console.log(modelName)
  }

  // 로그인 상태 확인
  const checkLogin = async () => {
    const token = await getStoredToken()
    setIsAuthenticated(!!token)
  }

  useEffect(() => {
    checkLogin()
  }, [])

  const signUp = async () => {
    if (!nickname || !id || !password || !team) {
      console.error('모든 입력 값을 채워주세요.')
      return
    }
    const newUserData = {
      nickname,
      id,
      password,
      team,
    }

    try {
      const response = await axios({
        method: 'post',
        url: `${API_URL}/signup`,
        data: newUserData,
        headers: { 'Content-Type': 'application/json' },
      })

      console.log(response.data.message)
      const jwtToken = response.data.token
      // AsyncStorage를 사용하여 토큰 저장
      await AsyncStorage.setItem('jwtToken', jwtToken)
      const token = await AsyncStorage.getItem('jwtToken')
      console.log('Sending token:', token)
      const decodedToken = jwt_decode(token)
      console.log('Decoded token:', decodedToken)
    } catch (error) {
      console.error(error)
    }
  }

  const signIn = async () => {
    if (!LoginId || !LoginPassword) {
      console.error('모든 입력 값을 채워주세요.')
      return
    }
    const newUserData = {
      LoginId,
      LoginPassword,
    }
    try {
      const response = await axios({
        method: 'post',
        url: `${API_URL}/signin`,
        data: newUserData,
        headers: { 'Content-Type': 'application/json' },
      })
      console.log('로그인 성공')
      const token = response.data.token
      // 디코딩

      await storeToken(token) // 추출된 토큰값을 storeToken 함수에 전달하여 로컬 스토리지에 저장합니다.
      const decodedToken = jwt_decode(token)
      console.log('Decoded token:', decodedToken)
      setIsAuthenticated(true)
    } catch (error) {
      console.error(error)
    }
  }

  const logout = async () => {
    try {
      removeToken()
    } catch (error) {
      console.error(error)
    }
  }

  //구글 로그인에 성공한 후 토큰 저장
  const storeToken = async token => {
    try {
      await AsyncStorage.setItem('jwtToken', token)
    } catch (e) {
      console.error('Failed to store the token in AsyncStorage', e)
    }
  }
  //
  //구글 로그인 로그아웃
  const removeToken = async () => {
    try {
      await AsyncStorage.removeItem('jwtToken')
    } catch (e) {
      console.error('Failed to remove the token from AsyncStorage', e)
    }
  }

  async function getStoredToken() {
    try {
      const token = await AsyncStorage.getItem('jwtToken') //키로 저장된 값을 가져옴.
      return token
    } catch (e) {
      console.error('Failed to fetch the token from AsyncStorage', e)
      return null
    }
  }
  const checkLoginStatus = async () => {
    const token = await getStoredToken()

    if (token) {
      console.log('사용자가 로그인되어 있습니다.')
      console.log(token)
      // 로그인이 된 상태일 때 수행할 동작
    } else {
      console.log('사용자가 로그인되어 있지 않습니다.')
      // 로그인이 되어 있지 않은 상태일 때 수행할 동작
    }
  }

  // 이렇게 checkLoginStatus() 함수를 사용하여 로그인 상태에 관한 작업을 진행할 수 있습니다.
  const handleSignIn = async () => {
    await signIn() // signIn 이벤트를 호출
    checkLoginStatus() // checkLoginStatus 이벤트를 호출
  }
  const handleLogout = async () => {
    await logout() // signIn 이벤트를 호출
    checkLoginStatus() // checkLoginStatus 이벤트를 호출
    setLoginInfo(null) // 로그인 실패시 null로 설정
  }

  //구글 api를 이용하여 인증된 사용자 정보 가져옴
  async function getUserInfo(token) {
    try {
      const response = await axios.get(
        'https://www.googleapis.com/oauth2/v2/userinfo',
        {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      )

      return await response.data
    } catch (err) {
      console.log(err)
      return null
    }
  }

  if (isAuthenticated) {
    navigation.replace('HomePage')
  } else {
    return (
      <View>
        <Button
          title="SignUp"
          onPress={() => {
            navigation.replace('SignupDialog')
          }}
        />
        <Button
          title="SignIn"
          onPress={() => {
            navigation.replace('SignInDialog')
          }}
        />

        <Button
          title="Sign In with Google"
          onPress={() => {
            promptAsync()
          }}
        />

        {loginInfo && ( // 로그인 정보가 null이 아닌 경우 출력
          <Text>{`로그인 성공: id_token = ${loginInfo.id_token}`}</Text>
        )}
      </View>
    )
  }
}

export default LoginPage
