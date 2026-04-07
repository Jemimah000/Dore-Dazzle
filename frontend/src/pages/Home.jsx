import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-cyan-300 to-blue-900 text-white">
      <h1 className="text-5xl mb-10 font-bold"> Dore Dazzle</h1>

      <button
        onClick={() => navigate("/game")}
        className="px-6 py-3 bg-slate-900 text-cyan-300 rounded-lg hover:scale-105 transition"
      >
        Start Game
      </button>
    </div>
  );
};

export default Home;