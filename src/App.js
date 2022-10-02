import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react'; 

function App() {

  const alarmGetMinutes = () => (new Date()).getMinutes();
  const alarmGetSeconds = () => (new Date()).getSeconds();
  
  const getMinutesNine = () => {
    const minutes = (new Date()).getMinutes();
    const minutesNine = Math.floor(minutes/10) * 10 + 9;
    return minutesNine;
  }


  const [time, setTime] = useState(0);
  
  const [currentTime, setCurrentTime] = useState(Date().toLocaleString());
  
  const [currentTimeMinutes, setCurrentTimeMinutes] = useState( alarmGetMinutes() );
  const [currentTimeMinutesNine, setCurrentTimeMinutesNine] = useState( alarmGetMinutes() );

  const [currentTimeHours, setCurrentTimeHours] = useState((new Date()).getHours());
  const [currentTimeSeconds, setCurrentTimeSeconds] = useState(alarmGetSeconds());

  const [title, setTitle] = useState('blank');
  const [seconds, setSeconds] = useState(0);
  
  console.log("yes")
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(seconds => seconds + 1);
      setCurrentTime(Date().toLocaleString());
      setCurrentTimeMinutes( alarmGetMinutes() );
      setCurrentTimeSeconds( alarmGetSeconds() );

      // Check if alarm is on that time 
      if (
        currentTimeHours === 18
        && 
        currentTimeMinutes === 55
        
        ){
        console.log('alarm go');
      }

      console.log('this will run every second');
    }, 1000); 
    return () => clearInterval(interval); 
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {currentTime}
        </p>
        <p>
          Current hours: 
        </p>
        <p>
          {currentTimeHours}
        </p>
        <p>
          Current minutes: 
        </p>
        <p>
          {currentTimeMinutes}
        </p>
        <p>
          Current seconds:
        </p>
        <p>
          {currentTimeSeconds}
        </p>
        <p>
          Minutes Nine: 
        </p>
        <p>
          {getMinutesNine()}
        </p>
        <button>
          <div>
            Set alarm for: 
          </div>
          <div>
            {currentTimeHours}:{getMinutesNine()}
          </div>
        </button>
      </header>
    </div>
  );
}

export default App;
