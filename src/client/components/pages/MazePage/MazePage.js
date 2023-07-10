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

const startMazeBoardX = 0;
const startMazeBoardY = 0;
const startCharacterX = 138;
const startCharacterY = 138;

const MazePage = ({ stage }) => {
  //const translateX = useSharedValue(0);
  //const translateY = useSharedValue(0);
  const [mazeBoardX, setMazeBoardX] = useState(startMazeBoardX);
  const [mazeBoardY, setMazeBoardY] = useState(startMazeBoardY);
  const [characterX, setCharacterX] = useState(startCharacterX);
  const [characterY, setCharacterY] = useState(startCharacterY);

  const [moveCount, setMoveCount] = useState(0);
  const [screenFixed, setScreenFixed] = useState(false); 

  const releaseFixed = async () => {
    await Promise.all([
      runOnJS(setMazeBoardX)(mazeBoardX+startCharacterX-characterX),
      runOnJS(setMazeBoardY)(mazeBoardY+startCharacterY-characterY),
      runOnJS(setCharacterX)(startCharacterX),
      runOnJS(setCharacterY)(startCharacterY)
    ]);
  }

  const onDoubleTap = useAnimatedGestureHandler({
    onActive: () => {
      if(screenFixed){
        runOnJS(releaseFixed)();
      }

      runOnJS(setScreenFixed)(!screenFixed);
      console.log(`screenFixed: ${screenFixed}`);

      runOnJS(setMoveCount)(moveCount + 1);
      console.log(`move #${moveCount}`);
    },
  });

  const onDrag = useAnimatedGestureHandler({
    onStart: (event, context) => {
      context.mazeBoardX = mazeBoardX;
      context.mazeBoardY = mazeBoardY;
      context.characterX = characterX;
      context.characterY = characterY;
    },
    onEnd: (event, context) => {
      if(Math.abs(event.translationX) > Math.abs(event.translationY)){
        if(event.translationX < 0){
          console.log('left');
          if(screenFixed) runOnJS(setCharacterX)(characterX - 45);
          else runOnJS(setMazeBoardX)(mazeBoardX + 45);
        }
        if(event.translationX > 0){
          console.log('right');
          if(screenFixed) runOnJS(setCharacterX)(characterX + 45);
          else runOnJS(setMazeBoardX)(mazeBoardX - 45);
        }
      }
      if(Math.abs(event.translationX) < Math.abs(event.translationY)){
        if(event.translationY < 0){
          console.log('up');
          if(screenFixed) runOnJS(setCharacterY)(characterY - 45);
          else runOnJS(setMazeBoardY)(mazeBoardY + 45);
        }
        if(event.translationY > 0){
          console.log('down');
          if(screenFixed) runOnJS(setCharacterY)(characterY + 45);
          else runOnJS(setMazeBoardY)(mazeBoardY - 45);
        }
      }

      runOnJS(setMoveCount)(moveCount + 1);
      console.log(`move #${moveCount}`);

      context.mazeBoardX = mazeBoardX;
      context.mazeBoardY = mazeBoardY;
      context.characterX = characterX;
      context.characterY = characterY;
      //runOnJS(setLeft)(context.translateX);
      //runOnJS(setTop)(context.translateY);
      //console.log(translateX.value);
      //console.log(translateY.value);
    }
  });

  return (
    <GestureHandlerRootView style={styles.container}>
      <PanGestureHandler onGestureEvent={onDrag}>
        <AnimatedView style={styles.container}>
          <TapGestureHandler onGestureEvent={onDoubleTap} numberOfTaps={2}>
            <AnimatedView style={styles.container}>
              <Text>{`This is MazePage No.${stage}`}</Text>
              <Text>{`You moved ${moveCount} times.`}</Text>
              <AnimatedView style={styles.mazeboard}>
                <Mazeboard
                  stage={stage}
                  //containerStyle={containerStyle}
                  screenFixed={screenFixed}
                  mazeBoardX={mazeBoardX}
                  mazeBoardY={mazeBoardY}
                  //onDrag={onDrag}
                  //onDoubleTap={onDoubleTap}
                  //scaleImage={scaleImage}
                  //imageSize={imageSize}
                />
                <Character
                  //containerStyle={containerStyle}
                  screenFixed={screenFixed}
                  characterX={characterX}
                  characterY={characterY}
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