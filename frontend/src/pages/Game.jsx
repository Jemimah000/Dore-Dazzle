import { useState, useEffect } from "react";
import GameBoard from "../components/GameBoard";

const Game = () => {
  const [difficulty, setDifficulty] = useState("medium");
  const [seconds, setSeconds] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (gameOver) return;

    const timer = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [gameOver]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white flex flex-col items-center justify-start pt-10">

      {/* HEADER */}
      <h1 className="text-5xl font-bold text-cyan-400 mb-6 tracking-wide">
        Dore Dazzle
      </h1>

      {/* CONTROLS */}
      <div className="flex items-center gap-6 mb-10">
        <select
          value={difficulty}
          onChange={(e) => {
            setDifficulty(e.target.value);
            setSeconds(0);
            setGameOver(false);
          }}
          className="bg-slate-700 px-4 py-2 rounded-lg text-lg shadow-md"
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>

        <span className="text-xl text-cyan-300 font-semibold">
          ⏱ {seconds}s
        </span>
      </div>

      {/* GAME BOARD */}
      <GameBoard difficulty={difficulty} setGameOver={setGameOver} />

      {gameOver && (
        <h2 className="text-green-400 text-3xl mt-8 font-bold">
          🎉 You Won!
        </h2>
      )}
    </div>
  );
};

export default Game;