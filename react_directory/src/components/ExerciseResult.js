import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useSelector, useDispatch } from "react-redux";
import { setPrompt, setStatus } from "../store/slices/exerciseSlice";
import { useNavigate } from 'react-router-dom';

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
        <Box sx={{padding: 4}}>
            <Typography variant="h4" component="h1">
                Your Exercise
            </Typography>

            {status === 'working' && (
                <Box>
                    <Typography variant="body1">
                        {prompt || "Generating your custom exercise..."} {/* Show partial prompt */}
                    </Typography>
                    <Button variant="outlined" color="secondary" onClick={handleCancel} sx={{ mt: 2 }}>
                        Cancel
                    </Button>
                </Box>
            )}

            {status === 'success' && prompt && (
                <Box>
                    <Typography variant="body1">
                        {prompt}
                    </Typography>
                    <Button variant="outlined" color="secondary" onClick={handleCancel} sx={{ mt: 2 }}>
                        Cancel
                    </Button>
                </Box>
            )}

            {status === 'error' && (
                <Box>
                    <Typography variant="body1" color="error">
                        There was an error generating your exercise. Please try again.
                    </Typography>
                    <Button variant="outlined" color="secondary" onClick={handleCancel} sx={{ mt: 2 }}>
                        Cancel
                    </Button>
                </Box>
            )}
        </Box>
    );
};

export default ExerciseResult;