import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "./stopwatch.css";

const timerStatus = {
  stopped: "stopped",
  running: "running",
  paused: "paused",
};

const renderSeconds = (timeElapsed) => {
  const seconds = Math.floor(timeElapsed % 60);
  return seconds < 10 ? `0${seconds}` : seconds;
};

const renderMinutes = (timeElapsed) => {
  const minutes = Math.floor(timeElapsed / 60);
  return minutes < 10 ? `0${minutes}` : minutes;
};

const Stopwatch = () => {
  // Maintains Timer Status
  const [timerState, setTimerState] = useState(timerStatus.stopped);

  //   Maintains Time Elapsed
  const [timeElapsedInSeconds, setTimeElapsedInSeconds] = useState(0);

  //   Maintains Timer Interval
  const [timeInterval, setTimeInterval] = useState(null);

  //   Clears Timer on Unmount
  useEffect(() => {
    return () => {
      if (timeInterval) {
        clearInterval(timeInterval);
      }
    };
  }, [timeInterval]);

  //   Reset Timer Handler
  const onResetTimer = () => {
    if (timeInterval) {
      clearInterval(timeInterval);
    }
    setTimerState(timerStatus.stopped);
    setTimeElapsedInSeconds(0);
  };

  //   Stop Timer Handler
  const onStopTimer = (time) => {
    if (timeInterval) {
      clearInterval(timeInterval);
    }
    setTimerState(timerStatus.stopped);
    toast.success(`Final Elapsed Time is ${time}`, {
      position: "top-center",
    });
    setTimeElapsedInSeconds(0);
  };

  //   Updates Timer
  const updateTime = () => setTimeElapsedInSeconds((prevTime) => prevTime + 1);

  //   Start and Pause Handler
  const onStartPauseTimer = () => {
    // Pauses the timer
    if (timerState === timerStatus.running) {
      if (timeInterval) {
        clearInterval(timeInterval);
      }
      setTimerState(timerStatus.paused);
    } // Start or resumes the timer
    else {
      const interval = setInterval(updateTime, 1000);
      setTimeInterval(interval);
      setTimerState(timerStatus.running);
    }
  };

  //   Maintains Current Time
  const time = `${renderMinutes(timeElapsedInSeconds)}:${renderSeconds(
    timeElapsedInSeconds
  )}`;

  return (
    <>
      <div className="stopwatch-container">
        <h1 className="stopwatch">Stopwatch</h1>

        {/* Timer Card */}
        <div className="timer-container">
          <div className="timer">
            <img className="timer-image" src="timer.png" alt="stopwatch" />
            <h2 className="timer-h2">Timer</h2>
          </div>

          <h1 className="stopwatch-timer">{time}</h1>

          {/* Timer Button Container */}
          <div className="timer-btns-div">
            {/* Renders Start/Pause Button */}
            <button
              type="button"
              className={`${
                timerState === timerStatus.running
                  ? "pause-button"
                  : "start-button"
              } button`}
              onClick={onStartPauseTimer}
            >
              {timerState === timerStatus.running ? "Pause" : "Start"}
            </button>

            {/* Renders Stop Button */}
            <button
              type="button"
              className="stop-button button"
              onClick={() => onStopTimer(time)}
            >
              Stop
            </button>

            {/* Renders Resets Button */}
            <button
              type="button"
              className="reset-button button"
              onClick={onResetTimer}
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Renders Alert */}
      <ToastContainer autoClose={3000} />
    </>
  );
};

export default Stopwatch;
