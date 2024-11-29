import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { startTimer, stopTimer } from '../store/slices/timerSlice';
import { Box, Typography } from '@mui/material';
import { WhiteButton } from './Buttons';


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


  const formatDigits = (time) => {
    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, '0');
    const seconds = (time % 60).toString().padStart(2, '0');
    return [...minutes, ':', ...seconds];
  };



  return (
    <Box
      sx={{
        padding: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
      }}
    >

      <Box sx={{
        height:'104px'
      }}/>

      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          alignItems: 'center',
          color: exerciseStatus === 'success' ? '#000' : '#E5E5E5',
          justifyContent: 'center',
          gap: 1.5,
          fontSize: '4rem',
          fontWeight: '700',
        }}
      >

        {formatDigits(remainingTime).map((digit, index) => (
          digit === ':' ? (
            <Box
              key={index}
              sx={{
                fontSize: '4rem',
                fontWeight: '700',
                color: '#E5E5E5', 
                paddingX: 1, 
              }}
            >
              {digit}
            </Box>
            ) : (
            <Box
              key={index}
              sx={{
                padding: '16px',
                borderRadius: '8px',
                backgroundColor: '#f9f9f9',
                border: '1px solid #E5E5E5',
                width: '88px',
                textAlign: 'center',
              }}
            >
              {digit}
            </Box> )
        ))}
      </Box>

      {/* Play/Pause Button */}
      <Box sx={{
        paddingY: 4,
        minHeight:'104px',
        display:'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {exerciseStatus === 'success' ? (
          <Box>
            {timerStatus === 'paused' ? (
              <WhiteButton icon="PlayCircleOutline" onClick={() => dispatch(startTimer())}>Play</WhiteButton>
            ) : (
              <WhiteButton icon="PauseCircleOutline" onClick={() => dispatch(stopTimer())}>Pause</WhiteButton>
            )}
          </Box>        
        ):(<Typography variant="body2" sx={{color: '#787878'}}>Timer will start once the exercise is ready.</Typography>)}
      </Box>
    </Box>
  );
};

export default Timer;
