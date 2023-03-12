import React, { useState, useEffect } from "react";
import './App.css'

function Timer() {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive && time < 7200) {
      interval = setInterval(() => {
        setTime((time) => time + 1);
      }, 1000);
    } else if (time >= 7200) {
      resetTimer();
    }
    return () => clearInterval(interval);
  }, [isActive, time]);

  const resetTimer = () => {
    setTime(0);
    setIsActive(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    setIsPaused(true);
    setIsActive(false);
  };

  const handleResume = () => {
    setIsPaused(false);
    setIsActive(true);
  };

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600)
      .toString()
      .padStart(2, "0");
    const minutes = Math.floor((time % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (time % 60).toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <div className="App">
      <h1>{formatTime(time)}</h1>
      <div>
        {isActive && !isPaused && <button onClick={handlePause}>Pause</button>}
        {isPaused && <button onClick={handleResume}>Resume</button>}
        <button onClick={resetTimer}>Restart</button>
      </div>
    </div>
  );
}

export default Timer;
