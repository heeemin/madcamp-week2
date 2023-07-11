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
  image21: require('../../../assets/maze/mazeBoard21.png'),
  imageHD: require('../../../assets/maze/mazeBoard21.png')
};

const mazeDatas = {
  mazeData01: require('../../../data/mazeData01.json'),
  mazeData02: require('../../../data/mazeData02.json'),
  mazeData03: require('../../../data/mazeData03.json'),
  mazeData04: require('../../../data/mazeData04.json'),
  mazeData05: require('../../../data/mazeData05.json'),
  mazeData06: require('../../../data/mazeData06.json'),
  mazeData07: require('../../../data/mazeData07.json'),
  mazeData08: require('../../../data/mazeData08.json'),
  mazeData09: require('../../../data/mazeData09.json'),
  mazeData10: require('../../../data/mazeData10.json'),
  mazeData11: require('../../../data/mazeData11.json'),
  mazeData12: require('../../../data/mazeData12.json'),
  mazeData13: require('../../../data/mazeData13.json'),
  mazeData14: require('../../../data/mazeData14.json'),
  mazeData15: require('../../../data/mazeData15.json'),
  mazeData16: require('../../../data/mazeData16.json'),
  mazeData17: require('../../../data/mazeData17.json'),
  mazeData18: require('../../../data/mazeData18.json'),
  mazeData19: require('../../../data/mazeData19.json'),
  mazeData20: require('../../../data/mazeData20.json'),
  mazeData21: require('../../../data/mazeData21.json')
};

const MazeBoard = ({ stage, mazeBoardX, mazeBoardY /*containerStyle, onDrag, onDoubleTap*/ }) => {
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
  const jsonData = mazeDatas[`mazeData${String(stage).padStart(2, '0')}`];

  return (
    <Image
      style={[
        styles.maze,
        {
          height: gridSize * jsonData.mazeBoardSizeX,
          width: gridSize * jsonData.mazeBoardSizeY,
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

export default MazeBoard;