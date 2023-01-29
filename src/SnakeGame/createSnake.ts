import { useEffect, useState } from "react";
import randomPos from "./randomPos";
import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  INITIAL_SNAKE_SIZE,
  SEGMENT_SIZE,
} from "./constants";
import { MovementDirection, Position } from "./types";

const createSnake = (color: string) => {
  const [movementDirection, setMovementDirection] = useState<
    MovementDirection | undefined
  >();
  const [snakeBody, setSnakeBody] = useState<Position[]>([]);
  const snakeHeadPosition = snakeBody[snakeBody.length - 1];

  useEffect(() => {
    const initialPosX = randomPos({
      gridSize: SEGMENT_SIZE,
      threshold: CANVAS_WIDTH,
    });

    const initialPosY = randomPos({
      gridSize: SEGMENT_SIZE,
      threshold: CANVAS_HEIGHT,
    });

    let initialSnakeBody: Position[] = [
      {
        x: initialPosX,
        y: initialPosY,
      },
    ];

    for (let index = 1; index < INITIAL_SNAKE_SIZE; index++) {
      initialSnakeBody.push({
        x: initialPosX + SEGMENT_SIZE * index,
        y: initialPosY,
      });
    }

    setSnakeBody(initialSnakeBody);
  }, []);

  return {
    direction: movementDirection,
    setDirection: setMovementDirection,
    body: snakeBody,
    setBody: setSnakeBody,
    headPos: snakeHeadPosition,
    color,
  };
};

export default createSnake;
