import React from 'react';

import DisplayBox from './components/displayBox';
import DisplayToday from './components/displayToday';
import TargetDate from './components/TargetDate';
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

const TODAY = new Date();
const DEFAULT_DATE = new Date(TODAY.setDate(TODAY.getDate() + 20));
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      targetDate: DEFAULT_DATE,
      remainingTime: INITIAL_STATE,
    };
    this.timer = 0;
    this.handleTargetDateChange = this.handleTargetDateChange.bind(this);
  }

  getRamainingUnits = () => {
    const { targetDate } = this.state;
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

  updateTime = () => {
    const { days, hours, minutes, seconds } = this.getRamainingUnits();
    this.setState({
      remainingTime: {
        days,
        hours,
        minutes,
        seconds,
      }
    });
  };

  handleTargetDateChange(date) {
    this.setState({
      targetDate: date
    });
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.updateTime();
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
    this.timer = 0;
  }

  render() {
    const { targetDate, remainingTime } = this.state;
   
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="countdown-title">Countdown</h1>
          <div className="main-clock">
            <DisplayBox unitName='days' unitValue={remainingTime.days} />
            <DisplayBox unitName='hours' unitValue={remainingTime.hours} />
            <DisplayBox unitName='minutes' unitValue={remainingTime.minutes} />
            <DisplayBox unitName='seconds' unitValue={remainingTime.seconds} />
          </div>
          <footer>
            <TargetDate
              targetDate={targetDate}
              handleTargetDateChange={this.handleTargetDateChange}
            />
            <DisplayToday />
          </footer>
        </header> 
      </div>
    );
  }
}

export default App;
