import React, { useState, useEffect } from 'react';
import { View, ImageBackground, Image, StyleSheet } from 'react-native';
import { PanGestureHandler, TapGestureHandler, State } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  Extrapolate,
  useAnimatedGestureHandler,
  withSpring,
} from 'react-native-reanimated';

const AnimatedView = Animated.createAnimatedComponent(View);

const gridSize = 46;

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

const Mazedatas = {
  Mazedata01: require('../../../data/Mazedata01.json'),
  Mazedata02: require('../../../data/Mazedata02.json'),
  Mazedata03: require('../../../data/Mazedata03.json'),
  Mazedata04: require('../../../data/Mazedata04.json'),
  Mazedata05: require('../../../data/Mazedata05.json'),
  Mazedata06: require('../../../data/Mazedata06.json'),
  Mazedata07: require('../../../data/Mazedata07.json'),
  Mazedata08: require('../../../data/Mazedata08.json'),
  Mazedata09: require('../../../data/Mazedata09.json'),
  Mazedata10: require('../../../data/Mazedata10.json'),
  Mazedata11: require('../../../data/Mazedata11.json'),
  Mazedata12: require('../../../data/Mazedata12.json'),
  Mazedata13: require('../../../data/Mazedata13.json'),
  Mazedata14: require('../../../data/Mazedata14.json'),
  Mazedata15: require('../../../data/Mazedata15.json'),
  Mazedata16: require('../../../data/Mazedata16.json'),
  Mazedata17: require('../../../data/Mazedata17.json'),
  Mazedata18: require('../../../data/Mazedata18.json'),
  Mazedata19: require('../../../data/Mazedata19.json'),
  Mazedata20: require('../../../data/Mazedata20.json'),
  Mazedata21: require('../../../data/Mazedata21.json')
};

const Mazeboard = ({ stage, mazeBoardX, mazeBoardY /*containerStyle, onDrag, onDoubleTap*/ }) => {
  //console.log(source);
/*
  const [positionX, setPositionX] = useState(startMazeBoardX);
  const [positionY, setPositionY] = useState(startMazeBoardY);

  const animatedValue = useSharedValue(0);

  const animationStyle = useAnimatedStyle(() => {
    const left = interpolate(animatedValue.value,
      [0, 1],
      [positionX, mazeBoardX],
      Extrapolate.CLAMP
    );
    const top = interpolate(animatedValue.value,
      [0, 1],
      [positionY, mazeBoardY],
      Extrapolate.CLAMP
    );
  
    return {
      left,
      top
    };
  });

  React.useEffect(() => {
    animatedValue.value = withTiming(1, { duration: 1000 });
    setPositionX(mazeBoardX);
    setPositionY(mazeBoardY);
  }, []);
*/
  // https://stackoverflow.com/questions/33907218/react-native-use-variable-for-image-file

  // console.log(`Mazeboard: ${screenFixed}`);
/*
  const AnimatingBox = () => {
    const animatedValue = useSharedValue(0);

    const animationStyle = useAnimatedStyle(() => {
      const top = interpolate(animatedValue.value,
        [0, 1],
        [0, 100],
        Extrapolate.CLAMP
      );
      const left = interpolate(animatedValue.value,
        [0, 1],
        [0, 100],
        Extrapolate.CLAMP
      );
  
      return {
        top,
        left
      };
    });
  }

  React.useEffect(() => {
    animatedValue.value = withTiming(1, { duration: 1000 });
  }, []);
*/
  const jsonData = Mazedatas[`Mazedata${String(stage).padStart(2, '0')}`];

  return (
    <Image
      style={[
        styles.maze,
        {
          width: gridSize * jsonData.mazeBoardSizeY,
          height: gridSize * jsonData.mazeBoardSizeX,
          left: gridSize * (3 - mazeBoardY),
          top: gridSize * (3 - mazeBoardX)
        }
        /*animationStyle*/]}
      source={images[`image${String(stage).padStart(2, '0')}`]}
    />
  )
}

const styles = StyleSheet.create({
  maze: {
    position: 'absolute'
  }
});

export default Mazeboard;