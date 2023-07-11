// src/pages/LoadingScreen.js
import React, { useState, useEffect } from 'react'
import { ActivityIndicator, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const LoadingScreen = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem('jwtToken')

        if (token) {
          setIsLoggedIn(true)
          setIsLoading(false)
        } else {
          setIsLoggedIn(false)
          setIsLoading(false)
        }
      } catch (e) {
        console.error('Failed to fetch the token from AsyncStorage', e)
        setIsLoading(false)
      }
    }

    checkLoginStatus()
  }, [])

  useEffect(() => {
    if (!isLoading) {
      if (isLoggedIn) {
        navigation.reset({ index: 0, routes: [{ name: 'HomePage' }] })
      } else {
        navigation.reset({ index: 0, routes: [{ name: 'LoginPage' }] })
      }
    }
  }, [isLoading, isLoggedIn])

  return (
    <View>
      <ActivityIndicator size="large" />
    </View>
  )
}

export default LoadingScreen
