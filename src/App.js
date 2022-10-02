import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react'; 
import sound from './assets/klax_11.wav';


function App() {

  const fontSize = '1.4rem';

  const alarmGetMinutes = () => (new Date()).getMinutes();
  const alarmGetSeconds = () => (new Date()).getSeconds();
  
  const getMinutesNine = () => {
    const minutes = (new Date()).getMinutes();

    // Set the minutes time for the alarm clock. 
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
    document.title = 'Alarm Clock';
    const interval = setInterval(() => {
      setSeconds(seconds => seconds + 1);
      setCurrentTime(Date().toLocaleString());
      setCurrentTimeMinutes( alarmGetMinutes() );
      setCurrentTimeSeconds( alarmGetSeconds() );

      console.log('getMinutesNine()', getMinutesNine())

      // Check if alarm is on that time 
      if (
        // true
        currentTimeMinutes === getMinutesNine()
      ){
        console.log('alarm go');
        const audio = new Audio(sound);
        clearInterval(interval);
        setInterval( () => {audio.play()}, 7000);
      }

      console.log('current time minutes', currentTimeMinutes)

      console.log("button clicked?: ", buttonClicked)

      console.log('this will run every second');
    }, 1000); 
    return () => clearInterval(interval); 
  }, [buttonClicked, currentTimeMinutes]);

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
            style={{
              fontSize
            }}
          >
            Set alarm for {currentTimeHours}:{getMinutesNine()}
          </button>
        }
        { buttonClicked &&
          <>
            <div
              style={{
                fontSize
              }}
            >
              <div>
                Alarm set for: 
              </div>
              <div>
                {currentTimeHours}:{getMinutesNine()}
              </div>
            </div>
          </>
        }
      </header>
    </div>
  );
}

export default App;
