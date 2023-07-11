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

/*
const startMazeBoardX = gridSize * 0;
const startMazeBoardY = gridSize * -4;
const startCharacterX = gridSize * 3.5 - 40 * 0.5;
const startCharacterY = gridSize * 3.5 - 40 * 0.5;
*/
const Mazedatas = {
  Mazedata01: require('../../../data/Mazedata01.json'),
  Mazedata02: require('../../../data/Mazedata02.json'),
  Mazedata03: require('../../../data/Mazedata03.json'),
  Mazedata04: require('../../../data/Mazedata04.json'),
  Mazedata05: require('../../../data/Mazedata05.json'),
  Mazedata06: require('../../../data/Mazedata06.json'),
  Mazedata07: require('../../../data/Mazedata07.json'),
  Mazedata08: require('../../../data/Mazedata08.json'),
  Mazedata09: require('../../../data/Mazedata09.json'),
  Mazedata10: require('../../../data/Mazedata10.json'),
  Mazedata11: require('../../../data/Mazedata11.json'),
  Mazedata12: require('../../../data/Mazedata12.json'),
  Mazedata13: require('../../../data/Mazedata13.json'),
  Mazedata14: require('../../../data/Mazedata14.json'),
  Mazedata15: require('../../../data/Mazedata15.json'),
  Mazedata16: require('../../../data/Mazedata16.json'),
  Mazedata17: require('../../../data/Mazedata17.json'),
  Mazedata18: require('../../../data/Mazedata18.json'),
  Mazedata19: require('../../../data/Mazedata19.json'),
  Mazedata20: require('../../../data/Mazedata20.json'),
  Mazedata21: require('../../../data/Mazedata21.json')
};

