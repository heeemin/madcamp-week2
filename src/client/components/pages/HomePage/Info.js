import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Button,
  NavLogin,
  StyleSheet,
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

function Info({ navigation }) {
  const [nickname, setNickname] = useState('')
  const [team, setTeam] = useState('')
  const [score, setScore] = useState('')
  const [time, setTime] = useState('')
  const [id, setId] = useState('')
  const [ID, setID] = useState('')
  const [userData, setUserData] = useState(null)
  const API_URL = 'http://143.248.194.161:5000'

  const NavLogin = () => {
    navigation.navigate('HomePage')
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem('jwtToken')
        const response = await axios.get(`${API_URL}/getUserData`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
        })

        setUserData(response.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])
  const NavHome = () => {
    updateUserData()
    navigation.navigate('HomePage')
  }

  // 유저 데이터 업데이트
  //info.js에서 데이터 변경
  const updateUserData = async () => {
    try {
      const token = await AsyncStorage.getItem('jwtToken')
      const response = await axios({
        method: 'put',
        url: `${API_URL}/updateUserData`,
        data: {
          userId: ID,
          updateData: {
            nickname: nickname,
            team: team,
            score: score,
            time: time,
          },
        },
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })

      const updatedData = response.data //JSON형식의 user 객체를 받아옴
      setUserData(updatedData)
    } catch (error) {
      console.log(`Error updating data: ${error}`)
    }
  }
  return (
    <View>
      {userData ? (
        <>
          <TextInput
            style={styles.textInput}
            onChangeText={text => setNickname(text)}
          >
            닉네임: {userData.nickname}
          </TextInput>
          <TextInput
            style={styles.textInput}
            onChangeText={text => setTeam(text)}
          >
            팀: {userData.team}
          </TextInput>
          <Text style={styles.textInput}>점수: {userData.score}</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={text => setId(text)}
          >
            ID: {userData.id}
          </TextInput>
          <TextInput
            style={styles.textInput}
            onChangeText={text => setTime(text)}
          >
            time: {userData.time}
          </TextInput>

          <Button title="변경사항 저장하기" onPress={updateUserData} />
          <Button title="Back" onPress={NavLogin} />
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  )
}
const styles = StyleSheet.create({
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 20,
    paddingLeft: 10,
    paddingRight: 10,
  },
})

export default Info
