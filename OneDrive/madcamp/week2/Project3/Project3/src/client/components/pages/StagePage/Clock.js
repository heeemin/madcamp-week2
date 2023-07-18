import { useState, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import Control from './Control'
import Timer from './Timer'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import jwt_decode from 'jwt-decode'

export default function Clock() {
  const [time, setTime] = useState(0)
  const [status, setStatus] = useState(-1)

  const API_URL = 'http://143.248.194.161:5000'
  // -1 => stopped, 0=>paused, 1=> playing
  const reset = () => {
    setTime(0)
  }
  const handleStart = () => {
    setStatus(1)
  }
  const handlePause = () => {
    setStatus(status === 0 ? 1 : 0)
  }
  const handleStop = () => {
    setStatus(-1)
  }

  // 토큰 가져오기 및 처리
  useEffect(() => {
    const sendTimeToServer = async () => {
      try {
        const token = await AsyncStorage.getItem('jwtToken')
        console.log('Sending token:', token)
        const decodedToken = jwt_decode(token)
        console.log('Decoded token:', decodedToken)

        const response = await axios.put(
          `${API_URL}/user-data`,
          {
            time: time,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        )

        reset()
      } catch (error) {
        console.error(error)
      }
    }

    if (status === -1) {
      sendTimeToServer()
    }
  }, [status])

  // 타이머 처리
  useEffect(() => {
    let timerID
    if (status == 1) {
      timerID = setInterval(() => {
        setTime(time => time + 10)
      }, 10)
    } else {
      clearInterval(timerID)
    }

    return () => {
      clearInterval(timerID)
    }
  }, [status])

  return (
    <View style={styles.container}>
      <Timer time={time} />
      <Control
        status={status}
        handleStart={handleStart}
        handlePause={handlePause}
        handleStop={handleStop}
      />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
})
