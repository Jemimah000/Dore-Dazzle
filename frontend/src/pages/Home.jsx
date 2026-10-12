import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const videoRef = useRef(null);

  // 🎬 Play video automatically
  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    video.muted = false;

    const playVideo = async () => {
      try {
        await video.play();
      } catch (error) {
        console.log("Autoplay with sound was blocked:", error);
      }
    };

    playVideo();
  }, []);

  // 🎮 Go to game after video ends
  const handleVideoEnd = () => {
    navigate("/game");
  };

  // 🔊 Start video with sound if autoplay is blocked
  const handleStart = async () => {
    const video = videoRef.current;

    if (!video) return;

    video.muted = false;

    try {
      await video.play();
    } catch (error) {
      console.log("Video could not start:", error);
    }
  };

  return (
    <div
      className="relative h-screen w-full overflow-hidden bg-black"
      onClick={handleStart}
    >
      {/* 🎬 BACKGROUND VIDEO */}
      <video
        ref={videoRef}
        src="/vedios/entry.mp4"
        autoPlay
        playsInline
        preload="auto"
        controls={false}
        onEnded={handleVideoEnd}
        className="absolute inset-0 h-full w-full object-cover"
        style={{
          pointerEvents: "none",
        }}
      />
    </div>
  );
};

export default Home;