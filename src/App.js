import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react'; 

function App() {

  const [time, setTime] = useState(0);
  const [title, setTitle] = useState('blank');

  useEffect(() => {
    setTitle('Not Blank'); 
  });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {title}
        </p>
      </header>
    </div>
  );
}

export default App;
