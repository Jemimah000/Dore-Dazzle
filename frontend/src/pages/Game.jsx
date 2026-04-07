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
    <div
      className="
        min-h-screen w-full
        bg-[url('/images/wallpaper-1.jpg')]
        bg-cover bg-center bg-no-repeat
        flex flex-col items-center pt-10
        relative
      "
    >
      {/* LIGHT OVERLAY */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* CONTENT */}
      <div className="relative z-10 flex flex-col items-center w-full">

        {/* HEADER */}
        <h1
          className="
            text-5xl font-bold mb-6 tracking-wide
            bg-gradient-to-br from-slate-700 to-slate-900
            bg-clip-text text-transparent
            drop-shadow-lg
          "
        >
          Dore Dazzle
        </h1>

        {/* CONTROLS */}
        <div className="flex items-center gap-6 mb-10 bg-black/40 px-6 py-3 rounded-xl backdrop-blur-md shadow-lg">

          {/* DROPDOWN */}
          <select
            value={difficulty}
            onChange={(e) => {
              setDifficulty(e.target.value);
              setSeconds(0);
              setGameOver(false);
            }}
            className="
              bg-black/40 backdrop-blur-md
              px-4 py-2 rounded-lg shadow-md
              text-xl text-blue-300 font-semibold
              outline-none cursor-pointer
            "
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>

          {/* TIMER */}
          <span className="text-xl text-blue-300 font-semibold">
            ⏱ {seconds}s
          </span>
        </div>

        {/* GAME BOARD */}
        <GameBoard difficulty={difficulty} setGameOver={setGameOver} />

        {/* WIN MESSAGE */}
        {gameOver && (
          <h2 className="text-blue-400 text-3xl mt-8 font-bold drop-shadow-lg">
            🎉 You Won!
          </h2>
        )}
      </div>
    </div>
  );
};

export default Game;