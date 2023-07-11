import React, { Fragment } from 'react';
import { View, ImageBackground, Image, StyleSheet } from 'react-native';

import { PanGestureHandler, TapGestureHandler, State } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  useAnimatedGestureHandler,
  withSpring,
} from 'react-native-reanimated';

import Key from '../../elements/Key';

const AnimatedView = Animated.createAnimatedComponent(View);
const AnimatedImage = Animated.createAnimatedComponent(Image);

const gridSize = 46;
const keySize = 38;

const KeyBoard = ({ mazeBoardSizeX, mazeBoardSizeY, mazeKeyGrid, mazeBoardX, mazeBoardY }) => {
  const keyList = []

  for (let i = 0; i < mazeBoardSizeX; i++) {
    for (let j = 0; j < mazeBoardSizeY; j++) {
      if(!mazeKeyGrid[i][j]) continue;

      //console.log(`${i} ${j}`);
      //console.log(`left: ${gridSize * (j - mazeBoardY + 0.5) - flagSize * 0.5}`);
      //console.log(`right: ${gridSize * (i - mazeBoardX + 0.5) - flagSize * 0.5}`);

      keyList.push(
        <Key
          type={mazeKeyGrid[i][j]}
          keyX={i}
          keyY={j}
          mazeBoardX={mazeBoardX}
          mazeBoardY={mazeBoardY}
        />
      )
    }
  }

  return (
    <AnimatedView
      style={[
        styles.keyBoard,
        {
          height: gridSize * mazeBoardSizeX,
          width: gridSize * mazeBoardSizeY
        }
      ]}
    >
      <Fragment>{keyList}</Fragment>
    </AnimatedView>
  );
}

const styles = StyleSheet.create({
  keyBoard: {
    position: 'absolute'
  }
});

export default KeyBoard;