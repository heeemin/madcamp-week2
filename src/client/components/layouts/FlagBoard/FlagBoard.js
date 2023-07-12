import React, { Fragment } from 'react';
import { View, ImageBackground, Image, StyleSheet } from 'react-native';

import { PanGestureHandler, TapGestureHandler, State } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  useAnimatedGestureHandler,
  withSpring,
} from 'react-native-reanimated';

import Flag from '../../elements/Flag';

const AnimatedView = Animated.createAnimatedComponent(View);
const AnimatedImage = Animated.createAnimatedComponent(Image);

const gridSize = 46;
const flagSize = 38;

const FlagBoard = ({ mazeBoardSizeX, mazeBoardSizeY, mazeFlagGrid, mazeBoardX, mazeBoardY }) => {
  const flagList = []

  for (let i = 0; i < mazeBoardSizeX; i++) {
    for (let j = 0; j < mazeBoardSizeY; j++) {
      if(!mazeFlagGrid[i][j]) continue;

      //console.log(`${i} ${j}`);
      //console.log(`left: ${gridSize * (j - mazeBoardY + 0.5) - flagSize * 0.5}`);
      //console.log(`right: ${gridSize * (i - mazeBoardX + 0.5) - flagSize * 0.5}`);

      flagList.push(
        <Flag
          key={i * mazeBoardSizeY + j}
          type={mazeFlagGrid[i][j]}
          flagX={i}
          flagY={j}
          mazeBoardX={mazeBoardX}
          mazeBoardY={mazeBoardY}
        />
      )
    }
  }

  return (
    <AnimatedView
      style={[
        styles.flagBoard,
        {
          height: gridSize * mazeBoardSizeX,
          width: gridSize * mazeBoardSizeY
        }
      ]}
    >
      <Fragment>{flagList}</Fragment>
    </AnimatedView>
  );
}

const styles = StyleSheet.create({
  flagBoard: {
    position: 'absolute'
  }
});

export default FlagBoard;