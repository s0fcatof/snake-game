import { CANVAS_HEIGHT, CANVAS_WIDTH, SEGMENT_SIZE } from "./constants";
import { Position } from "./types";

const useSnakeMovement = () => ({
  moveLeft: (snakeBody: Position[]) => {
    const snakeBodyTemp = [...snakeBody];
    const headPos = snakeBodyTemp[snakeBodyTemp.length - 1];
    snakeBodyTemp.shift();
    return [
      ...snakeBodyTemp,
      {
        ...headPos,
        x:
          headPos.x - SEGMENT_SIZE <= -SEGMENT_SIZE
            ? CANVAS_WIDTH - SEGMENT_SIZE
            : headPos.x - SEGMENT_SIZE,
      },
    ];
  },
  moveRight: (snakeBody: Position[]) => {
    const snakeBodyTemp = [...snakeBody];
    const headPos = snakeBodyTemp[snakeBodyTemp.length - 1];
    snakeBodyTemp.shift();
    return [
      ...snakeBodyTemp,
      {
        ...headPos,
        x:
          headPos.x + SEGMENT_SIZE >= CANVAS_WIDTH
            ? 0
            : headPos.x + SEGMENT_SIZE,
      },
    ];
  },
  moveUp: (snakeBody: Position[]) => {
    const snakeBodyTemp = [...snakeBody];
    const headPos = snakeBodyTemp[snakeBodyTemp.length - 1];
    snakeBodyTemp.shift();
    return [
      ...snakeBodyTemp,
      {
        ...headPos,
        y:
          headPos.y - SEGMENT_SIZE <= -SEGMENT_SIZE
            ? CANVAS_HEIGHT - SEGMENT_SIZE
            : headPos.y - SEGMENT_SIZE,
      },
    ];
  },
  moveDown: (snakeBody: Position[]) => {
    const snakeBodyTemp = [...snakeBody];
    const headPos = snakeBodyTemp[snakeBodyTemp.length - 1];
    snakeBodyTemp.shift();
    return [
      ...snakeBodyTemp,
      {
        ...headPos,
        y:
          headPos.y + SEGMENT_SIZE >= CANVAS_HEIGHT
            ? 0
            : headPos.y + SEGMENT_SIZE,
      },
    ];
  },
});

export default useSnakeMovement;
