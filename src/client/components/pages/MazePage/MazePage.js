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

import MazeBoard from '../../layouts/MazeBoard';
import Character from '../../elements/Character';
import FlagBoard from '../../layouts/FlagBoard';
import KeyBoard from '../../layouts/KeyBoard';

const AnimatedView = Animated.createAnimatedComponent(View);
const AnimatedText = Animated.createAnimatedComponent(Text);

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

const MazePage = ({ stage }) => {
  //const source = '../../../data/Mazedata' + String(stage).padStart(2, '0') + '.json';
  const jsonData = mazeDatas[`mazeData${String(stage).padStart(2, '0')}`];
  
  //console.log('stage' + jsonData.stage);
  //console.log(jsonData.mazeFlagGrid.length);
  //console.log(jsonData.mazeFlagGrid[0].length);

  //const translateX = useSharedValue(0);
  //const translateY = useSharedValue(0);
  const [mazeBoardX, setMazeBoardX] = useState(jsonData.startMazeBoardX);
  const [mazeBoardY, setMazeBoardY] = useState(jsonData.startMazeBoardY);
  const [characterX, setCharacterX] = useState(0);
  const [characterY, setCharacterY] = useState(0);

  const mazeBoardGrid = jsonData.mazeBoardGrid;
  const [mazeBoardVerticalWall, setMazeBoardVerticalWall] = useState(jsonData.mazeBoardVerticalWall);
  const [mazeBoardHorizontalWall, setMazeBoardHorizontalWall] = useState(jsonData.mazeBoardHorizontalWall);

  const [mazeFlagCount, setMazeFlagCount] = useState(jsonData.mazeFlagCount);
  const [mazeFlagGrid, setMazeFlagGrid] = useState(jsonData.mazeFlagGrid);

  const [mazeKeyGrid, setMazeKeyGrid] = useState(jsonData.mazeKeyGrid);
  const [mazeColor, setMazeColor] = useState(0);

  const [moveCount, setMoveCount] = useState(0);
  const [screenFixed, setScreenFixed] = useState(false); 

  const [mazeSolved, setMazeSolved] = useState(false);

  const updateMazeBoardVerticalWall = (row, col) => {
    const nextMazeBoardVerticalWall = mazeBoardVerticalWall.map((rows, rowIndex) =>
      rows.map((cell, colIndex) =>
        rowIndex === row && colIndex === col ? 0 : cell
      )
    );
    runOnJS(setMazeBoardVerticalWall)(nextMazeBoardVerticalWall);
  };

  const updateMazeBoardVerticalWall2 = (row1, col1, row2, col2) => {
    const nextMazeBoardVerticalWall = mazeBoardVerticalWall.map((rows, rowIndex) =>
      rows.map((cell, colIndex) =>
        (rowIndex === row1 && colIndex === col1) || (rowIndex === row2 && colIndex === col2) ? 0 : cell
      )
    );
    runOnJS(setMazeBoardVerticalWall)(nextMazeBoardVerticalWall);
  };

  const updateMazeBoardHorizontalWall = (row, col) => {
    const nextMazeBoardHorizontalWall = mazeBoardHorizontalWall.map((rows, rowIndex) =>
      rows.map((cell, colIndex) =>
        rowIndex === row && colIndex === col ? 0 : cell
      )
    );
    runOnJS(setMazeBoardHorizontalWall)(nextMazeBoardHorizontalWall);
  };

  const updateMazeBoardHorizontalWall2 = (row1, col1, row2, col2) => {
    const nextMazeBoardHorizontalWall = mazeBoardHorizontalWall.map((rows, rowIndex) =>
      rows.map((cell, colIndex) =>
        (rowIndex === row1 && colIndex === col1) || (rowIndex === row2 && colIndex === col2) ? 0 : cell
      )
    );
    runOnJS(setMazeBoardHorizontalWall)(nextMazeBoardHorizontalWall);
  };

  const updateMazeFlagGrid = (row, col) => {
    const nextMazeFlagGrid = mazeFlagGrid.map((rows, rowIndex) =>
      rows.map((cell, colIndex) =>
        rowIndex === row && colIndex === col ? 0 : cell
      )
    );
    runOnJS(setMazeFlagGrid)(nextMazeFlagGrid);
  };

  const updateMazeKeyGrid = (row, col) => {
    const nextMazeKeyGrid = mazeKeyGrid.map((rows, rowIndex) =>
      rows.map((cell, colIndex) =>
        rowIndex === row && colIndex === col ? 0 : cell
      )
    );
    runOnJS(setMazeKeyGrid)(nextMazeKeyGrid);
  };

  const getBackgroundColor = () => {
    switch(mazeColor) {
      case 0: return styles.bgColor0;
      case 2: return styles.bgColor2;
      case 3: return styles.bgColor3;
      case 4: return styles.bgColor4;
    }
  }

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
      if(mazeSolved) return;

      context.mazeBoardX = mazeBoardX;
      context.mazeBoardY = mazeBoardY;
      context.characterX = characterX;
      context.characterY = characterY;
    },
    onEnd: (event, context) => { 
      console.log(`move #${moveCount + 1}`);
      runOnJS(setMoveCount)(moveCount + 1);

      if(Math.abs(event.translationX) < Math.abs(event.translationY)){
        if(event.translationY < 0){
          if(screenFixed){
            const nextCharacterX = (characterX + 9) % 7 - 3;

            if(mazeBoardGrid[mazeBoardX + nextCharacterX][mazeBoardY + characterY]){
              if(!mazeBoardHorizontalWall[mazeBoardX + characterX][mazeBoardY + characterY]
                && !mazeBoardHorizontalWall[mazeBoardX + nextCharacterX + 1][mazeBoardY + characterY]){
                console.log(`mazeBoard: ${mazeBoardX} ${mazeBoardY} / character: ${nextCharacterX} ${characterY} / dir: up`);
                runOnJS(setCharacterX)(nextCharacterX);
              }
              else if((!mazeBoardHorizontalWall[mazeBoardX + characterX][mazeBoardY + characterY]
                || mazeColor == mazeBoardHorizontalWall[mazeBoardX + characterX][mazeBoardY + characterY])
              && (!mazeBoardHorizontalWall[mazeBoardX + nextCharacterX + 1][mazeBoardY + characterY]
                || mazeColor == mazeBoardHorizontalWall[mazeBoardX + nextCharacterX + 1][mazeBoardY + characterY])){
                console.log(`nextMazeColor: 0`);
                runOnJS(setMazeColor)(0);
                runOnJS(updateMazeBoardHorizontalWall2)(
                  mazeBoardX + characterX, mazeBoardY + characterY,
                  mazeBoardX + nextCharacterX + 1, mazeBoardY + characterY);

                console.log(`mazeBoard: ${mazeBoardX} ${mazeBoardY} / character: ${nextCharacterX} ${characterY} / dir: up`);
                runOnJS(setCharacterX)(nextCharacterX);
              }
            }
          }
          else{
            const nextMazeBoardX = mazeBoardX - 1;

            if(!mazeBoardHorizontalWall[mazeBoardX + characterX][mazeBoardY + characterY]){
              console.log(`mazeBoard: ${nextMazeBoardX} ${mazeBoardY} / character: ${characterX} ${characterY} / dir: up`);
              runOnJS(setMazeBoardX)(nextMazeBoardX);
            }
            else if(mazeColor == mazeBoardHorizontalWall[mazeBoardX + characterX][mazeBoardY + characterY]){
              console.log(`nextMazeColor: 0`);
              runOnJS(setMazeColor)(0);
              runOnJS(updateMazeBoardHorizontalWall)(mazeBoardX + characterX, mazeBoardY + characterY);

              console.log(`mazeBoard: ${nextMazeBoardX} ${mazeBoardY} / character: ${characterX} ${characterY} / dir: up`);
              runOnJS(setMazeBoardX)(nextMazeBoardX);
            }
          }
        }
        if(event.translationY > 0){
          if(screenFixed){
            const nextCharacterX = (characterX + 4) % 7 - 3;
            
            if(mazeBoardGrid[mazeBoardX + nextCharacterX][mazeBoardY + characterY]){
              if(!mazeBoardHorizontalWall[mazeBoardX + characterX + 1][mazeBoardY + characterY]
                && !mazeBoardHorizontalWall[mazeBoardX + nextCharacterX][mazeBoardY + characterY]){
                console.log(`mazeBoard: ${mazeBoardX} ${mazeBoardY} / character: ${nextCharacterX} ${characterY} / dir: down`);
                runOnJS(setCharacterX)(nextCharacterX);
              }
              else if((!mazeBoardHorizontalWall[mazeBoardX + characterX + 1][mazeBoardY + characterY]
                || mazeColor == mazeBoardHorizontalWall[mazeBoardX + characterX + 1][mazeBoardY + characterY])
              && (!mazeBoardHorizontalWall[mazeBoardX + nextCharacterX][mazeBoardY + characterY]
                || mazeColor == mazeBoardHorizontalWall[mazeBoardX + nextCharacterX][mazeBoardY + characterY])){
                console.log(`nextMazeColor: 0`);
                runOnJS(setMazeColor)(0);
                runOnJS(updateMazeBoardHorizontalWall2)(
                  mazeBoardX + characterX + 1, mazeBoardY + characterY,
                  mazeBoardX + nextCharacterX, mazeBoardY + characterY);
                //console.log(characterX + ' ' + nextCharacterX);

                console.log(`mazeBoard: ${mazeBoardX} ${mazeBoardY} / character: ${nextCharacterX} ${characterY} / dir: down`);
                runOnJS(setCharacterX)(nextCharacterX);
              }
            }
          }
          else{
            const nextMazeBoardX = mazeBoardX + 1;

            if(!mazeBoardHorizontalWall[mazeBoardX + characterX + 1][mazeBoardY + characterY]){
              console.log(`mazeBoard: ${nextMazeBoardX} ${mazeBoardY} / character: ${characterX} ${characterY} / dir: down`);
              runOnJS(setMazeBoardX)(nextMazeBoardX);
            }
            else if(mazeColor == mazeBoardHorizontalWall[mazeBoardX + characterX + 1][mazeBoardY + characterY]){
              console.log(`nextMazeColor: 0`);
              runOnJS(setMazeColor)(0);
              runOnJS(updateMazeBoardHorizontalWall)(mazeBoardX + characterX + 1, mazeBoardY + characterY);

              console.log(`mazeBoard: ${nextMazeBoardX} ${mazeBoardY} / character: ${characterX} ${characterY} / dir: down`);
              runOnJS(setMazeBoardX)(nextMazeBoardX);
            }
          }
        }
      }
      if(Math.abs(event.translationX) > Math.abs(event.translationY)){
        if(event.translationX < 0){
          if(screenFixed){
            const nextCharacterY = (characterY + 9) % 7 - 3;
            
            if(mazeBoardGrid[mazeBoardX + characterX][mazeBoardY + nextCharacterY]){
              if(!mazeBoardVerticalWall[mazeBoardX + characterX][mazeBoardY + characterY]
                && !mazeBoardVerticalWall[mazeBoardX + characterX][mazeBoardY + nextCharacterY + 1]){
                console.log(`mazeBoard: ${mazeBoardX} ${mazeBoardY} / character: ${characterX} ${nextCharacterY} / dir: left`);
                runOnJS(setCharacterY)(nextCharacterY);
              }
              else if((!mazeBoardVerticalWall[mazeBoardX + characterX][mazeBoardY + characterY]
                || mazeColor == mazeBoardVerticalWall[mazeBoardX + characterX][mazeBoardY + characterY])
              && (!mazeBoardVerticalWall[mazeBoardX + characterX][mazeBoardY + nextCharacterY + 1]
                || mazeColor == mazeBoardVerticalWall[mazeBoardX + characterX][mazeBoardY + nextCharacterY + 1])){
                console.log(`nextMazeColor: 0`);
                runOnJS(setMazeColor)(0);
                runOnJS(updateMazeBoardVerticalWall2)(
                  mazeBoardX + characterX, mazeBoardY + characterY,
                  mazeBoardX + characterX, mazeBoardY + nextCharacterY + 1);
                
                console.log(`mazeBoard: ${mazeBoardX} ${mazeBoardY} / character: ${characterX} ${nextCharacterY} / dir: left`);
                runOnJS(setCharacterY)(nextCharacterY);
              }
            }
          }
          else{
            const nextMazeBoardY = mazeBoardY - 1;

            if(!mazeBoardVerticalWall[mazeBoardX + characterX][mazeBoardY + characterY]){
              console.log(`mazeBoard: ${mazeBoardX} ${nextMazeBoardY} / character: ${characterX} ${characterY} / dir: left`);
              runOnJS(setMazeBoardY)(nextMazeBoardY);
            }
            else if(mazeColor == mazeBoardVerticalWall[mazeBoardX + characterX][mazeBoardY + characterY]){
              console.log(`nextMazeColor: 0`);
              runOnJS(setMazeColor)(0);
              runOnJS(updateMazeBoardVerticalWall)(mazeBoardX + characterX, mazeBoardY + characterY);

              console.log(`mazeBoard: ${mazeBoardX} ${nextMazeBoardY} / character: ${characterX} ${characterY} / dir: left`);
              runOnJS(setMazeBoardY)(nextMazeBoardY);
            }
          }
        }
        if(event.translationX > 0){
          if(screenFixed){
            const nextCharacterY = (characterY + 4) % 7 - 3;

            if(mazeBoardGrid[mazeBoardX + characterX][mazeBoardY + nextCharacterY]){
              if(!mazeBoardVerticalWall[mazeBoardX + characterX][mazeBoardY + characterY + 1]
                && !mazeBoardVerticalWall[mazeBoardX + characterX][mazeBoardY + nextCharacterY]){
                console.log(`mazeBoard: ${mazeBoardX} ${mazeBoardY} / character: ${characterX} ${nextCharacterY} / dir: right`);
                runOnJS(setCharacterY)(nextCharacterY);
              }
              else if((!mazeBoardVerticalWall[mazeBoardX + characterX][mazeBoardY + characterY + 1]
                || mazeColor == mazeBoardVerticalWall[mazeBoardX + characterX][mazeBoardY + characterY + 1])
              && (!mazeBoardVerticalWall[mazeBoardX + characterX][mazeBoardY + nextCharacterY]
                || mazeColor == mazeBoardVerticalWall[mazeBoardX + characterX][mazeBoardY + nextCharacterY])){
                console.log(`nextMazeColor: 0`);
                runOnJS(setMazeColor)(0);
                runOnJS(updateMazeBoardVerticalWall2)(
                  mazeBoardX + characterX, mazeBoardY + characterY + 1,
                  mazeBoardX + characterX, mazeBoardY + nextCharacterY);
                
                console.log(`mazeBoard: ${mazeBoardX} ${mazeBoardY} / character: ${characterX} ${nextCharacterY} / dir: right`);
                runOnJS(setCharacterY)(nextCharacterY);
              }
            }
          }
          else{
            const nextMazeBoardY = mazeBoardY + 1;
            
            if(!mazeBoardVerticalWall[mazeBoardX + characterX][mazeBoardY + characterY + 1]){
              console.log(`mazeBoard: ${mazeBoardX} ${nextMazeBoardY} / character: ${characterX} ${characterY} / dir: right`);
              runOnJS(setMazeBoardY)(nextMazeBoardY);
            }
            else if(mazeColor == mazeBoardVerticalWall[mazeBoardX + characterX][mazeBoardY + characterY + 1]){
              console.log(`nextMazeColor: 0`);
              runOnJS(setMazeColor)(0);
              runOnJS(updateMazeBoardVerticalWall)(mazeBoardX + characterX, mazeBoardY + characterY + 1);

              console.log(`mazeBoard: ${mazeBoardX} ${nextMazeBoardY} / character: ${characterX} ${characterY} / dir: right`);
              runOnJS(setMazeBoardY)(nextMazeBoardY);
            }
          }
        }
      }

      if(mazeBoardGrid[mazeBoardX + characterX][mazeBoardY + characterY] == 2){
        if(screenFixed){
          runOnJS(releaseFixed)();
          runOnJS(setScreenFixed)(false);
        }
      }

      if(mazeFlagGrid[mazeBoardX + characterX][mazeBoardY + characterY]){
        runOnJS(updateMazeFlagGrid)(mazeBoardX + characterX, mazeBoardY + characterY);
        
        const nextMazeFlagCount = mazeFlagCount - 1;
        console.log(`nextMazeFlagCount: ${nextMazeFlagCount}`);
        runOnJS(setMazeFlagCount)(nextMazeFlagCount);
        if(!nextMazeFlagCount) runOnJS(setMazeSolved)(true);
      }

      if(mazeKeyGrid[mazeBoardX + characterX][mazeBoardY + characterY]){
        console.log(`nextMazeColor: ${mazeKeyGrid[mazeBoardX + characterX][mazeBoardY + characterY]}`);
        runOnJS(setMazeColor)(mazeKeyGrid[mazeBoardX + characterX][mazeBoardY + characterY]);

        runOnJS(updateMazeKeyGrid)(mazeBoardX + characterX, mazeBoardY + characterY);
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

                /*
                <FlagBoard
                  mazeBoardSizeX={jsonData.mazeBoardSizeY}
                  mazeBoardSizeY={jsonData.mazeBoardSizeY}
                  mazeFlagGrid={jsonData.mazeFlagGrid}
                />
                */

  const renderPage = () => {
    if(mazeSolved) return <Text>Congratulations!</Text>;
    return (
      <AnimatedView style={styles.mazeBoard}>
        <MazeBoard
          stage={stage}
          mazeBoardSizeX={jsonData.mazeBoardSizeX}
          mazeBoardSizeY={jsonData.mazeBoardSizeY}
          mazeBoardGrid={jsonData.mazeBoardGrid}
          mazeBoardVerticalWall={mazeBoardVerticalWall}
          mazeBoardHorizontalWall={mazeBoardHorizontalWall}
          mazeBoardX={mazeBoardX}
          mazeBoardY={mazeBoardY}
        />
        <FlagBoard
          mazeBoardSizeX={jsonData.mazeBoardSizeX}
          mazeBoardSizeY={jsonData.mazeBoardSizeY}
          mazeFlagGrid={mazeFlagGrid}
          mazeBoardX={mazeBoardX}
          mazeBoardY={mazeBoardY}
        />
        <KeyBoard
          mazeBoardSizeX={jsonData.mazeBoardSizeX}
          mazeBoardSizeY={jsonData.mazeBoardSizeY}
          mazeKeyGrid={mazeKeyGrid}
          mazeBoardX={mazeBoardX}
          mazeBoardY={mazeBoardY}
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
    );
  }

  return (
    <GestureHandlerRootView style={[
      styles.container,
      runOnJS(getBackgroundColor)()
    ]}>
      <PanGestureHandler onGestureEvent={onDrag}>
        <AnimatedView style={[
          styles.container,
          runOnJS(getBackgroundColor)()
        ]}>
          <TapGestureHandler onGestureEvent={onDoubleTap} numberOfTaps={2}>
            <AnimatedView style={[
              styles.container,
              runOnJS(getBackgroundColor)()
            ]}>
              <Text>{`This is MazePage No.${stage}`}</Text>
              <Text>{`You moved ${moveCount} times.`}</Text>
              {runOnJS(renderPage)()}
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
    alignItems: 'center',
    justifyContent: 'center'
  },
  mazeBoard: {
    width: 322,
    height: 322,
    overflow: 'hidden',
  },
  bgColor0: {
    backgroundColor: '#fff'
  },
  bgColor2: {
    backgroundColor: '#ffe473'
  },
  bgColor3: {
    backgroundColor: '#1efca1'
  },
  bgColor4: {
    backgroundColor: '#cb83df'
  },
});

export default MazePage;