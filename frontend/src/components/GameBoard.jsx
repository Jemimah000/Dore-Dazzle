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
  const [highlighted, setHighlighted] = useState([]); // ⭐ NEW

  const getPairs = () => {
    if (difficulty === "easy") return 4;
    if (difficulty === "medium") return 6;
    return 8;
  };

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
    setHighlighted([]); // reset glow
    setGameOver(false);
  }, [difficulty]);

  const handleClick = (clickedTile) => {
    if (clickedTile.revealed || clickedTile.matched) return;

    const newTiles = tiles.map((tile) =>
      tile.id === clickedTile.id ? { ...tile, revealed: true } : tile
    );

    const revealedTiles = newTiles.filter(
      (tile) => tile.revealed && !tile.matched
    );

    if (revealedTiles.length === 2) {
      const [first, second] = revealedTiles;

      if (first.symbol === second.symbol) {
        // ✅ MATCH → SHOW GLOW
        setHighlighted([first.id, second.id]);

        setTimeout(() => {
          setTiles((prev) =>
            prev.map((tile) =>
              tile.symbol === first.symbol
                ? { ...tile, matched: true }
                : tile
            )
          );

          setHighlighted([]); // ❌ remove glow
        }, 700);
      } else {
        // ❌ NOT MATCH
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

  useEffect(() => {
    if (tiles.length > 0 && tiles.every((tile) => tile.matched)) {
      setGameOver(true);
    }
  }, [tiles]);

  return (
    <div className="flex justify-center items-center w-full px-4">
      <div className="grid grid-cols-4 gap-6">
        {tiles.map((tile) => (
          <Tile
            key={tile.id}
            tile={tile}
            onClick={handleClick}
            isHighlighted={highlighted.includes(tile.id)} // ⭐ PASS HERE
          />
        ))}
      </div>
    </div>
  );
};

export default GameBoard;