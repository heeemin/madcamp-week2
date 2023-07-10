import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { GestureHandlerRootView, PanGestureHandler, TapGestureHandler, State } from 'react-native-gesture-handler';

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  useAnimatedGestureHandler,
  runOnJS,
  useAnimatedReaction,
  useDerivedValue,
  withSpring,
} from 'react-native-reanimated';

import Mazeboard from '../../layouts/Mazeboard';
import Character from '../../elements/Character';

const AnimatedView = Animated.createAnimatedComponent(View);
const AnimatedText = Animated.createAnimatedComponent(Text);

const MazePage = ({ stage }) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const [left, setLeft] = useState(0);
  const [top, setTop] = useState(0);
  const [boardLeft, setBoardLeft] = useState(0);
  const [boardTop, setBoardTop] = useState(0);
  const [characterLeft, setCharacterLeft] = useState(0);
  const [characterTop, setCharacterTop] = useState(0);
  const moveCount = useSharedValue(0);
  const [cnt, setCnt] = useState(0);
  const screenFixed = useSharedValue(false); 

  const onDoubleTap = useAnimatedGestureHandler({
    onActive: () => {
      screenFixed.value = !screenFixed.value;
      console.log(`screenFixed: ${screenFixed.value}`);

      moveCount.value++;
      runOnJS(setCnt)(cnt+1);
      console.log(`move #${moveCount.value}!`);
    },
  });

  const onDrag = useAnimatedGestureHandler({
    onStart: (event, context) => {
      context.translateX = translateX.value;
      context.translateY = translateY.value;
    },
    onEnd: (event, context) => {
      if(Math.abs(event.translationX) > Math.abs(event.translationY)){
        if(event.translationX < 0){
          console.log('left');
          translateX.value = context.translateX - 45;
          translateY.value = context.translateY;
        }
        if(event.translationX > 0){
          console.log('right');
          translateX.value = context.translateX + 45;
          translateY.value = context.translateY;
        }
      }
      if(Math.abs(event.translationX) < Math.abs(event.translationY)){
        if(event.translationY < 0){
          console.log('up');
          translateX.value = context.translateX;
          translateY.value = context.translateY - 45;
        }
        if(event.translationY > 0){
          console.log('down');
          translateX.value = context.translateX;
          translateY.value = context.translateY + 45;
        }
      }

      moveCount.value++;
      runOnJS(setCnt)(cnt+1);
      console.log(`You moved ${moveCount.value} times.`);

      context.translateX = translateX.value;
      context.translateY = translateY.value;
      runOnJS(setLeft)(context.translateX);
      runOnJS(setTop)(context.translateY);
      console.log(translateX.value);
      console.log(translateY.value);
    }
  });

  const containerStyle = useAnimatedStyle(() => {
    return {
      left: translateX.value,
      top: translateY.value,
    };

    //console.log(containerStyle.left);
    //console.log(containerStyle.top);

    return {
      position: 'absolute',
      left: translateX.value,
      top: translateY.value,
    };
    /*
      transform1: {
        position: 'absolute',
        top: translateX.value,
        left: translateY.value,
      },
      transform2: {
        position: 'absolute',
        top: translateX.value,
        left: translateY.value,
      }
    */
  });

  return (
    <GestureHandlerRootView style={styles.container}>
      <PanGestureHandler onGestureEvent={onDrag}>
        <AnimatedView style={styles.container}>
          <TapGestureHandler onGestureEvent={onDoubleTap} numberOfTaps={2}>
            <AnimatedView style={styles.container}>
              <Text>{`This is MazePage No.${stage}`}</Text>
              <Text>{`You moved ${cnt} times.`}</Text>
              <AnimatedView style={styles.mazeboard}>
                <Mazeboard
                  stage={stage}
                  //containerStyle={containerStyle}
                  screenFixed={screenFixed.value}
                  left={left}
                  top={top}
                  //onDrag={onDrag}
                  //onDoubleTap={onDoubleTap}
                  //scaleImage={scaleImage}
                  //imageSize={imageSize}
                />
                <Character
                  //containerStyle={containerStyle}
                  screenFixed={screenFixed.value}
                  left={left}
                  top={top}
                  //onDrag={onDrag}
                  //onDoubleTap={onDoubleTap}
                />
              </AnimatedView>
            </AnimatedView>
          </TapGestureHandler>
        </AnimatedView>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  mazeboard: {
    width: 320,
    height: 320,
    overflow: 'hidden',
  },
  component: {
    position: 'absolute',
    width: 100,
    height: 100
  }
});

export default MazePage;