import { Coordinate } from "../types/types";

const getRandomFoodPosition = ( bounds: { xMin: number; xMax: number; yMin: number; yMax: number }, snake: Coordinate[]): Coordinate => {
  let position: Coordinate;

  do {
    position = {
      x: Math.floor(Math.random() * (bounds.xMax + 1)),
      y: Math.floor(Math.random() * (bounds.yMax + 1)),
    };
  } while (snake.some(segment => segment.x === position.x && segment.y === position.y));

  return position;
};

export default getRandomFoodPosition;
