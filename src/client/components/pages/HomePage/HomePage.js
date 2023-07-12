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

const HomePage = ({ navigation }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true)
  const NavInfo = () => {
    navigation.replace('Info')
  }
  const NavLogin = () => {
    setIsAuthenticated(false)
    navigation.replace('LoginPage')
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
