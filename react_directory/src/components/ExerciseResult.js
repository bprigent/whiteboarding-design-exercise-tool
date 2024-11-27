import React from 'react';
import { Box, Typography } from '@mui/material';
import { useSelector, useDispatch } from "react-redux";
import { setPrompt, setStatus } from "../store/slices/exerciseSlice";
import { useNavigate } from 'react-router-dom';
import LoadingScreen from './LoadingPrompt';
import { Description, Timer } from '@mui/icons-material';
import { OrangeButton } from './Buttons';


const ExerciseResult = () => {
    const { prompt, status } = useSelector((state) => state.exercise);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleCancel = () => {
        dispatch(setPrompt(''));
        dispatch(setStatus('idle'));
        navigate('/create-new');
    };

    return (
        <Box sx={{
            padding: 4,
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            alignItems: 'center', // Centers children horizontally
            justifyContent: 'center',
        }}>
            <Box sx={{
                height:'104px'
            }}/>

            {status === 'warming' && (
                <LoadingScreen
                    heading="Generating your prompt..."
                    tips={[
                        {
                        icon: <Description sx={{ color: '#9e9e9e' }} />, // Icon styling
                        text: "Don't forget to get your template ready.",
                        },
                        {
                        icon: <Timer sx={{ color: '#9e9e9e' }} />,
                        text: 'Your 60 minute timer will start after.',
                        },
                    ]}
                />
            )}

            {(status === 'working' || status === 'success') && (
                <Box sx={{
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <Typography variant="body1" sx={{ fontFamily:'Gambarino', fontSize:'40px', textAlign:'center'}}>
                        "{prompt}"
                    </Typography>
                </Box>
            )}

            {status === 'error' && (
                <Box>
                    <Typography variant="body1" color="error">
                        There was an error generating your exercise. Please try again.
                    </Typography>
                </Box>
            )}

            <Box sx={{paddingY: 4}}>
                <OrangeButton onClick={handleCancel}>
                    I am done with this exercise
                </OrangeButton>
            </Box>
        </Box>
    );
};

export default ExerciseResult;