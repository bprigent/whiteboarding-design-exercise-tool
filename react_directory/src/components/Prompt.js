import React from 'react';
import { Box, Typography } from '@mui/material';
import { useSelector } from "react-redux";

const Prompt = () => {
    const { prompt, status } = useSelector((state) => state.exercise);

    return (
        <Box
            sx={{
                padding: 4
            }}
        >
            <Typography variant="h4" component="h1">
                Your Exercise
            </Typography>

            {status === 'working' && (
                <Typography variant="body1">
                    Generating your custom exercise...
                </Typography>
            )}

            {status === 'success' && prompt && (
                <Typography variant="body1">
                    {prompt}
                </Typography>
            )}

            {status === 'error' && (
                <Typography variant="body1" color="error">
                    There was an error generating your exercise. Please try again.
                </Typography>
            )}
        </Box>
    );
};

export default Prompt;