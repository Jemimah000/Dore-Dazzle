import { useState, useEffect } from "react";
import Tile from "./Tile";

const images = [
  "Doraemon.jpeg",
  "Nobita.jpeg",
  "Gian.jpeg",
  "Suneo.jpeg",
  "Shizuka.jpeg",
  "Dorami.jpeg",
  "all5.jpeg",
  "grnma.jpeg",
  "Master.jpeg"
];

const GameBoard = ({ difficulty, setGameOver }) => {
  const [tiles, setTiles] = useState([]);

  // 🎯 Difficulty
  const getPairs = () => {
    if (difficulty === "easy") return 4;
    if (difficulty === "medium") return 6;
    return 8;
  };

  // 🎯 Initialize game
  useEffect(() => {
    const pairs = getPairs();
    const selected = images.slice(0, pairs);

    const shuffled = [...selected, ...selected]
      .sort(() => Math.random() - 0.5)
      .map((img, index) => ({
        id: index,
        symbol: img,
        revealed: false,
        matched: false
      }));

    setTiles(shuffled);
    setGameOver(false);
  }, [difficulty]);

  // 🎯 Handle click
  const handleClick = (clickedTile) => {
    // prevent invalid clicks
    if (clickedTile.revealed || clickedTile.matched) return;

    const newTiles = tiles.map((tile) =>
      tile.id === clickedTile.id ? { ...tile, revealed: true } : tile
    );

    const revealedTiles = newTiles.filter((tile) => tile.revealed && !tile.matched);

    // if 2 cards open
    if (revealedTiles.length === 2) {
      const [first, second] = revealedTiles;

      if (first.symbol === second.symbol) {
        // ✅ MATCH
        setTimeout(() => {
          setTiles((prev) =>
            prev.map((tile) =>
              tile.symbol === first.symbol
                ? { ...tile, matched: true }
                : tile
            )
          );
        }, 400);
      } else {
        // ❌ NOT MATCH (flip back smoothly)
        setTimeout(() => {
          setTiles((prev) =>
            prev.map((tile) =>
              tile.revealed && !tile.matched
                ? { ...tile, revealed: false }
                : tile
            )
          );
        }, 1000);
      }
    }

    setTiles(newTiles);
  };

  // 🎯 Game Over check
  useEffect(() => {
    if (tiles.length > 0 && tiles.every((tile) => tile.matched)) {
      setGameOver(true);
    }
  }, [tiles]);

  return (
    <div className="flex justify-center items-center w-full px-4">
      <div className="grid grid-cols-4 gap-6">
        {tiles.map((tile) => (
          <Tile key={tile.id} tile={tile} onClick={handleClick} />
        ))}
      </div>
    </div>
  );
};

export default GameBoard;