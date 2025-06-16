import { LayoutChangeEvent, SafeAreaView, StyleSheet, View } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import { Coordinate, Direction, GestureEventType } from "../types/types";
import React, { useEffect, useState } from "react";
import Snake from "./Snake";
import checkGameOver from "../utils/checkGameover";
import checkFoodCollision from "../utils/checkFoodCollision";
import getRandomFoodPosition from "../utils/getRandomFoodPosition";
import Food from "./Food";

const foodInitialPosition = { x: 5, y: 20};
const moveInterval = 50;
const scoreIncrement = 10;

const Game = () => {
    const [direction, setDirection] = useState<Direction>(Direction.Right);
    const [snake, setSnake] = useState<Coordinate[]>([{ x: 5, y: 5 }]);
    const [food, setFood] = useState<Coordinate>(foodInitialPosition);
    const [isGameOver, setIsGameOver] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [gameBounds, setGameBounds] = useState({ xMin: 0, xMax: 0, yMin: 0, yMax: 0 });

    const cellSize = 15;
    const borderWidth = 4;

    const handleGameLayout = (event: LayoutChangeEvent) => {
        const { width, height } = event.nativeEvent.layout;

        const xMax = Math.floor(width / cellSize) - 1;
        const yMax = Math.floor(height / cellSize) - 1;

        setGameBounds({ xMin: 0, xMax, yMin: 0, yMax });
    };

    useEffect(() => {
        if (isGameOver) return;
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
    
            if (checkGameOver(newHead, gameBounds)) {
                setIsGameOver(true);
                return prevSnake;
            }

            let newSnake;
            if (checkFoodCollision(newHead, food)) {
                newSnake = [newHead, ...prevSnake];
                setFood(getRandomFoodPosition(gameBounds, newSnake));
            } else {
                newSnake = [newHead, ...prevSnake.slice(0, -1)];
            } 

            return newSnake;
            });
        }, moveInterval);
    
    return () => clearInterval(intervalId);
    }, [direction, isPaused, isGameOver, gameBounds]);

    const handleGesture = (event: GestureEventType) => {
        const { translationX, translationY } = event.nativeEvent;
    
        if (Math.abs(translationX) > Math.abs(translationY)) {
            setDirection(translationX > 0 ? Direction.Right : Direction.Left);
        } else {
            setDirection(translationY > 0 ? Direction.Down : Direction.Up);
        }
    };

    return (
        <>
        <PanGestureHandler onGestureEvent={handleGesture}>
            <SafeAreaView style={styles.container}>
                <View style={styles.gameArea} onLayout={handleGameLayout}>
                    <Snake snake={snake}/>
                    <Food position={food} cellSize={cellSize} />
                    {isGameOver && <View style={styles.gameOverOverlay} />}
                </View>
            </SafeAreaView>
        </PanGestureHandler>
        </>
    )
}

export default Game;

const styles = StyleSheet.create({
  gameArea: {
    flex: 1,
    margin: 20,
    borderWidth: 4,
    borderColor: "white",
    position: "relative",
    backgroundColor: "red",
  },
  container: {
    flex: 1,
    backgroundColor: "purple",
  },
  gameOverOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
});