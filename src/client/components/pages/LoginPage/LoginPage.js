import { StyleSheet, View, Text, Button } from 'react-native';

const LoginPage = ({ navigation }) => (
  <View style={styles.loginpage}>
    <Text>This is LoginPage</Text>
    <Button
      title="Go to HomePage"
      onPress={() => navigation.navigate("HomePage")}
    />
  </View>
);

const styles = StyleSheet.create({
  loginpage: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default LoginPage;