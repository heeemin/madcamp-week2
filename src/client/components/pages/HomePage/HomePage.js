import React, { useState } from 'react'
import {
  TouchableOpacity,
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  Button,
} from 'react-native'
import Clock from '../StagePage/Clock'
import { Info } from './Info'
import AsyncStorage from '@react-native-async-storage/async-storage'

const HomePage = ({ navigation }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true)

  const NavInfo = () => {
    navigation.replace('Info')
  }
  const NavLogin = () => {
    setIsAuthenticated(false)
    navigation.replace('LoginPage')
  }

  const logout = () => {
    removeToken()
    setIsAuthenticated(false)
    navigation.replace('LoginPage')
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

  //구글 로그인 로그아웃
  const removeToken = async () => {
    try {
      console.log(getStoredToken)
      await AsyncStorage.removeItem('jwtToken')
      console.log(getStoredToken)
    } catch (e) {
      console.error('Failed to remove the token from AsyncStorage', e)
    }
  }

  if (!isAuthenticated) {
    navigation.replace('LoginPage')
  } else {
    return (
      <View>
        <Button title="Info" onPress={NavInfo} />
        <Button title="Back" onPress={NavLogin} />
        <Button
          title="Go to StagePage"
          onPress={() => navigation.navigate('StagePage')}
        />
        <Button title="logout" onPress={logout} />
        <Button
          title="Go to StagePage"
          onPress={() => navigation.navigate('ScoreBoard')}
        />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  homepage: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default HomePage
