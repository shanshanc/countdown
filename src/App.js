import React, { useEffect, useState, useRef } from 'react';

import DisplayBox from './components/displayBox';
import DisplayToday from './components/displayToday';
import './App.css';

const DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000;
const HOUR_IN_MILLISECONDS = 60 * 60  * 1000;
const MINUTE_IN_MILLISECONDS = 60 * 1000;
const SECOND_IN_MILLISECONDS = 1000;

const INITIAL_STATE = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
}

function App() {
  // Default target date be the end of 2021 UTC
  const [targetDate, setTargetDate] = useState(new Date(2021, 11, 31));
  const [remainingTime, setRemainingTime] = useState(INITIAL_STATE);

  const getRamainingUnits = () => {
    const current = new Date();
    const difference = targetDate.getTime() - current.getTime();
    let timeLeft = INITIAL_STATE;

    if (difference > 0) {
      const days = Math.floor(difference / DAY_IN_MILLISECONDS);
      const hours = Math.floor((difference / HOUR_IN_MILLISECONDS) % 24);
      const minutes = Math.floor((difference / MINUTE_IN_MILLISECONDS) % 60);
      const seconds = Math.round((difference / SECOND_IN_MILLISECONDS) % 60);

      timeLeft = {
        days,
        hours,
        minutes,
        seconds,
      }
    }

    return timeLeft;
  }
  const updateTime = () => {
    const { days, hours, minutes, seconds } = getRamainingUnits();
    setRemainingTime({
      days,
      hours,
      minutes,
      seconds,
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      updateTime();
    }, 1000);
  
    return () => clearTimeout(timer);
  }, [remainingTime])


  return (
    <div className="App">
      <header className="App-header">
        <div className="countdown-title">Countdown</div>
        <div className="main-clock">
          <DisplayBox unitName='days' unitValue={remainingTime.days} />
          <DisplayBox unitName='hours' unitValue={remainingTime.hours} />
          <DisplayBox unitName='minutes' unitValue={remainingTime.minutes} />
          <DisplayBox unitName='seconds' unitValue={remainingTime.seconds} />
        </div>
        <footer>
          <p>Till {targetDate.getFullYear()}/{targetDate.getMonth()+1}/{targetDate.getDate()}</p>
          <DisplayToday />
        </footer>
      </header> 
    </div>
  );
}

export default App;
