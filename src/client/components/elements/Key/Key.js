import React, { useState, useEffect } from 'react';
import { Image, StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';

const AnimatedImage = Animated.createAnimatedComponent(Image);

const gridSize = 46;
const keySize = 38;

const keys = {
  key2: require('../../../assets/key/orangeKey.png'),
  key3: require('../../../assets/key/greenKey.png'),
  key4: require('../../../assets/key/purpleKey.png')
};

const Key = ({ type, keyX, keyY, mazeBoardX, mazeBoardY }) => {
  return (
    <AnimatedImage
      style={[
        styles.key,
        {
          left: gridSize * (keyY - mazeBoardY + 3.5) - keySize * 0.5,
          top: gridSize * (keyX - mazeBoardX + 3.5) - keySize * 0.5
        }
      ]}
      source={keys[`key${type}`]}
    />
  );
}

const styles = StyleSheet.create({
  key: {
    width: keySize,
    height: keySize,
    position: 'absolute'
  }
});

export default Key;