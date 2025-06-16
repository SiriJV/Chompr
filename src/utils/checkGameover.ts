import { Coordinate } from "../types/types";

const checkGameOver = (snakeHead: Coordinate, boundaries: { xMin: number; xMax: number; yMin: number; yMax: number }) => {

    return (
        snakeHead.x < boundaries.xMin ||
        snakeHead.x > boundaries.xMax ||
        snakeHead.y < boundaries.yMin ||
        snakeHead.y > boundaries.yMax
    );
}

export default checkGameOver;