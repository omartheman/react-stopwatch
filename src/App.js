import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react'; 
import sound from './assets/alarm-beep-beep.mp3';


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
  
  const [isRunning, setIsRunning] = useState(true); 

  const [buttonClicked, setButtonClicked] = useState(false); 

  console.log("yes")
  console.log("isRunning: ", isRunning)


  const audio = new Audio(sound);
  
  function playAlarmAndAddAutoplay(){
    audio.autoplay = true; 
    audio.play();
  }

  // Play sound again once it has ended.
  audio.addEventListener('ended', function () {
    audio.currentTime = 0;
    playAlarmAndAddAutoplay();
  }, false);

  useEffect(() => {
    document.title = 'Alarm Clock';
    if (isRunning){

      const interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
        setCurrentTime(Date().toLocaleString());
        setCurrentTimeMinutes( alarmGetMinutes() );
        setCurrentTimeSeconds( alarmGetSeconds() );
  
        console.log('getMinutesNine()', getMinutesNine())
        console.log('seconds: ', seconds)
  
        // Check if alarm is on that time 
        if (
          currentTimeMinutes === 54
          // true 
          // seconds > 5
          // currentTimeMinutes === getMinutesNine()
          && buttonClicked
        ){
          console.log('audio autoplay', audio.autoplay)
          console.log('alarm go');
          console.log('Playing alarm.')
          playAlarmAndAddAutoplay();
          setIsRunning(false); 
        }

        console.log('current time minutes', currentTimeMinutes)
  
        console.log("button clicked?: ", buttonClicked)
  
        console.log('this will run every second');
      }, 1000); 

      return () => clearInterval(interval); 
    }
  }, [buttonClicked, currentTimeMinutes, audio, isRunning]);

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
