import React, { useState, useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import './Banner.css';

function Banner({ isVisible, description, timeLeft, link }) {
  const [remainingTime, setRemainingTime] = useState(timeLeft);

  useEffect(() => {
    setRemainingTime(timeLeft);
  }, [timeLeft]);

  useEffect(() => {
    if (isVisible && remainingTime > 0) {
      const timer = setInterval(() => {
        setRemainingTime(prevTime => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isVisible, remainingTime]);

  return (
    isVisible && remainingTime > 0 && (
      <Box className="banner">
        <Box className="banner-timer">
          {`Time left: ${remainingTime} seconds`}
        </Box>
        <Box className="banner-content">
          <Typography variant="h5" component="p" className="banner-description">
            {description}
          </Typography>
          <Button variant="contained" href={link} target="_blank" rel="noopener noreferrer" className="banner-link">
            Click Here
          </Button>
        </Box>
      </Box>
    )
  );
}

export default Banner;
