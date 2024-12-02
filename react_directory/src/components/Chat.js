import { Box, Typography } from '@mui/material';
import React from 'react';

const Chat = () => {
    const hello = 'hello'
    return (
        <Box 
            sx={{
                padding:'24px',
            }}
        >
            <Typography>
                {hello}
            </Typography>
        </Box>
    );
};

export default Chat;