const MazePage = ({ stage }) => {
  //const source = '../../../data/Mazedata' + String(stage).padStart(2, '0') + '.json';
  const jsonData = Mazedatas[`Mazedata${String(stage).padStart(2, '0')}`];
  
  //console.log(jsonData.stage);

  //const translateX = useSharedValue(0);
  //const translateY = useSharedValue(0);
  const [mazeBoardX, setMazeBoardX] = useState(jsonData.startMazeBoardX);
  const [mazeBoardY, setMazeBoardY] = useState(jsonData.startMazeBoardY);
  const [characterX, setCharacterX] = useState(0);
  const [characterY, setCharacterY] = useState(0);

  const [moveCount, setMoveCount] = useState(0);
  const [screenFixed, setScreenFixed] = useState(false); 

  const [mazeSolve, setMazeSolve] = useState(false);

  const releaseFixed = async () => {
    await Promise.all([
      runOnJS(setMazeBoardX)(mazeBoardX + characterX),
      runOnJS(setMazeBoardY)(mazeBoardY + characterY),
      runOnJS(setCharacterX)(0),
      runOnJS(setCharacterY)(0)
    ]);
  }

  const onDoubleTap = useAnimatedGestureHandler({
    onActive: () => {
      console.log(`move #${moveCount + 1}`);
      runOnJS(setMoveCount)(moveCount + 1);

      if(screenFixed) runOnJS(releaseFixed)();
      
      console.log(`mazeBoard: ${mazeBoardX} ${mazeBoardY} / character: ${characterX} ${characterY} / fix: ${!screenFixed}`);
      runOnJS(setScreenFixed)(!screenFixed);
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
      console.log(`move #${moveCount + 1}`);
      runOnJS(setMoveCount)(moveCount + 1);

      if(Math.abs(event.translationX) < Math.abs(event.translationY)){
        if(event.translationY < 0 && !jsonData.MazeBoardHorizontalWall[mazeBoardX + characterX][mazeBoardY + characterY]){
          if(screenFixed){
            const nextCharacterX = (characterX + 9) % 7 - 3;
            if(jsonData.MazeBoardGrid[mazeBoardX + nextCharacterX][mazeBoardY + characterY]
              && !jsonData.MazeBoardHorizontalWall[mazeBoardX + nextCharacterX + 1][mazeBoardY + characterY]){
              console.log(`mazeBoard: ${mazeBoardX} ${mazeBoardY} / character: ${nextCharacterX} ${characterY} / dir: up`);
              runOnJS(setCharacterX)(nextCharacterX);
            }
          }
          else{
            const nextMazeBoardX = mazeBoardX - 1;

            console.log(`mazeBoard: ${nextMazeBoardX} ${mazeBoardY} / character: ${characterX} ${characterY} / dir: up`);
            runOnJS(setMazeBoardX)(nextMazeBoardX);
          }
        }
        if(event.translationY > 0 && !jsonData.MazeBoardHorizontalWall[mazeBoardX + characterX + 1][mazeBoardY + characterY]){
          if(screenFixed){
            const nextCharacterX = (characterX + 4) % 7 - 3;
            
            if(jsonData.MazeBoardGrid[mazeBoardX + nextCharacterX][mazeBoardY + characterY]
              && !jsonData.MazeBoardHorizontalWall[mazeBoardX + nextCharacterX][mazeBoardY + characterY]){
                console.log(`mazeBoard: ${mazeBoardX} ${mazeBoardY} / character: ${nextCharacterX} ${characterY} / dir: down`);
              runOnJS(setCharacterX)(nextCharacterX);
            }
          }
          else{
            const nextMazeBoardX = mazeBoardX + 1;

            console.log(`mazeBoard: ${nextMazeBoardX} ${mazeBoardY} / character: ${characterX} ${characterY} / dir: down`);
            runOnJS(setMazeBoardX)(nextMazeBoardX);
          }
        }
      }
      if(Math.abs(event.translationX) > Math.abs(event.translationY)){
        if(event.translationX < 0 && !jsonData.MazeBoardVerticalWall[mazeBoardX + characterX][mazeBoardY + characterY]){
          if(screenFixed){
            const nextCharacterY = (characterY + 9) % 7 - 3;
            
            if(jsonData.MazeBoardGrid[mazeBoardX + characterX][mazeBoardY + nextCharacterY]
              && !jsonData.MazeBoardVerticalWall[mazeBoardX + characterX][mazeBoardY + nextCharacterY + 1]){
                console.log(`mazeBoard: ${mazeBoardX} ${mazeBoardY} / character: ${characterX} ${nextCharacterY} / dir: left`);
              runOnJS(setCharacterY)(nextCharacterY);
            }
          }
          else{
            const nextMazeBoardY = mazeBoardY - 1;

            console.log(`mazeBoard: ${mazeBoardX} ${nextMazeBoardY} / character: ${characterX} ${characterY} / dir: left`);
            runOnJS(setMazeBoardY)(nextMazeBoardY);
          }
        }
        if(event.translationX > 0 && !jsonData.MazeBoardVerticalWall[mazeBoardX + characterX][mazeBoardY + characterY + 1]){
          if(screenFixed){
            const nextCharacterY = (characterY + 4) % 7 - 3;

            if(jsonData.MazeBoardGrid[mazeBoardX + characterX][mazeBoardY + nextCharacterY]
              && !jsonData.MazeBoardVerticalWall[mazeBoardX + characterX][mazeBoardY + nextCharacterY]){
                console.log(`mazeBoard: ${mazeBoardX} ${mazeBoardY} / character: ${characterX} ${nextCharacterY} / dir: right`);
              runOnJS(setCharacterY)(nextCharacterY);
            }
          }
          else{
            const nextMazeBoardY = mazeBoardY + 1;

            console.log(`mazeBoard: ${mazeBoardX} ${nextMazeBoardY} / character: ${characterX} ${characterY} / dir: right`);
            runOnJS(setMazeBoardY)(nextMazeBoardY);
          }
        }
      }

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
    width: 322,
    height: 322,
    overflow: 'hidden',
  }
});

export default MazePage;