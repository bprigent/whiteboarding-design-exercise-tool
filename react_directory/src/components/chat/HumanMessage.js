import React from 'react';
import { Box, Typography } from '@mui/material';

const HumanMessage = ({ text, status }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                marginBottom: '16px',
            }}
        >
            <Box
                sx={{
                    backgroundColor: '#1976d2',
                    color: '#fff',
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

export default HumanMessage;
