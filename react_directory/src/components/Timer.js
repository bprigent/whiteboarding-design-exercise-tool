import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { startTimer, stopTimer } from '../store/slices/timerSlice';
import { Box, Button, Typography } from '@mui/material';

const Timer = () => {
  const dispatch = useDispatch();
  const { remainingTime, timerStatus } = useSelector((state) => state.timer);
  const { exerciseStatus } = useSelector((state) => state.exercise);

  useEffect(() => {
    // Start the timer when exerciseStatus becomes 'success'
    if (exerciseStatus === 'success') {
      dispatch(startTimer());
    }
  }, [exerciseStatus, dispatch]);

  const formatTime = (seconds) => {
    if (!seconds) return '0:00'; // Fallback for undefined or 0 values
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Box sx={{ textAlign: 'center', marginTop: 2 }}>
      <Typography variant="h4">
        Time Remaining: {formatTime(remainingTime)}
      </Typography>

      {/* Only show play/pause buttons if exerciseStatus is 'success' */}
      {exerciseStatus === 'success' && (
        <Box sx={{ marginTop: 2 }}>
          {timerStatus === 'paused' ? (
            <Button variant="contained" color="primary" onClick={() => dispatch(startTimer())}>
              Play
            </Button>
          ) : (
            <Button variant="contained" color="secondary" onClick={() => dispatch(stopTimer())}>
              Pause
            </Button>
          )}
        </Box>
      )}
    </Box>
  );
};

export default Timer;
