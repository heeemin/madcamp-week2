import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Button,
  NavLogin,
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

function Info({ navigation }) {
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

  // 유저 데이터 업데이트
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

  /*
if (!userData) {
  return <Text>Loading...</Text>
}
*/
  return (
    <View>
      {userData ? (
        <>
          <TextInput onChangeText={text => setNickname(text)}>
            닉네임: {userData.nickname}
          </TextInput>
          <TextInput onChangeText={text => setTeam(text)}>
            팀: {userData.team}
          </TextInput>
          <Text>점수: {userData.score}</Text>
          <TextInput onChangeText={text => setId(text)}>
            ID: {userData.id}
          </TextInput>
          <TextInput onChangeText={text => setTime(text)}>
            ID: {userData.time}
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

export default Info
