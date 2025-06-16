import { Coordinate } from "../types/types";

const checkGameOver = (snakeHead: Coordinate, boundaries: any): boolean => {
    console.log('checkGameOver called with:', snakeHead);

    return (
        snakeHead.x < boundaries.xMin ||
        snakeHead.x > boundaries.XMax ||
        snakeHead.y > boundaries.xMax ||
        snakeHead.y < boundaries.XMin
    )

}

export default checkGameOver;