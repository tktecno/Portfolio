import React, { useEffect, useMemo, useState } from "react";

export const Intro = () => {
  const messages = useMemo(
    () => [
      "I'm Tapash Roy",
      "Welcome",
      "Namaste",
      "No-Mo-Shkar",
      "Hello !"
    ],
    []
  );

  const [intro, setIntro] = useState(true);
  const [text, setText] = useState(messages[0]);

  useEffect(() => {
    let i = 0;

    const interval = setInterval(() => {
      setText(messages[i]);
      i++;

      if (i === messages.length) {
        clearInterval(interval);
        setTimeout(() => setIntro(false), 400);
      }
    }, 300);

    return () => clearInterval(interval);
  }, [messages]);

  return (
    <>
      {intro && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black intro">
          <h1 className="text-5xl text-white tracking-wider">{text}</h1>
        </div>
      )}
    </>
  );
};
