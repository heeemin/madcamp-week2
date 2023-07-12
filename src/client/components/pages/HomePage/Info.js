import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

function Info({ navigation }) {
  const [userData, setUserData] = useState(null)
  const API_URL = 'http://143.248.194.161:5000'

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

  return (
    <View>
      {userData ? (
        <View>
          <Text>{`닉네임: ${userData.nickname}`}</Text>
          <Text>{`ID: ${userData.id}`}</Text>
          <Text>{`팀: ${userData.team}`}</Text>
          <Text>{`점수: ${userData.score}`}</Text>
          <Text>{`시간: ${userData.time}`}</Text>
          <Button
            title="뒤로 가기"
            onPress={() => navigation.navigate('LoginPage')}
          ></Button>
        </View>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  )
}

export default Info
