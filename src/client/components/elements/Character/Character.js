import React, { useState, useEffect } from 'react';
import { View, ImageBackground, Image, StyleSheet } from 'react-native';

import { PanGestureHandler, TapGestureHandler, State } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  useAnimatedGestureHandler,
  withSpring,
} from 'react-native-reanimated';

const AnimatedImage = Animated.createAnimatedComponent(Image);

const gridSize = 46;

const Character = ({ screenFixed, characterX, characterY /*, containerStyle, onDrag, onDoubleTap*/ }) => {
  /*
  const imageStyle = useAnimatedStyle(() => {
    return {
      width: withSpring(scaleImage.value),
      height: withSpring(scaleImage.value),
    };
  });
*/
/*
  //const [translationX] = useState(new Animated.Value(0));
  //const [translationY] = useState(new Animated.Value(0));
  const translationX = useState(new Animated.Value(0))[0];
  const translationY = useState(new Animated.Value(0))[0];

  console.log(translationX);
  console.log(translationY);

  const onGestureEvent = Animated.event(
    [{
      nativeEvent: {
        translationX: translationX,
        translationY: translationY,
      },
    }],
    { useNativeDriver: true }
  );

  const onHandlerStateChange = (event) => {
    console.log("wow");
    if (event.nativeEvent.oldState === State.ACTIVE) {
      // Handle gesture end (e.g., move character based on gesture and stage)

      const { translationX, translationY } = event.nativeEvent;

      // 화면 경계를 벗어나지 않도록 위치 조정
      // const newX = Math.min(Math.max(boundary.left, translationX), boundary.right);
      // const newY = Math.min(Math.max(boundary.top, translationY), boundary.bottom);
      const newX = translationX;
      const newY = translationY;

      if(newX > 0){
        if(newX > newY) console.log('left');
        if(newX < newY) console.log('right');
      }
      if(newX < 0){
        if(newX > newY) console.log('up');
        if(newX < newY) console.log('down');
      }

      // 변환 컴포넌트 이동
      Animated.timing(translationX, {
        toValue: newX,
        duration: 250,
        useNativeDriver: true,
      }).start();

      Animated.timing(translationY, {
        toValue: newY,
        duration: 250,
        useNativeDriver: true,
      }).start();


      const accumulatedTranslationX = event.nativeEvent.transactionX;
      const accumulatedTranslationY = event.nativeEvent.transactionY;
      console.log(accumulatedTranslationX);
      console.log(accumulatedTranslationY);

      translationX.setOffset(accumulatedTranslationX);
      translationY.setOffset(accumulatedTranslationY);
      translationX.setValue(0);
      translationY.setValue(0);

    }
  }
*/
  
/*
    <PanGestureHandler
      onGestureEvent={onGestureEvent}
      onHandlerStateChange={onHandlerStateChange}>
      <Animated.View
        style={
          [
            styles.container,
            {
              transform: [
                { translateX: translationX },
                { translateY: translationY },
              ]
            }
          ]
        }>
        <Image
          style={styles.circle}
          source={require('../../../assets/circle.png')}
        />
      </Animated.View>
    </PanGestureHandler>
*/
/*
<PanGestureHandler onGestureEvent={onDrag}>
      <AnimatedView style={[containerStyle, { top: -350 }]}>
</AnimatedView>
    </PanGestureHandler>
    */
  const redCircle = require('../../../assets/character/circle_red.png');
  const blueCircle = require('../../../assets/character/circle_blue.png');
  // console.log(`Character: ${screenFixed}`);
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
  return (
    <AnimatedImage
      source={screenFixed ? redCircle : blueCircle}
      resizeMode="contain"
      style={[
        styles.circle,
        {
          left: gridSize * (3.5 + characterY) - 40 * 0.5,
          top: gridSize * (3.5 + characterX) - 40 * 0.5
        }
      ]}
    />
  );
}

const styles = StyleSheet.create({
  circle: {
    width: 40,
    height: 40,
    position: 'absolute'
  }
});

export default Character;