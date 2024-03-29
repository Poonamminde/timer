import React from "react";
import { useState, useEffect } from "react";
import "./index.css";
const Index = () => {
  const [currentTime, setCurrentTime] = useState(new Date().getTime());
  const [futureTime, setFutureTime] = useState(new Date().getTime());
  //const [time, setTime] = useState(0);
  const [timeState, setTimeState] = useState(0);
  const [interval, setIntervall] = useState(null);
  useEffect(() => {
    if (
      futureTime > currentTime &&
      Math.floor((futureTime - currentTime) / (1000 * 60 * 60 * 24)) < 100
    ) {
      setTimeState(0);
      startTimer();
    } else if (currentTime > futureTime) {
      setTimeState(1);
      clearInterval(interval);
    } else {
      console.log("hii");
      setTimeState(2);
    }
  }, [currentTime, futureTime, interval]);
  // useEffect(() => {
  //   localStorage.setItem(time, futureTime);
  // }, [futureTime]);
  useEffect(() => {
    //setFutureTime(localStorage.getItem(time));
    if (Number(localStorage.getItem("time")) > new Date().getTime()) {
      setFutureTime(Number(localStorage.getItem("time")));
      startTimer();
      setTimeState(1);
    } else {
      setTimeState(0);
    }
  }, []);
  const startTimer = () => {
    let timer;
    timer = setInterval(() => {
      setCurrentTime(new Date().getTime());
    }, 1000);
    setIntervall(timer);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("data");
    const arr = Array.from(e.target);
    setCurrentTime(new Date().getTime());
    setFutureTime(new Date(arr[0].value).getTime());
    setTimeState(0);
    localStorage.setItem("time", new Date(arr[0].value).getTime());
  };
  return (
    <div class="container">
      <h1>
        <span id="heading1">Countdown</span> <span id="heading2">Timer</span>
      </h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="datetime-local"
          class="input"
          //min={
          //   new Date().toISOString().split("T")[0] +
          //   "T" +
          //   new Date().toTimeString().split(" ")[0]
          // } // Set min date-time
          // max={
          //   new Date()
          //     .setDate(new Date().getDate() + 100)
          //     .toISOString()
          //     .split("T")[0] +
          //   "T" +
          //   new Date()
          //     .setDate(new Date().getDate() + 100)
          //     .toTimeString()
          //     .split(" ")[0]
          // } // Set max date-time
          required
        />
        <br />
        <button type="submit" class="input">
          Start Timer
        </button>
      </form>
      {timeState === 0 && (
        <div id="time-box">
          <div class="box">
            {Math.floor((futureTime - currentTime) / (1000 * 60 * 60 * 24))}{" "}
            <br /> Days
          </div>
          <div class="box">
            {Math.floor(
              ((futureTime - currentTime) % (1000 * 60 * 60 * 24)) /
                (1000 * 60 * 60)
            )}{" "}
            <br />
            Hours
          </div>
          <div class="box">
            {Math.floor(
              ((futureTime - currentTime) % (1000 * 60 * 60)) / (1000 * 60)
            )}{" "}
            <br />
            Minutes
          </div>
          <div class="box">
            {Math.floor(((futureTime - currentTime) % (1000 * 60)) / 1000)}{" "}
            <br />
            Seconds
          </div>
        </div>
      )}
      {timeState === 1 && (
        <div>The Countdown is over! what's next on your adventure?</div>
      )}
      {timeState === 2 && <div>Selected time not more than 100</div>}
    </div>
  );
};

export default Index;
