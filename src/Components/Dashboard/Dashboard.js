import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaAlignLeft, FaClock, FaLink, FaEye, FaEyeSlash, FaSyncAlt } from 'react-icons/fa';
import { Typography, TextField, Button } from '@mui/material';
import './Dashboard.css';

function Dashboard({ setBannerVisibility, setBannerDescription, setBannerTimer, setBannerLink, isVisible }) {
  const [description, setDescription] = useState('');
  const [timeLeft, setTimeLeft] = useState(10);
  const [link, setLink] = useState('');
  const [originalDescription, setOriginalDescription] = useState('');
  const [originalTimeLeft, setOriginalTimeLeft] = useState(10);
  const [originalLink, setOriginalLink] = useState('');

  useEffect(() => {
    axios.get('https://trivendra.pythonanywhere.com/?id=1',)
      .then(response => {
        const { description, timer, link } = response.data;
        setDescription(description);
        setTimeLeft(timer);
        setLink(link);
        setOriginalDescription(description);
        setOriginalTimeLeft(timer);
        setOriginalLink(link);
        setBannerDescription(description);
        setBannerTimer(timer);
        setBannerLink(link);
      })
      .catch(error => console.error('Error fetching banner data:', error));
  }, [setBannerDescription, setBannerTimer, setBannerLink]);

  const handleUpdateBanner = () => {
    const updatedBanner = { description, timer: timeLeft, link };
    axios.put('https://trivendra.pythonanywhere.com/update_banner/', updatedBanner)
      .then(() => {
        setBannerDescription(description);
        setBannerTimer(timeLeft);
        setBannerLink(link);
        setBannerVisibility(true); 
        setOriginalDescription(description); 
        setOriginalTimeLeft(timeLeft);
        setOriginalLink(link);
      })
      .catch(error => console.error('Error updating banner data:', error));
  };

  const handleToggleBannerVisibility = () => {
    setBannerVisibility(prevVisibility => !prevVisibility);
  };

  const isUpdateButtonEnabled = 
    description !== originalDescription ||
    timeLeft !== originalTimeLeft ||
    link !== originalLink;

  return (
    <div className="dashboard">
      <Typography variant="h2" className="dashboard-title">Dashboard</Typography>
      <div className="dashboard-form-group">
        <label><FaAlignLeft /> Description:</label>
        <TextField
          value={description}
          onChange={e => setDescription(e.target.value)}
          multiline
          rows={5}
          variant="outlined"
          className="dashboard-textarea"
        />
      </div>
      <div className="dashboard-form-group">
        <label><FaClock /> Timer (seconds):</label>
        <TextField
          type="number"
          value={timeLeft}
          onChange={e => setTimeLeft(Number(e.target.value))}
          variant="outlined"
          className="dashboard-input"
        />
      </div>
      <div className="dashboard-form-group">
        <label><FaLink /> Link:</label>
        <TextField
          type="text"
          value={link}
          onChange={e => setLink(e.target.value)}
          variant="outlined"
          className="dashboard-input"
        />
      </div>
      <div className="dashboard-buttons">
        <Button
          onClick={handleUpdateBanner}
          variant="contained"
          color="primary"
          disabled={!isUpdateButtonEnabled}
          startIcon={<FaSyncAlt />}
        >
          Update Banner
        </Button>
        <Button 
          onClick={handleToggleBannerVisibility}
          variant="contained"
          color={isVisible ? "error" : "success"}
          startIcon={isVisible ? <FaEyeSlash /> : <FaEye />}
        >
          {isVisible ? 'Hide Banner' : 'Show Banner'}
        </Button>
      </div>
    </div>
  );
}

export default Dashboard;
