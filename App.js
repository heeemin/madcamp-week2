import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'

export default function App() {
  return (
    //실제로 화면에 보여지는 render함수의 return값
    //return값은 항상 1개의 컴포넌트 -> 항상 전체를 View로 감싸주기
    //{}는 return문안에서는 component 값이기 때문에 어떠한 js코드의 값이거나 코드를 실행시키기 위해서는 이 부분이 js라는 것을 알려줘야함

    //컨테이너 역할. - 자식 컴포넌트 포함 -> 주로 레이아웃 구성
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
      <Text styles={styles.welcome}>Hello</Text>
    </View>
  )
}

//스타일 시트를 활용하여 컴포넌트의 스타일을 정의
const styles = StyleSheet.create({
  container: {
    flex: 1, //모든 사용가능한 공간 차지
    backgroundColor: '#000000',
    alignItems: 'center', //수평으로 가운데 정렬
    justifyContent: 'center',
    //컴포넌트의 자식요소를 수직으로 가운데 정렬
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
})
