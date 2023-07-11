import React, { useState, useEffect } from 'react';
import { Image, StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';

const AnimatedImage = Animated.createAnimatedComponent(Image);

const gridSize = 46;

const walls = {
  wall1: require('../../../assets/wall/verticalWall.png')
};

const VerticalWall = ({ type, wallX, wallY, mazeBoardX, mazeBoardY }) => {
  //console.log(`${type} ${wallX} ${wallY} ${mazeBoardX} ${mazeBoardY}`);
  return (
    <AnimatedImage
      style={[
        styles.wall,
        {
          left: gridSize * (wallY - mazeBoardY) - 2,
          top: gridSize * (wallX - mazeBoardX) - 2
        }
      ]}
      source={walls[`wall${type}`]}
    />
  )
}

const styles = StyleSheet.create({
  wall: {
    width: 4.0 * (gridSize / 50.0),
    height: 54.0 * (gridSize / 50.0),
    position: 'absolute'
  }
});

export default VerticalWall;