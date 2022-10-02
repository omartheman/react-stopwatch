import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react'; 

function App() {

  const [time, setTime] = useState(0);
  const [currentTime, setCurrentTime] = useState(Date().toLocaleString());
  const [title, setTitle] = useState('blank');
  const [seconds, setSeconds] = useState(0);
  
  console.log("yes")
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(seconds => seconds + 1);
      setCurrentTime(Date().toLocaleString());

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
          {seconds}
        </p>
      </header>
    </div>
  );
}

export default App;
