import { StyleSheet, View, Text, Button } from 'react-native';

const HomePage = ({ navigation }) => (
  <View style={styles.homepage}>
    <Text>This is HomePage</Text>
    <Button
      title="Go to StagePage"
      onPress={() => navigation.navigate("StagePage")}
    />
  </View>
);

const styles = StyleSheet.create({
  homepage: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default HomePage;