import { View, Image, StyleSheet } from 'react-native';

const Mazeboard = ({ stage }) => {
  const source = '../../../assets/maze/Mazeboard' + String(stage).padStart(2, '0') + '.png';
  // console.log(source);
  // https://stackoverflow.com/questions/33907218/react-native-use-variable-for-image-file

  return (
    <View style={styles.container}>
      <Image
        style={styles.maze}
        source={require('../../../assets/maze/Mazeboard02.png')}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'powderblue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  maze: {
    width: 320,
    height: 320
  }
});

export default Mazeboard;