import React from 'react';
import { Box, Typography } from '@mui/material';

const AIMessage = ({ text, status }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                marginBottom: '16px',
            }}
        >
            <Box
                sx={{
                    backgroundColor: '#e0e0e0',
                    color: '#000',
                    padding: '12px',
                    borderRadius: '12px',
                    maxWidth: '70%',
                }}
            >
                <Typography>{text}</Typography>
            </Box>
            <Typography variant="caption" sx={{ marginTop: '4px', color: '#888' }}>
                Status: {status}
            </Typography>
        </Box>
    );
};

export default AIMessage;
