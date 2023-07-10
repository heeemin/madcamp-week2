import { View, ImageBackground, Image, StyleSheet } from 'react-native';
import { PanGestureHandler, TapGestureHandler, State } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  useAnimatedGestureHandler,
  withSpring,
} from 'react-native-reanimated';

const AnimatedView = Animated.createAnimatedComponent(View);

const images = {
  image01: require('../../../assets/maze/Mazeboard01.png'),
  image02: require('../../../assets/maze/Mazeboard02.png'),
  image03: require('../../../assets/maze/Mazeboard03.png'),
  image04: require('../../../assets/maze/Mazeboard04.png'),
  image05: require('../../../assets/maze/Mazeboard05.png'),
  image06: require('../../../assets/maze/Mazeboard06.png'),
  image07: require('../../../assets/maze/Mazeboard07.png'),
  image08: require('../../../assets/maze/Mazeboard08.png'),
  image09: require('../../../assets/maze/Mazeboard09.png'),
  image10: require('../../../assets/maze/Mazeboard10.png'),
  image11: require('../../../assets/maze/Mazeboard11.png'),
  image12: require('../../../assets/maze/Mazeboard12.png'),
  image13: require('../../../assets/maze/Mazeboard13.png'),
  image14: require('../../../assets/maze/Mazeboard14.png'),
  image15: require('../../../assets/maze/Mazeboard15.png'),
  image16: require('../../../assets/maze/Mazeboard16.png'),
  image17: require('../../../assets/maze/Mazeboard17.png'),
  image18: require('../../../assets/maze/Mazeboard18.png'),
  image19: require('../../../assets/maze/Mazeboard19.png'),
  image20: require('../../../assets/maze/Mazeboard20.png'),
  image21: require('../../../assets/maze/Mazeboard21.png'),
  imageHD: require('../../../assets/maze/Mazeboard21.png')
};

const Mazeboard = ({ stage, screenFixed, left, top/*containerStyle, onDrag, onDoubleTap*/ }) => {
  const source = '../../../assets/maze/Mazeboard' + String(stage).padStart(2, '0') + '.png';
  console.log(source);
  // https://stackoverflow.com/questions/33907218/react-native-use-variable-for-image-file

  console.log(`Mazeboard: ${screenFixed}`);

  return (
    <Image
      style={[
        styles.maze,
        {
          left: left,
          top: top
        }
      ]}
      source={images[`image${String(stage).padStart(2, '0')}`]}
    />
  )
}

const styles = StyleSheet.create({
  maze: {
    width: 320,
    height: 320,
    position: 'absolute',

  }
});

export default Mazeboard;