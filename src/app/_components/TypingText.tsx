"use client";
import { useEffect, useState } from "react";

type TypingTextProps = {
  text: string;
  speed?: number;
};

export function TypingText({ text, speed = 20 }: TypingTextProps) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    setDisplayed("");
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed((prev) => prev + text[i]);
        i++;
      } else {
        clearInterval(interval);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);
  return <p className="whitespace-pre-wrap">{displayed}</p>;
}
