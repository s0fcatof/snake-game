export type Position = {
  x: number;
  y: number;
};

export enum MovementDirection {
  UP,
  DOWN,
  LEFT,
  RIGHT,
}

export type Snake = {
  direction: MovementDirection | undefined;
  setDirection: React.Dispatch<
    React.SetStateAction<MovementDirection | undefined>
  >;
  body: Position[];
  setBody: React.Dispatch<React.SetStateAction<Position[] | undefined>>;
  headPos: Position;
  color: string;
};
