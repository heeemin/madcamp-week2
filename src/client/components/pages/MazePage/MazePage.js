import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import {
  GestureHandlerRootView,
  PanGestureHandler,
  TapGestureHandler,
  State,
} from 'react-native-gesture-handler'

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  useAnimatedGestureHandler,
  runOnJS,
  useAnimatedReaction,
  useDerivedValue,
  withSpring,
} from 'react-native-reanimated'

import MazeBoard from '../../layouts/Mazeboard/Mazeboard'
import Character from '../../elements/Character'
import FlagBoard from '../../layouts/FlagBoard'

import Flag from '../../elements/Flag'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Control from '../StagePage/Control'
import Timer from '../StagePage/Timer'
import jwtDecode from 'jwt-decode'
const AnimatedView = Animated.createAnimatedComponent(View)
const AnimatedText = Animated.createAnimatedComponent(Text)

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
  mazeData21: require('../../../data/mazeData21.json'),
}

const MazePage = ({ stage }) => {
  //const source = '../../../data/Mazedata' + String(stage).padStart(2, '0') + '.json';
  const jsonData = mazeDatas[`mazeData${String(stage).padStart(2, '0')}`]

  console.log('stage' + jsonData.stage)
  console.log(jsonData.mazeFlagGrid.length)
  console.log(jsonData.mazeFlagGrid[0].length)

  //const translateX = useSharedValue(0);
  //const translateY = useSharedValue(0);
  const [mazeBoardX, setMazeBoardX] = useState(jsonData.startMazeBoardX)
  const [mazeBoardY, setMazeBoardY] = useState(jsonData.startMazeBoardY)
  const [characterX, setCharacterX] = useState(0)
  const [characterY, setCharacterY] = useState(0)

  const [moveCount, setMoveCount] = useState(0)
  const [screenFixed, setScreenFixed] = useState(false)

  const [mazeFlagCount, setMazeFlagCount] = useState(jsonData.mazeFlagCount)
  const [mazeFlagGrid, setMazeFlagGrid] = useState(jsonData.mazeFlagGrid)

  const [mazeSolved, setMazeSolved] = useState(false)

  const [time, setTime] = useState(0)
  const [status, setStatus] = useState(-1)

  //moveCount를 score에 저장해야지.
  useEffect(() => {
    if (mazeSolved) {
      const saveMoveCount = async () => {
        try {
          const token = await AsyncStorage.getItem('jwtToken')
          const response = await axios({
            method: 'get',
            url: `${API_URL}/SaveScoreData`,
            data: { stage, moveCount },
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          })
          console.log(response.data.message)
        } catch (error) {
          console.error('move count:', error)
        }
      }
      saveMoveCount()
    }
  }, [mazeSolved])

  //clock 부분

  const API_URL = 'http://143.248.194.161:5000'
  // -1 => stopped, 0=>paused, 1=> playing
  const reset = () => {
    setTime(0)
  }
  const handleStart = () => {
    setStatus(1)
  }
  const handlePause = () => {
    setStatus(status === 0 ? 1 : 0)
  }
  const handleStop = () => {
    setStatus(-1)
  }

  // 토큰 가져오기 및 처리
  useEffect(() => {
    const sendTimeToServer = async () => {
      try {
        const token = await AsyncStorage.getItem('jwtToken')
        console.log('Sending token:', token)
        const decodedToken = jwt_decode(token)
        console.log('Decoded token:', decodedToken)

        const response = await axios.put(
          `${API_URL}/user-data`,
          {
            time: time,
            stage: stage,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        )

        reset()
      } catch (error) {
        console.error(error)
      }
    }

    if (status === -1) {
      sendTimeToServer()
    }
  }, [status])

  // 타이머 처리
  useEffect(() => {
    let timerID
    if (status == 1) {
      timerID = setInterval(() => {
        setTime(time => time + 10)
      }, 10)
    } else {
      clearInterval(timerID)
    }

    return () => {
      clearInterval(timerID)
    }
  }, [status])

  const updateMazeFlagGrid = (row, col, value) => {
    const nextMazeFlagGrid = mazeFlagGrid.map((rows, rowIndex) =>
      rows.map((cell, colIndex) =>
        rowIndex === row && colIndex === col ? value : cell
      )
    )
    runOnJS(setMazeFlagGrid)(nextMazeFlagGrid)
  }

  const releaseFixed = async () => {
    await Promise.all([
      runOnJS(setMazeBoardX)(mazeBoardX + characterX),
      runOnJS(setMazeBoardY)(mazeBoardY + characterY),
      runOnJS(setCharacterX)(0),
      runOnJS(setCharacterY)(0),
    ])
  }

  const onDoubleTap = useAnimatedGestureHandler({
    onActive: () => {
      console.log(`move #${moveCount + 1}`)
      runOnJS(setMoveCount)(moveCount + 1)

      if (screenFixed) runOnJS(releaseFixed)()

      console.log(
        `mazeBoard: ${mazeBoardX} ${mazeBoardY} / character: ${characterX} ${characterY} / fix: ${!screenFixed}`
      )
      runOnJS(setScreenFixed)(!screenFixed)
    },
  })

  const onDrag = useAnimatedGestureHandler({
    onStart: (event, context) => {
      context.mazeBoardX = mazeBoardX
      context.mazeBoardY = mazeBoardY
      context.characterX = characterX
      context.characterY = characterY
    },
    onEnd: (event, context) => {
      console.log(`move #${moveCount + 1}`)
      runOnJS(setMoveCount)(moveCount + 1)

      if (Math.abs(event.translationX) < Math.abs(event.translationY)) {
        if (
          event.translationY < 0 &&
          !jsonData.mazeBoardHorizontalWall[mazeBoardX + characterX][
            mazeBoardY + characterY
          ]
        ) {
          if (screenFixed) {
            const nextCharacterX = ((characterX + 9) % 7) - 3
            if (
              jsonData.mazeBoardGrid[mazeBoardX + nextCharacterX][
                mazeBoardY + characterY
              ] &&
              !jsonData.mazeBoardHorizontalWall[
                mazeBoardX + nextCharacterX + 1
              ][mazeBoardY + characterY]
            ) {
              console.log(
                `mazeBoard: ${mazeBoardX} ${mazeBoardY} / character: ${nextCharacterX} ${characterY} / dir: up`
              )
              runOnJS(setCharacterX)(nextCharacterX)
            }
          } else {
            const nextMazeBoardX = mazeBoardX - 1

            console.log(
              `mazeBoard: ${nextMazeBoardX} ${mazeBoardY} / character: ${characterX} ${characterY} / dir: up`
            )
            runOnJS(setMazeBoardX)(nextMazeBoardX)
          }
        }
        if (
          event.translationY > 0 &&
          !jsonData.mazeBoardHorizontalWall[mazeBoardX + characterX + 1][
            mazeBoardY + characterY
          ]
        ) {
          if (screenFixed) {
            const nextCharacterX = ((characterX + 4) % 7) - 3

            if (
              jsonData.mazeBoardGrid[mazeBoardX + nextCharacterX][
                mazeBoardY + characterY
              ] &&
              !jsonData.mazeBoardHorizontalWall[mazeBoardX + nextCharacterX][
                mazeBoardY + characterY
              ]
            ) {
              console.log(
                `mazeBoard: ${mazeBoardX} ${mazeBoardY} / character: ${nextCharacterX} ${characterY} / dir: down`
              )
              runOnJS(setCharacterX)(nextCharacterX)
            }
          } else {
            const nextMazeBoardX = mazeBoardX + 1

            console.log(
              `mazeBoard: ${nextMazeBoardX} ${mazeBoardY} / character: ${characterX} ${characterY} / dir: down`
            )
            runOnJS(setMazeBoardX)(nextMazeBoardX)
          }
        }
      }
      if (Math.abs(event.translationX) > Math.abs(event.translationY)) {
        if (
          event.translationX < 0 &&
          !jsonData.mazeBoardVerticalWall[mazeBoardX + characterX][
            mazeBoardY + characterY
          ]
        ) {
          if (screenFixed) {
            const nextCharacterY = ((characterY + 9) % 7) - 3

            if (
              jsonData.mazeBoardGrid[mazeBoardX + characterX][
                mazeBoardY + nextCharacterY
              ] &&
              !jsonData.mazeBoardVerticalWall[mazeBoardX + characterX][
                mazeBoardY + nextCharacterY + 1
              ]
            ) {
              console.log(
                `mazeBoard: ${mazeBoardX} ${mazeBoardY} / character: ${characterX} ${nextCharacterY} / dir: left`
              )
              runOnJS(setCharacterY)(nextCharacterY)
            }
          } else {
            const nextMazeBoardY = mazeBoardY - 1

            console.log(
              `mazeBoard: ${mazeBoardX} ${nextMazeBoardY} / character: ${characterX} ${characterY} / dir: left`
            )
            runOnJS(setMazeBoardY)(nextMazeBoardY)
          }
        }
        if (
          event.translationX > 0 &&
          !jsonData.mazeBoardVerticalWall[mazeBoardX + characterX][
            mazeBoardY + characterY + 1
          ]
        ) {
          if (screenFixed) {
            const nextCharacterY = ((characterY + 4) % 7) - 3

            if (
              jsonData.mazeBoardGrid[mazeBoardX + characterX][
                mazeBoardY + nextCharacterY
              ] &&
              !jsonData.mazeBoardVerticalWall[mazeBoardX + characterX][
                mazeBoardY + nextCharacterY
              ]
            ) {
              console.log(
                `mazeBoard: ${mazeBoardX} ${mazeBoardY} / character: ${characterX} ${nextCharacterY} / dir: right`
              )
              runOnJS(setCharacterY)(nextCharacterY)
            }
          } else {
            const nextMazeBoardY = mazeBoardY + 1

            console.log(
              `mazeBoard: ${mazeBoardX} ${nextMazeBoardY} / character: ${characterX} ${characterY} / dir: right`
            )
            runOnJS(setMazeBoardY)(nextMazeBoardY)
          }
        }
      }

      if (mazeFlagGrid[mazeBoardX + characterX][mazeBoardY + characterY]) {
        runOnJS(updateMazeFlagGrid)(
          mazeBoardX + characterX,
          mazeBoardY + characterY,
          0
        )

        const nextMazeFlagCount = mazeFlagCount - 1
        console.log(`nextMazeFlagCount: ${nextMazeFlagCount}`)
        runOnJS(setMazeFlagCount)(nextMazeFlagCount)
        if (!nextMazeFlagCount) runOnJS(setMazeSolved)(true)
      }

      context.mazeBoardX = mazeBoardX
      context.mazeBoardY = mazeBoardY
      context.characterX = characterX
      context.characterY = characterY
      //runOnJS(setLeft)(context.translateX);
      //runOnJS(setTop)(context.translateY);
      //console.log(translateX.value);
      //console.log(translateY.value);
    },
  })

  /*
                <FlagBoard
                  mazeBoardSizeX={jsonData.mazeBoardSizeY}
                  mazeBoardSizeY={jsonData.mazeBoardSizeY}
                  mazeFlagGrid={jsonData.mazeFlagGrid}
                />
                */

  const renderPage = () => {
    if (mazeSolved) {
      return <Text>Congratulations!</Text>
    }
    return (
      <View>
        <Timer time={time} />
        <View>
          <AnimatedView style={styles.mazeBoard}>
            <MazeBoard
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
            <FlagBoard
              mazeBoardSizeX={jsonData.mazeBoardSizeX}
              mazeBoardSizeY={jsonData.mazeBoardSizeY}
              mazeFlagGrid={mazeFlagGrid}
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
        </View>
        <Control
          status={status}
          handleStart={handleStart}
          handlePause={handlePause}
          handleStop={handleStop}
        />
      </View>
    )
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <PanGestureHandler onGestureEvent={onDrag}>
        <AnimatedView style={styles.container}>
          <TapGestureHandler onGestureEvent={onDoubleTap} numberOfTaps={2}>
            <AnimatedView style={styles.container}>
              <Text>{`This is MazePage No.${stage}`}</Text>
              <Text>{`You moved ${moveCount} times.`}</Text>
              {runOnJS(renderPage)()}
            </AnimatedView>
          </TapGestureHandler>
        </AnimatedView>
      </PanGestureHandler>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mazeBoard: {
    width: 322,
    height: 322,
    overflow: 'hidden',
  },
})

export default MazePage
