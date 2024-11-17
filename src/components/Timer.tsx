"use client";

import { useState, useEffect } from "react";

const Timer = () => {
  const [tempoRestante, setTempoRestante] = useState(600);

  useEffect(() => {
    const timer = setInterval(() => {
      setTempoRestante((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const tempoFormatado = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const segundosRestantes = seconds % 60;
    return `${minutes}:${
      segundosRestantes < 10 ? "0" : ""
    }${segundosRestantes}`;
  };

  return (
    <div className="text-center my-4">
      <h2 className="text-2xl font-bold">Tempo restante:</h2>
      <p className="text-4xl text-red-500 mt-2">
        {tempoFormatado(tempoRestante)}
      </p>
    </div>
  );
};

export default Timer;
