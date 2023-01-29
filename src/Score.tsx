type Score = {
  color: string;
  points: number;
};

type ScoreProps = {
  score1: Score;
  score2: Score;
};

const Score = ({ score1, score2 }: ScoreProps) => {
  return (
    <>
      <div
        style={{
          backgroundColor: "white",
          fontWeight: "bold",
          color: "black",
          border: "2px solid black",
          padding: "8px 12px",
          fontSize: "32px",
        }}
      >
        <span style={{ color: score1.color }}>{score1.points}</span> :{" "}
        <span style={{ color: score2.color }}>{score2.points}</span>
      </div>
    </>
  );
};

export default Score;
