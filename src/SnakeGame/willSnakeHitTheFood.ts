import { SEGMENT_SIZE } from "./constants";
import { MovementDirection, Position } from "./types";

type WillSnakeHitTheFoodArgs = {
  foodPosition: Position;
  snakeHeadPosition: Position;
  direction: MovementDirection;
};

const willSnakeHitTheFood = ({
  foodPosition,
  snakeHeadPosition,
  direction,
}: WillSnakeHitTheFoodArgs) => {
  switch (direction) {
    case MovementDirection.UP:
      return (
        foodPosition.x === snakeHeadPosition.x &&
        snakeHeadPosition.y - SEGMENT_SIZE === foodPosition.y
      );
    case MovementDirection.DOWN:
      return (
        foodPosition.x === snakeHeadPosition.x &&
        snakeHeadPosition.y + SEGMENT_SIZE === foodPosition.y
      );
    case MovementDirection.LEFT:
      return (
        foodPosition.y === snakeHeadPosition.y &&
        snakeHeadPosition.x - SEGMENT_SIZE === foodPosition.x
      );

    case MovementDirection.RIGHT:
      return (
        foodPosition.y === snakeHeadPosition.y &&
        snakeHeadPosition.x + SEGMENT_SIZE === foodPosition.x
      );
  }
};

export default willSnakeHitTheFood;
