import { Coordinate } from "../types/types";

const checkSelfCollision = (head: Coordinate, body: Coordinate[]): boolean => {
    return body.some(segment => segment.x === head.x && segment.y === head.y);
}

export default checkSelfCollision;