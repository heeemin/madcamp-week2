import { StyleSheet, View, Text, Button } from 'react-native';

const NUM_BUTTONS = 21;
const NUM_COLUMNS = 5;

const buttonWidth = 100 / NUM_COLUMNS + '%'; // 버튼의 가로 길이 계산

const StagePage = ({ navigation }) => {
  const buttons = [];
  for (let i = 1; i <= NUM_BUTTONS; i++) {
    buttons.push(
      <View key={`button-${i}`} style={styles.buttonContainer}>
        <Button
          title={`${i}`}
          style={styles.button}
          onPress={() => navigation.navigate(`MazePage${i}`)}
        />
      </View>
    );
  }

  return (
    <View style={styles.stagepage}>
      <Text>This is StagePage</Text>
      <View style={styles.buttonsContainer}>{buttons}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  stagepage: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    maxWidth: '80%'
  },
  buttonContainer: {
    width: buttonWidth,
    height: buttonWidth,
    padding: 8
  }
});

export default StagePage;