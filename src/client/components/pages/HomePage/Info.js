import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, Button } from 'react-native'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Info = ({ userId, navigation }) => {
  const [userData, setUserData] = useState(null)
  const [nickname, setNickname] = useState('')
  const [team, setTeam] = useState('')
  const [score, setScore] = useState('')
  const [time, setTime] = useState('')
  const [id, setId] = useState('')
  const [ID, setID] = useState('')

  const API_URL = 'http://143.248.194.95:5000'
  // 유저 데이터 가져오기
  const NavLogin = () => {
    navigation.replace('LoginPage')
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem('jwtToken')
        const response = await axios({
          method: 'get',
          url: `${API_URL}/getUserData`,

          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })

        const userData = response.data //JSON형식의 user 객체를 받아옴
        console.log('??' + userData)
        setUserData(userData)
        setNickname(userData.nickname)
        setTeam(userData.team)
        setScore(userData.score)
        setTime(userData.time)
        setId(userData.id)
        setID(userData._id)
      } catch (error) {
        console.log(`Error fetching data: ${error}`)
      }
    }
    fetchData()
  }, [userId])

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
