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

  // Display minutes nine. Show '09' instead of '9' if it's single integer. 
  const displayMinutesNine = () => {
    return getMinutesNine() === 9 ? '09' : getMinutesNine();
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

  const audio = new Audio(sound);
  audio.addEventListener('ended', function () {
    audio.currentTime = 0;
    audio.play();
  }, false);

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
        true && buttonClicked
        // currentTimeMinutes === getMinutesNine()
      ){
        console.log('alarm go');
        clearInterval(interval);
          console.log('Playing alarm.')
          audio.play()
      }

      console.log('current time minutes', currentTimeMinutes)

      console.log("button clicked?: ", buttonClicked)

      console.log('this will run every second');
    }, 1000); 
    return () => clearInterval(interval); 
  }, [buttonClicked, currentTimeMinutes]);

  const maxSize = '200px'; 

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" style={{maxWidth: maxSize, maxHeight: maxSize}}/>
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
            Set alarm for {currentTimeHours}:{displayMinutesNine()}
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
                {currentTimeHours}:{displayMinutesNine()}
              </div>
            </div>
          </>
        }
      </header>
    </div>
  );
}

export default App;
