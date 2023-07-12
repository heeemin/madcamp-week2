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
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  NavigationContainer,
  NavigationHelpersContext,
} from '@react-navigation/native'
import LoginPage from './LoginPage'
import axios from 'axios'
import { NativeScreenNavigationContainer } from 'react-native-screens'
import jwt_decode from 'jwt-decode'
export default SignupDialog = ({ navigation }) => {
  const [nickname, setNickName] = useState('')
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  const [team, setTeam] = useState('')
  const [visible, setVisible] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const API_URL = 'http://143.248.194.161:5000'
  //const API_URL = 'http://127.0.0.1:5000'
  useEffect(() => {
    if (isAuthenticated) {
      navigation.navigate('HomePage')
    }
  }, [isAuthenticated])
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

      setIsAuthenticated(true)
    } catch (error) {
      console.error(error)
    }
  }
  const NavLogin = () => {
    setVisible(false)
    navigation.navigate('LoginPage')
  } //구글 로그인에 성공한 후 토큰 저장
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
            <Text>NickName:</Text>
            <TextInput
              value={nickname}
              onChangeText={text => setNickName(text)}
            />
            <Text>ID:</Text>
            <TextInput value={id} onChangeText={text => setId(text)} />
            <Text>Password:</Text>
            <TextInput
              value={password}
              onChangeText={text => setPassword(text)}
            />
            <Text>Team:</Text>
            <TextInput value={team} onChangeText={text => setTeam(text)} />
            <Button title="Sign Up" onPress={signUp} />

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
