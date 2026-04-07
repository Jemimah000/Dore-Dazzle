const Tile = ({ tile, onClick }) => {
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
        <div className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-900 rounded-xl flex items-center justify-center backface-hidden shadow-lg">
          <span className="text-3xl text-pink-400">❓</span>
        </div>

        {/* BACK */}
        <div className="absolute inset-0 bg-white rounded-xl rotate-y-180 backface-hidden flex items-center justify-center overflow-hidden shadow-xl">
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