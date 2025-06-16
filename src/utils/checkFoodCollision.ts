import { Coordinate } from "../types/types";

const checkFoodCollision = (head: Coordinate, food: Coordinate): boolean => {
  return head.x === food.x && head.y === food.y;
};

export default checkFoodCollision;