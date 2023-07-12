import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, Button } from 'react-native'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

const ScoreBoard = ({ userId, navigation }) => {
  const [timeData, setTimeData] = useState(Array(21).fill(null))
  const [scoreData, setScoreData] = useState(Array(21).fill(null))

  //const API_URL = 'http://127.0.0.1:5000'
  const API_URL = 'http://143.248.194.161:5000'
  // 유저 데이터 가져오기
  useEffect(() => {
      //점수 가져오기
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem('jwtToken')
        const response = await axios({
          method: 'get',
          url: `${API_URL}/getScoreData`,

          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })

        const userData = response.data //JSON형식의 user 객체를 받아옴
        setScoreData(userData)
      } catch (error) {
        console.log(`Error fetching data: ${error}`)
      }
    }
    // 시간 가져오기
    const fetchData2 = async () => {
      try {
        const token = await AsyncStorage.getItem('jwtToken')
        const response = await axios({
          method: 'get',
          url: `${API_URL}/getTimerData`,

          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })

        const userData = response.data //JSON형식의 user 객체를 받아옴
        setTimeData(userData)
      } catch (error) {
        console.log(`Error fetching data: ${error}`)
      }
    }
    fetchData()
    fetchData2()
  }, [userId])

  return (
    <View>
      {scoreData.map((value, index) => (
        <Text key={index}>
          Score Data {index + 1}: {value}
        </Text>
      ))}
      {timeData.map((value, index) => (
        <Text key={index}>
          Timer Data {index + 1}: {value}
        </Text>
      ))}
    </View>
  )
}

export default ScoreBoard
