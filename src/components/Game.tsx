import { LayoutChangeEvent, SafeAreaView, StatusBar, StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import { Coordinate, Direction, GestureEventType } from "../types/types";
import React, { useEffect, useState } from "react";
import Snake from "./Snake";
import checkGameOver from "../utils/checkGameover";
import checkFoodCollision from "../utils/checkFoodCollision";
import getRandomFoodPosition from "../utils/getRandomFoodPosition";
import Food from "./Food";
import GameOverModal from "./GameOverModal";
import { useNavigation } from "@react-navigation/native";
import RestartIcon from "./icons/RestartIcon";
import checkSelfCollision from "../utils/checkSelfCollision";
import DifficultyChooser from "./DifficultyChooser";
import PauseToggle from "./PauseToggle";
import SpeedIcon from "./icons/SpeedIcon";

const foodInitialPosition = { x: 5, y: 20};
// const moveInterval = 75;
const scoreIncrement = 10;

// const difficultySettings = {
//     Easy: 100,
//     Medium: 50,
//     Hard: 20,
// };
  
const funnyNames = {
    Easy: 'ez 🥱',
    Medium: 'mid',
    Hard: 'Goat Mode',
};
  

const Game = () => {
    const [direction, setDirection] = useState<Direction>(Direction.Right);
    const [snake, setSnake] = useState<Coordinate[]>([{ x: 5, y: 5 }]);
    const [food, setFood] = useState<Coordinate>(foodInitialPosition);
    const [isGameOver, setIsGameOver] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [gameBounds, setGameBounds] = useState({ xMin: 0, xMax: 0, yMin: 0, yMax: 0 });
    const [score, setScore] = useState(0);
    
    const [difficultyModalVisible, setDifficultyModalVisible] = useState(true);
    const [selectedDifficulty, setSelectedDifficulty] = useState<'Easy' | 'Medium' | 'Hard'>('Easy');
    const [moveInterval, setMoveInterval] = useState(150);
    
    const [isStarted, setIsStarted] = useState(false);
    
    const navigation = useNavigation();
    
    const difficultySettings = {
        Easy: 100,
        Medium: 75,
        Hard: 50,
    };

    const handlePlay = () => {
        if (!selectedDifficulty) return;
        setMoveInterval(difficultySettings[selectedDifficulty]);
        setDifficultyModalVisible(false);
        setIsStarted(true);
        resetGame();
    };

    const cellSize = 15;
    // const borderWidth = 4;

    const handleGameLayout = (event: LayoutChangeEvent) => {
        const { width, height } = event.nativeEvent.layout;

        const xMax = Math.floor(width / cellSize) - 1;
        const yMax = Math.floor(height / cellSize) - 1;

        setGameBounds({ xMin: 0, xMax, yMin: 0, yMax });
    };

    useEffect(() => {
        if (!isStarted || isGameOver) return;
        if (gameBounds.xMax === 0 || gameBounds.yMax === 0) return;
    
        const intervalId = setInterval(() => {
            if (isPaused) return;
        
            setSnake(prevSnake => {
                const head = prevSnake[0];
                let newHead = { ...head };
        
                switch (direction) {
                    case Direction.Up:
                        newHead.y -= 1;
                        break;
                    case Direction.Down:
                        newHead.y += 1;
                        break;
                    case Direction.Left:
                        newHead.x -= 1;
                        break;
                    case Direction.Right:
                        newHead.x += 1;
                        break;
                }
        
                if (
                    checkGameOver(newHead, gameBounds) ||
                    checkSelfCollision(newHead, prevSnake)
                ) {
                    setIsGameOver(true);
                    return prevSnake;
                }

                let newSnake;

                if (checkFoodCollision(newHead, food)) {
                    newSnake = [newHead, ...prevSnake];
                    setFood(getRandomFoodPosition(gameBounds, newSnake));
                    setScore(prev => prev + scoreIncrement);
                } else {
                    newSnake = [newHead, ...prevSnake.slice(0, -1)];
                } 

                return newSnake;
                });
            }, moveInterval);
    
        return () => clearInterval(intervalId);
    }, [direction, isPaused, isGameOver, gameBounds, moveInterval, isStarted]);

    const handleGesture = (event: GestureEventType) => {
        const { translationX, translationY } = event.nativeEvent;
    
        setDirection(prev => {
            if (Math.abs(translationX) > Math.abs(translationY)) {
                if (translationX > 0 && prev !== Direction.Left) {
                    return Direction.Right;
                } else if (translationX < 0 && prev !== Direction.Right) {
                    return Direction.Left;
                }
            } else {
                if (translationY > 0 && prev !== Direction.Up) {
                    return Direction.Down;
                } else if (translationY < 0 && prev !== Direction.Down) {
                    return Direction.Up;
                }
            }
            return prev;
        })
    }


    const resetGame = () => {
        setSnake([{ x: 5, y: 5 }]);
        setDirection(Direction.Right);
        setFood(foodInitialPosition);
        setScore(0);
        setIsGameOver(false);
      };

    // const onGameEnd = (finalScore: number) => {
    //     setScore(finalScore);
    //     setIsGameOver(true);
    // };

    const handleRestart = () => {
        resetGame();
    };

    const handleChooseNew = () => {
        setIsGameOver(false);
        navigation.navigate('Search' as never);
    };

    return (
        <>
        <PanGestureHandler onGestureEvent={handleGesture}>
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="light-content" backgroundColor="#1F1F1F" />
                    <View style={styles.controlBar}>
                        <View style={{ flexDirection: "row", gap: 15 }}>
                            {/* <TouchableOpacity style={{ height: 33, justifyContent: "center" }} onPress={() => {setIsPaused(true); setDifficultyModalVisible(true);}}>
                                <SpeedIcon color="white" />
                            </TouchableOpacity> */}
                            <View style={styles.scoreContainer2}>
                                <Text style={styles.scoreText2}>Score: {score}</Text>
                            </View>
                        </View>
                        {/* <View style={styles.scoreContainer}>
                            <Text style={styles.scoreText}>{score}</Text>
                        </View> */}
                        <View style={{ flexDirection: "row", gap: 20 }}>
                        <TouchableOpacity style={{ height: 33, justifyContent: "center" }} onPress={() => {setIsPaused(true); setDifficultyModalVisible(true);}}>
                                <SpeedIcon color="white" />
                            </TouchableOpacity>
                        <TouchableOpacity style={{ height: 33, justifyContent: "center" }} onPress={handleRestart}>
                            <RestartIcon color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ height: 33, justifyContent: "center" }} onPress={() => setIsPaused(prev => !prev)}>
                            <PauseToggle paused={isPaused} onToggle={() => setIsPaused(prev => !prev)} color="white" />
                        </TouchableOpacity>
                        </View>
                    </View>
                <View style={styles.gameArea} onLayout={handleGameLayout}>
                    <Snake snake={snake}/>
                    <Food position={food} cellSize={cellSize} />
                    {isGameOver && <View style={styles.gameOverOverlay} />}
                    <GameOverModal visible={isGameOver} score={score} onRestart={handleRestart} onChooseNew={handleChooseNew} />
                    <DifficultyChooser visible={difficultyModalVisible} selectedDifficulty={selectedDifficulty} onSelectDifficulty={setSelectedDifficulty} onPlay={handlePlay} />
                </View>
            </SafeAreaView>
        </PanGestureHandler>
        </>
    )
}

export default Game;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#1F1F1F",
    },
    gameArea: {
      flex: 1,
      backgroundColor: "hotpink",
      overflow: "hidden",
      position: "relative",
    },
    gameOverOverlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: "rgba(0, 0, 0, 0)",
    },
    controlBar: {
        flexDirection: "row",
        // gap: 20,
        alignItems: "center",
        justifyContent: "space-between",
        zIndex: 10,
        paddingHorizontal: 15,
        paddingTop: 5,
        paddingBottom: 15,
        backgroundColor: '#1F1F1F',
    },
    inputContainer: {
        paddingHorizontal: 15,
        paddingTop: 5,
        paddingBottom: 15,
        backgroundColor: '#1F1F1F',
    },
    input: {
        backgroundColor: '#353535',
        color: '#fff',
        padding: 8,
        borderRadius: 8,
    },
    scoreContainer: {
        flex: 1,
        position: "absolute",
        bottom: 10,
        left: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    scoreText: {
        color: "black",
        fontSize: 20,
        fontWeight: "600",
    },  
    scoreContainer2: {
        // flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },    
    scoreText2: {
        color: "white",
        fontSize: 20,
        fontWeight: "600",
    },  
});