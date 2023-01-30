import { useEffect, useRef, useState } from "react";
import Score from "../Score";
import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  INITIAL_SNAKE_SIZE,
  MOVEMENT_SPEED,
  SEGMENT_SIZE,
} from "./constants";
import { MovementDirection, Position, Snake } from "./types";
import useSnakeMovement from "./useSnakeMovement";
import randomPos from "./randomPos";
import useInterval from "../hooks/useInterval";
import createSnake from "./createSnake";
import sound from "../../assets/eat.mp3";
import willSnakeHitTheFood from "./willSnakeHitTheFood";

const SnakeGame = () => {
  const [audio] = useState(new Audio(sound));
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [foodPosition, setFoodPosition] = useState<Position | undefined>();
  const firstSnake = createSnake("blue");
  const secondSnake = createSnake("green");
  const { moveDown, moveUp, moveLeft, moveRight } = useSnakeMovement();

  type DrawArgs = {
    context: CanvasRenderingContext2D;
    snakes: Snake[];
    foodPosition?: Position;
  };

  const draw = ({ context, snakes, foodPosition }: DrawArgs) => {
    if (foodPosition) {
      context.beginPath();
      context.arc(
        foodPosition?.x + SEGMENT_SIZE / 2,
        foodPosition?.y + SEGMENT_SIZE / 2,
        SEGMENT_SIZE / 2,
        0,
        2 * Math.PI,
        false
      );
      context.fillStyle = "rgb(200, 0, 0)";
      context.fill();
    }

    context.fillStyle = "rgb(0, 0, 0)";

    snakes[0].body.forEach((segment) => {
      context.fillStyle = snakes[0].color;
      context.fillRect(segment.x, segment.y, SEGMENT_SIZE, SEGMENT_SIZE);
    });

    snakes[1].body.forEach((segment) => {
      context.fillStyle = snakes[1].color;
      context.fillRect(segment.x, segment.y, SEGMENT_SIZE, SEGMENT_SIZE);
    });
  };

  useEffect(() => {
    setFoodPosition({
      x: randomPos({ threshold: CANVAS_WIDTH }),
      y: randomPos({ threshold: CANVAS_HEIGHT }),
    });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    canvasRef.current.focus();

    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }
    context.fillStyle = "#FFF";
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);

    draw({
      context,
      snakes: [firstSnake as Snake, secondSnake as Snake],
      foodPosition,
    });

    return () =>
      context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  }, [draw, canvasRef]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLCanvasElement>) => {
    switch (event.code) {
      case "KeyS":
        if (firstSnake.direction !== MovementDirection.UP) {
          firstSnake.setDirection(MovementDirection.DOWN);
        }
        break;
      case "KeyW":
        if (firstSnake.direction !== MovementDirection.DOWN) {
          firstSnake.setDirection(MovementDirection.UP);
        }
        break;
      case "KeyD":
        if (firstSnake.direction !== MovementDirection.LEFT) {
          firstSnake.setDirection(MovementDirection.RIGHT);
        }
        break;
      case "KeyA":
        if (firstSnake.direction !== MovementDirection.RIGHT) {
          firstSnake.setDirection(MovementDirection.LEFT);
        }
        break;
      case "ArrowDown":
        if (secondSnake.direction !== MovementDirection.UP) {
          secondSnake.setDirection(MovementDirection.DOWN);
        }
        break;
      case "ArrowUp":
        if (secondSnake.direction !== MovementDirection.DOWN) {
          secondSnake.setDirection(MovementDirection.UP);
        }
        break;
      case "ArrowRight":
        if (secondSnake.direction !== MovementDirection.LEFT) {
          secondSnake.setDirection(MovementDirection.RIGHT);
        }
        break;
      case "ArrowLeft":
        if (secondSnake.direction !== MovementDirection.RIGHT) {
          secondSnake.setDirection(MovementDirection.LEFT);
        }
        break;
    }
  };

  const moveSnake = (snake: Snake) => {
    let snakeBodyAfterMovement: Position[] | undefined;
    switch (snake.direction) {
      case MovementDirection.UP:
        snakeBodyAfterMovement = moveUp(snake.body);
        break;
      case MovementDirection.DOWN:
        snakeBodyAfterMovement = moveDown(snake.body);
        break;
      case MovementDirection.LEFT:
        snakeBodyAfterMovement = moveLeft(snake.body);
        break;
      case MovementDirection.RIGHT:
        snakeBodyAfterMovement = moveRight(snake.body);
        break;
    }

    if (
      snake.direction !== undefined &&
      foodPosition &&
      willSnakeHitTheFood({
        foodPosition,
        snakeHeadPosition: snake.headPos,
        direction: snake.direction,
      })
    ) {
      snake.setBody([
        ...snakeBodyAfterMovement!,
        { x: foodPosition.x, y: foodPosition.y },
      ]);

      audio.play();

      setFoodPosition({
        x: randomPos({ threshold: CANVAS_WIDTH }),
        y: randomPos({ threshold: CANVAS_HEIGHT }),
      });
    } else if (snakeBodyAfterMovement) {
      snake.setBody(snakeBodyAfterMovement);
    }
  };

  useInterval(() => {
    moveSnake(firstSnake as Snake);
    moveSnake(secondSnake as Snake);
  }, MOVEMENT_SPEED);

  return (
    <div
      style={{
        outline: "none",
        width: "100% auto",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Score
        score1={{
          points: (firstSnake.body.length - INITIAL_SNAKE_SIZE) * 5,
          color: firstSnake.color,
        }}
        score2={{
          points: (secondSnake.body.length - INITIAL_SNAKE_SIZE) * 5,
          color: secondSnake.color,
        }}
      />
      <canvas
        tabIndex={0}
        id="canvas"
        style={{ border: "2px solid black", outline: "none" }}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        ref={canvasRef}
        onKeyDown={handleKeyDown}
      />

      <div className="controls">
        <section>
          <span>W</span>
          <span>A</span>
          <span>S</span>
          <span>D</span>
        </section>
        <h2>Controls</h2>
        <section>
          <span>&uarr;</span>
          <span>&larr;</span>
          <span>&darr;</span>
          <span>&rarr;</span>
        </section>
      </div>
    </div>
  );
};

export default SnakeGame;
