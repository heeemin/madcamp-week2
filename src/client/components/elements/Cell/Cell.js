import React, { useState, useEffect } from 'react';
import { Image, StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';

const AnimatedImage = Animated.createAnimatedComponent(Image);

const gridSize = 46;

const cells = {
  cell0: require('../../../assets/cell/blackCell.png'),
  cell1: require('../../../assets/cell/whiteCell.png'),
  cell2: require('../../../assets/cell/grayCell.png')
};

const Cell = ({ type, cellX, cellY, mazeBoardX, mazeBoardY }) => {
  return (
    <AnimatedImage
      style={[
        styles.cell,
        {
          left: gridSize * (cellY - mazeBoardY),
          top: gridSize * (cellX - mazeBoardX)
        }
      ]}
      source={cells[`cell${type}`]}
    />
  )
}

const styles = StyleSheet.create({
  cell: {
    width: gridSize,
    height: gridSize,
    position: 'absolute'
  }
});

export default Cell;