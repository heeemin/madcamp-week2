// src/pages/LoadingScreen.js
import React, { useState, useEffect } from 'react'
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
  Button,
} from 'react-native'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { NavigationContainer } from '@react-navigation/native'
import jwt_decode from 'jwt-decode'
const API_URL = 'http://143.248.194.161:5000'
//const API_URL = 'http://127.0.0.1:5000'
export default SignupDialog = ({ navigation }) => {
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    if (isAuthenticated) {
      navigation.navigate('HomePage')
    }
  }, [isAuthenticated])

  const signIn = async () => {
    if (!id || !password) {
      console.error('모든 입력 값을 채워주세요.')
      return
    }
    const newUserData = {
      id,
      password,
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
  const NavLogin = () => {
    setVisible(false)
    navigation.navigate('LoginPage')
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
  if (!isAuthenticated) {
    return (
      <View>
        <Modal transparent={true} visible={visible}>
          <View style={styles.modalView}>
            <Text>ID:</Text>
            <TextInput value={id} onChangeText={text => setId(text)} />
            <Text>Password:</Text>
            <TextInput
              value={password}
              onChangeText={text => setPassword(text)}
            />
            <Button title="Sign In" onPress={signIn} />
            <Button title="닫기" onPress={NavLogin} />
          </View>
        </Modal>
      </View>
    )
  } else {
    navigation.navigate('HomePage')
  }
}

const styles = StyleSheet.create({
  modalView: {
    marginTop: 300,

    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    elevation: 5,
  },
})
