import React from 'react';
import { Box, Typography } from '@mui/material';
import { useSelector } from "react-redux";
import LoadingScreen from './LoadingPrompt';
import * as Icons from '@mui/icons-material'; // Import all icons for dynamic rendering



const ExerciseResult = () => {
    const { prompt, exerciseStatus } = useSelector((state) => state.exercise);
    
    const iconNameCheck = 'DoneAll';
    const IconComponentCheck = Icons[iconNameCheck] || Icons.HelpOutline;

    const iconNameTimer = 'HourglassTop';
    const IconComponentTimer = Icons[iconNameTimer] || Icons.HelpOutline;

    return (
        <Box sx={{
            padding: 4,
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            alignItems: 'center', // Centers children horizontally
            justifyContent: 'center',
        }}>
            {exerciseStatus === 'warming' && (
                <LoadingScreen
                    heading="Warming up the AI..."
                    sub="It should only take a few seconds."
                />
            )}

            {(exerciseStatus === 'working' || exerciseStatus === 'success') && (
                <Box sx={{
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                }}>
                    
                    {exerciseStatus === 'working' && (
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '4px',
                        }}>
                            <Typography variant="body2" color="#787878">Generating...</Typography>
                            <IconComponentTimer sx={{fontSize: 12, color: '#787878'}}/>
                        </Box>
                    )}
                    {exerciseStatus === 'success' && (
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '4px',
                        }}>
                            
                            <Typography variant="body2" color="#787878">Generated</Typography>
                            <IconComponentCheck sx={{fontSize: 12, color: '#787878'}}/>
                        </Box>
                    )}
                    
                    <Typography variant="body1" sx={{ fontFamily:'Gambarino', fontSize:'40px', textAlign:'center'}}>
                        "{prompt}"
                    </Typography>
                </Box>
            )}

            {exerciseStatus === 'error' && (
                <Box sx={{
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <Typography variant="body1" color="error">
                        There was an error generating your exercise. Please try again.
                    </Typography>
                </Box>
            )}

            {exerciseStatus === 'over' && (
                <Box sx={{
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <Typography variant="body1" color="#000000">
                        Congratulations. Take a break and do another one!
                    </Typography>
                </Box>
            )}
        </Box>
    );
};

export default ExerciseResult;