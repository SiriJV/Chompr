import { View, StyleSheet } from "react-native";
import { Coordinate } from "../types/types";

const cellSize = 15;

type SnakeProps = {
    snake: Coordinate[];
}

const Snake = ({snake}: SnakeProps) => {
    return (
        <>
            {snake.map((segment: Coordinate, index: number) => {
                const segmentStyle = {
                    left: segment.x * cellSize,
                    top: segment.y * cellSize,
                    width: cellSize,
                    height: cellSize,
                }
                return <View key={index} style={[styles.snake, segmentStyle]}/>
            })}
        </>
    )
}

export default Snake;

const styles = StyleSheet.create({
    snake: {
        backgroundColor: "black",
        position: "absolute",
    }
});