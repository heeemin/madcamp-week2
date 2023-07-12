import React, { Fragment, useState, useEffect } from 'react';
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

import VerticalWall from '../../elements/VerticalWall';
import HorizontalWall from '../../elements/HorizontalWall';

const AnimatedView = Animated.createAnimatedComponent(View);

const gridSize = 46;

const images = {
  image01: require('../../../assets/maze/mazeBoard01.png'),
  image02: require('../../../assets/maze/mazeBoard02.png'),
  image03: require('../../../assets/maze/mazeBoard03.png'),
  image04: require('../../../assets/maze/mazeBoard04.png'),
  image05: require('../../../assets/maze/mazeBoard05.png'),
  image06: require('../../../assets/maze/mazeBoard06.png'),
  image07: require('../../../assets/maze/mazeBoard07.png'),
  image08: require('../../../assets/maze/mazeBoard08.png'),
  image09: require('../../../assets/maze/mazeBoard09.png'),
  image10: require('../../../assets/maze/mazeBoard10.png'),
  image11: require('../../../assets/maze/mazeBoard11.png'),
  image12: require('../../../assets/maze/mazeBoard12.png'),
  image13: require('../../../assets/maze/mazeBoard13.png'),
  image14: require('../../../assets/maze/mazeBoard14.png'),
  image15: require('../../../assets/maze/mazeBoard15.png'),
  image16: require('../../../assets/maze/mazeBoard16.png'),
  image17: require('../../../assets/maze/mazeBoard17.png'),
  image18: require('../../../assets/maze/mazeBoard18.png'),
  image19: require('../../../assets/maze/mazeBoard19.png'),
  image20: require('../../../assets/maze/mazeBoard20.png'),
  image21: require('../../../assets/maze/mazeBoard21.png')
};

const MazeBoard = ({ stage, mazeBoardSizeX, mazeBoardSizeY, mazeBoardGrid, mazeBoardVerticalWall, mazeBoardHorizontalWall, mazeBoardX, mazeBoardY }) => {
  const wallList = []
  for (let i = 0; i < mazeBoardSizeX; i++) {
    for (let j = 0; j < mazeBoardSizeY + 1; j++) {
      if(mazeBoardVerticalWall[i][j] < 2) continue;

      //console.log(`${i} ${j}`);
      //console.log(`left: ${gridSize * (j - mazeBoardY) - 2}`);
      //console.log(`right: ${gridSize * (i - mazeBoardX) - 2}`);

      wallList.push(
        <VerticalWall
          type={mazeBoardVerticalWall[i][j]}
          wallX={i}
          wallY={j}
          mazeBoardX={mazeBoardX}
          mazeBoardY={mazeBoardY}
        />
      )
    }
  }
  for (let i = 0; i < mazeBoardSizeX + 1; i++) {
    for (let j = 0; j < mazeBoardSizeY; j++) {
      if(mazeBoardHorizontalWall[i][j] < 2) continue;

      //console.log(`${i} ${j}`);
      //console.log(`left: ${gridSize * (j - mazeBoardY) - 2}`);
      //console.log(`right: ${gridSize * (i - mazeBoardX) - 2}`);

      wallList.push(
        <HorizontalWall
          type={mazeBoardHorizontalWall[i][j]}
          wallX={i}
          wallY={j}
          mazeBoardX={mazeBoardX}
          mazeBoardY={mazeBoardY}
        />
      )
    }
  }

  return (
    <AnimatedView
      style={[
        styles.maze,
        {
          height: gridSize * mazeBoardSizeX,
          width: gridSize * mazeBoardSizeY
        }
      ]}
    >
      <Image
        style={[
          styles.maze,
          {
            height: gridSize * mazeBoardSizeX,
            width: gridSize * mazeBoardSizeY,
            left: gridSize * (3 - mazeBoardY),
            top: gridSize * (3 - mazeBoardX)
          }
        ]}
        source={images[`image${String(stage).padStart(2, '0')}`]}
      />
      <Fragment>{wallList}</Fragment>
    </AnimatedView>
  )
}

const styles = StyleSheet.create({
  maze: {
    position: 'absolute'
  }
});

export default MazeBoard;