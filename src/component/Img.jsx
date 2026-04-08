import React, { useEffect, useState } from "react";

const pictures = ["./character.webp", "./tps2.webp"];

export const Img = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [displayedUrl, setDisplayedUrl] = useState(pictures[0]);
  const [isSwitching, setIsSwitching] = useState(false);
  const isMirrored = displayedUrl === "./tps2.webp";

  useEffect(() => {
    pictures.forEach((source) => {
      const image = new Image();
      image.src = source;
    });
  }, []);

  const handleClick = () => {
    if (isSwitching) {
      return;
    }

    const nextIndex = (activeIndex + 1) % pictures.length;
    const nextUrl = pictures[nextIndex];

    if (nextUrl === displayedUrl) {
      setActiveIndex(nextIndex);
      return;
    }

    setIsSwitching(true);

    const image = new Image();
    image.onload = () => {
      setDisplayedUrl(nextUrl);
      setActiveIndex(nextIndex);
      setIsSwitching(false);
    };
    image.onerror = () => {
      setIsSwitching(false);
    };
    image.src = nextUrl;
  };

  return (
    <img
      src={displayedUrl}
      alt="Tapash Roy portfolio illustration"
      className={`h-full w-full object-cover ${isMirrored ? "scale-x-[-1]" : ""}`}
      decoding="async"
      fetchPriority="high"
      onClick={handleClick}
    />
  );
};
