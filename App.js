//web 87153119383-e9svlmhf2buj46abqc92766a73cu64n2.apps.googleusercontent.com
//ios 87153119383-c31t0st1bel70lefmb5uj4l4so1jog3m.apps.googleusercontent.com
import React, { useState } from 'react'
import { View, Text, TextInput, Button } from 'react-native'
import axios from 'axios'
//import { GoogleSignin, statusCodes } from 'react-native-google-signin'

const API_URL = 'http://localhost:5000'

const App = () => {
  const [name, setName] = useState('')
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [email, setEmail] = useState('')

  const signUp = async () => {
    if (
      !name ||
      !id ||
      !password ||
      !passwordConfirm ||
      !phoneNumber ||
      !email
    ) {
      console.error('모든 입력 값을 채워주세요.')
      return
    }
    const newUserData = {
      name,
      id,
      password,
      passwordConfirm,
      phoneNumber,
      email,
    }

    try {
      const response = await axios({
        method: 'post',
        url: `${API_URL}/signup`,
        data: newUserData,
        headers: { 'Content-Type': 'application/json' },
      })

      console.log(response.data.message)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <View>
      <Text>Name:</Text>
      <TextInput value={name} onChangeText={text => setName(text)} />
      <Text>ID:</Text>
      <TextInput value={id} onChangeText={text => setId(text)} />
      <Text>Password:</Text>
      <TextInput value={password} onChangeText={text => setPassword(text)} />
      <Text>Password Confirm:</Text>
      <TextInput
        value={passwordConfirm}
        onChangeText={text => setPasswordConfirm(text)}
      />
      <Text>Phone Number:</Text>
      <TextInput
        value={phoneNumber}
        onChangeText={text => setPhoneNumber(text)}
      />
      <Text>Email:</Text>
      <TextInput value={email} onChangeText={text => setEmail(text)} />
      <Button title="Sign Up" onPress={signUp} />
    </View>
  )
}
/*
function configureGoogleSign() {
  GoogleSignIn.configure({
    webClientId: WEB_CLIENT_ID,
    offlineAccess: false,
  })
}

const GoogleSignIn = async () => {
  try {
    await GoogleSignin.hasPlayServices()
    const userInfo = await GoogleSignin.signIn()
    setgmail(userInfo)

    //Navigate user where you want and store information
  } catch (error) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      // user cancelled the login flow
    } else if (error.code === statusCodes.IN_PROGRESS) {
      // operation (f.e. sign in) is in progress already
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      // play services not available or outdated
    } else {
      // some other error happened
    }
  }
}
*/
export default App

/*import {GoogleSignin} from '@react-native-google-signin/google-signin';

async function signIn() {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    // userInfo를 서버로 전송하고 저장
  } catch (error) {
    console.log(error);
  }
}*/
