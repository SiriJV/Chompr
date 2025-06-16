import { View, StyleSheet } from "react-native";
import { Coordinate } from "../types/types";

type SnakeProps = {
    snake: Coordinate[];
}

const Snake = ({snake}: SnakeProps) => {
    return (
        <>
        {snake.map((segment: Coordinate, index: number) => {
            const segmentStyle = {
                left: segment.x * 10,
                top: segment.y * 10,
            }
            return <View key={index} style={[styles.snake, segmentStyle]}/>
        })}
        </>
    )
}

export default Snake;

const styles = StyleSheet.create({
    snake: {
        width: 15,
        height: 15,
        backgroundColor: "blue",
        position: "absolute",
    }
})