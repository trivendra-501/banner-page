import React, { useState } from 'react';
import Banner from './Components/Banner/Banner';
import Dashboard from './Components/Dashboard/Dashboard';
import './App.css';

function App() {
  const [isVisible, setBannerVisibility] = useState(true);
  const [description, setBannerDescription] = useState('Welcome to our website!');
  const [timeLeft, setBannerTimer] = useState(30);
  const [link, setBannerLink] = useState('https://example.com');

  return (
    <div className="App">
      <div className="container">
        <Banner
          isVisible={isVisible}
          description={description}
          timeLeft={timeLeft}
          link={link}
        />
        <Dashboard
          setBannerVisibility={setBannerVisibility}
          setBannerDescription={setBannerDescription}
          setBannerTimer={setBannerTimer}
          setBannerLink={setBannerLink}
          isVisible={isVisible}
        />
      </div>
    </div>
  );
}

export default App;
