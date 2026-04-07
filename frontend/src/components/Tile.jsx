const Tile = ({ tile, onClick, isHighlighted }) => {
  const isFlipped = tile.revealed || tile.matched;

  return (
    <div
      onClick={() => onClick(tile)}
      className="w-24 h-24 perspective cursor-pointer"
    >
      <div
        className={`
          relative w-full h-full transform-3d
          transition-transform duration-700 ease-in-out
          ${isFlipped ? "rotate-y-180" : ""}
        `}
      >
        {/* FRONT */}
        <div
          className={`
            absolute inset-0 rounded-xl flex items-center justify-center
            backface-hidden shadow-lg
            bg-gradient-to-br from-slate-700 to-slate-900
            transition-all duration-300
            ${
              isHighlighted
                ? "shadow-cyan-400/80 shadow-[0_0_25px_5px] scale-105"
                : ""
            }
          `}
        >
          <span className="text-3xl text-pink-400">❓</span>
        </div>

        {/* BACK */}
        <div
          className={`
            absolute inset-0 bg-white rounded-xl rotate-y-180
            backface-hidden flex items-center justify-center overflow-hidden shadow-xl
            transition-all duration-300
            ${
              isHighlighted
                ? "shadow-cyan-400/80 shadow-[0_0_25px_5px] scale-105"
                : ""
            }
          `}
        >
          <img
            src={`/images/${tile.symbol}`}
            className="w-4/5 h-4/5 object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Tile;