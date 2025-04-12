import { useEffect, useState } from "react";

const LiveEarthStream = () => {
  const [videoUrl, setVideoUrl] = useState("");

  useEffect(() => {
    setVideoUrl("https://www.youtube.com/embed/0FBiyFpV__g");
  }, []);

  return (
    <div className="flex justify-center items-center h-screen p-4">
      {videoUrl ? (
        <div className="w-full max-w-[1000px] aspect-video">
          <iframe
            className="w-full h-full"
            src={videoUrl}
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      ) : (
        <p>Loading live feed...</p>
      )}
    </div>
  );
};

export default LiveEarthStream;
