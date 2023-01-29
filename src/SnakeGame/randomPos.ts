type RandomPosArgs = {
  gridSize?: number;
  threshold: number;
};

const randomPos = ({ gridSize = 5, threshold }: RandomPosArgs) =>
  Math.floor(Math.random() * (threshold / gridSize)) * gridSize;

export default randomPos;
