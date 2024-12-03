import React from 'react';
import { Box, Typography } from '@mui/material';
import { useSelector, useDispatch } from "react-redux";
import { setPrompt, setStatus } from "../store/slices/exerciseSlice";
import { useNavigate } from 'react-router-dom';
import LoadingScreen from './LoadingPrompt';
import { OrangeButton } from './Buttons';


const ExerciseResult = () => {
    const { prompt, exerciseStatus } = useSelector((state) => state.exercise);
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

            {exerciseStatus === 'warming' && (
                <LoadingScreen
                    heading="Generating your prompt..."
                    sub="Don't forget to get your template ready."
                />
            )}

            {(exerciseStatus === 'working' || exerciseStatus === 'success') && (
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

            <Box sx={{
                paddingY: 4,
                minHeight:'104px',
                display:'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <OrangeButton onClick={handleCancel}>
                    I am done with this exercise
                </OrangeButton>
            </Box>
        </Box>
    );
};

export default ExerciseResult;