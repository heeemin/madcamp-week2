import React, { useState, useEffect } from 'react';
import { Image, StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';

const AnimatedImage = Animated.createAnimatedComponent(Image);

const gridSize = 46;
const flagSize = 38;

const flags = {
  flag1: require('../../../assets/flag/racing-flag.png')
};

const Flag = ({ type, flagX, flagY, mazeBoardX, mazeBoardY }) => {
  return (
    <AnimatedImage
      style={[
        styles.flag,
        {
          left: gridSize * (flagY - mazeBoardY + 3.5) - flagSize * 0.5,
          top: gridSize * (flagX - mazeBoardX + 3.5) - flagSize * 0.5
        }
      ]}
      source={flags[`flag${type}`]}
    />
  )
}

const styles = StyleSheet.create({
  flag: {
    width: flagSize,
    height: flagSize,
    position: 'absolute'
  }
});

export default Flag;