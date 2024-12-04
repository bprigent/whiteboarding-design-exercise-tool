import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { startTimer, stopTimer } from '../store/slices/timerSlice';
import { Box, Typography } from '@mui/material';
import { IconButtonWhite } from './Buttons';
import * as Icons from '@mui/icons-material'; // Import all icons for dynamic rendering




const TimerMini = () => {
  
    const dispatch = useDispatch();
    const { remainingTime, timerStatus } = useSelector((state) => state.timer);
    const { exerciseStatus } = useSelector((state) => state.exercise);

    const iconName = 'Square';
    const IconComponent = Icons[iconName] || Icons.HelpOutline;

    // Start the timer when exerciseStatus becomes 'success'
    useEffect(() => {
        if (exerciseStatus === 'success') {
            dispatch(startTimer());
        }
    }, [exerciseStatus, dispatch]);



    const handleStart = () => {
        console.log("Dispatching startTimer");
        dispatch(startTimer());
    };
  
    const handleStop = () => {
        console.log("Dispatching stopTimer");
        dispatch(stopTimer());
    };

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
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
        {(exerciseStatus === 'over') && (
            <Typography variant="body2" sx={{color: '#787878'}}>
                Time's up!
            </Typography>
        )}

        {(exerciseStatus === 'warming' || exerciseStatus === 'working' || exerciseStatus === 'success') && (
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingLeft: '4px',
                    backgroundColor: '#f9f9f9',
                    border: '1px solid #E5E5E5',
                    borderRadius: '12px',
                }}
            >
                {(exerciseStatus === 'success') && (
                    <Box>
                        {(timerStatus === 'paused') && (
                            <IconButtonWhite onClick={handleStart} icon='PlayCircle'/>
                        )} 
                        {(timerStatus === 'playing') && (
                            <IconButtonWhite onClick={handleStop} icon='PauseCircle'/>
                        )}
                       
                    </Box>   
                )}   
                {(exerciseStatus === 'warming' || exerciseStatus === 'working') && (
                    <IconComponent 
                        sx={{
                            fontSize: 16, 
                            color: '#787878',
                            minWidth: '32px', 
                            minHeight: '32px',
                            width: '32px',
                            height: '32px',
                            padding: '6px',
                        }}
                    />
                )}   
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '3px',
                        fontSize: '18px',
                        fontWeight: '700',
                        height: '44px',
                        width: '80px',
                        color: (exerciseStatus === 'success' & timerStatus === 'playing') ? '#000000' : '#787878',
                    }}
                >
                    {formatDigits(remainingTime).map((digit, index) => (
                        <Box
                            key={index}
                        >
                            {digit}
                        </Box> 
                
                    ))}
                </Box>
            </Box>
        )}
    
    </Box>
  );
};

export default TimerMini;
