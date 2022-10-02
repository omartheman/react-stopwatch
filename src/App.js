import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react'; 

function App() {

  const alarmGetMinutes = () => (new Date()).getMinutes();
  const alarmGetSeconds = () => (new Date()).getSeconds();

  const [time, setTime] = useState(0);
  
  const [currentTime, setCurrentTime] = useState(Date().toLocaleString());
  
  const [currentTimeMinutes, setCurrentTimeMinutes] = useState( alarmGetMinutes() );

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
        <button>
          <div>
            Set alarm for: 
          </div>
          <div>
            6:09pm
          </div>
        </button>
      </header>
    </div>
  );
}

export default App;
