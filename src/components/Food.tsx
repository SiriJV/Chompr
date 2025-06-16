import React from "react";
import { View, StyleSheet } from "react-native";
import { Coordinate } from "../types/types";

type FoodProps = {
  position: Coordinate;
  cellSize: number;
}

const Food = ({ position, cellSize }: FoodProps) => {
  return (
    <View style={[ styles.food, { left: position.x * cellSize, top: position.y * cellSize, width: cellSize, height: cellSize, }, ]} />
  );
};

const styles = StyleSheet.create({
  food: {
    position: "absolute",
    backgroundColor: "yellow",
    borderRadius: 4,
  },
});

export default Food;
