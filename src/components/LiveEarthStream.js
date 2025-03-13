import { useEffect, useState } from "react";

const LiveEarthStream = () => {
  const [videoUrl, setVideoUrl] = useState("");

  useEffect(() => {
    setVideoUrl("https://www.youtube.com/embed/0FBiyFpV__g");
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      {videoUrl ? (
        <iframe width="1000" height="550" src={videoUrl} frameBorder="0" allowFullScreen></iframe>
      ) : (
        <p>Loading live feed...</p>
      )}
    </div>
  );
};

export default LiveEarthStream;
