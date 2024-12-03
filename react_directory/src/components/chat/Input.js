import React from 'react';
import { Box, TextField, Button } from '@mui/material';

const ChatInput = ({ value, onChange, onSend, conversationStatus }) => {
    
    let disabled = false; // Define 'disabled' variable with a default value

    if (conversationStatus === 'locked') {
        disabled = true;
    }

    return (
        <Box
            sx={{
                display: 'flex',
                marginTop: '16px',
            }}
        >
            <TextField
                fullWidth
                variant="outlined"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Ask questions about the prompt"
                disabled={disabled}
            />
            <Button
                variant="contained"
                onClick={onSend}
                disabled={disabled}
                sx={{ marginLeft: '8px' }}
            >
                Send
            </Button>
        </Box>
    );
};

export default ChatInput;
