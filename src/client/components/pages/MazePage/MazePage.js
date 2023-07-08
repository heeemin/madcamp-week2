import { StyleSheet, View, Text } from 'react-native';

import Mazeboard from '../../layouts/Mazeboard';

const MazePage = ({ stage }) => (
  <View style={styles.mazepage}>
    <Text>{'This is MazePage No.' + stage}</Text>
    <Mazeboard stage={ 1 } />
  </View>
);

const styles = StyleSheet.create({
  mazepage: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default MazePage;