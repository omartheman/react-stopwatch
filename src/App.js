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
  

  const [buttonClicked, setButtonClicked] = useState(false); 

  console.log("yes")
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(seconds => seconds + 1);
      setCurrentTime(Date().toLocaleString());
      setCurrentTimeMinutes( alarmGetMinutes() );
      setCurrentTimeSeconds( alarmGetSeconds() );

      // Check if alarm is on that time 
      if (
        currentTimeMinutes === 22
      ){
        console.log('alarm go');
        const audio = new Audio('http://tastyspleen.net/~quake2/baseq2/sound/world/klax_11.wav');
        clearInterval(interval);
        audio.play();
      }

      console.log("button clicked?: ", buttonClicked)

      console.log('this will run every second');
    }, 1000); 
    return () => clearInterval(interval); 
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        { ! buttonClicked && 
          <button
            onClick={() => {
              setButtonClicked(true); 
              console.log("button clicked?: ", buttonClicked)
            }}
          >
            Set alarm for {currentTimeHours}:{getMinutesNine()}
          </button>
        }
        { buttonClicked &&
          <>
            <div>
              Alarm set for: 
            </div>
            <div>
              {currentTimeHours}:{getMinutesNine()}
            </div>
          </>
        }
      </header>
    </div>
  );
}

export default App;
