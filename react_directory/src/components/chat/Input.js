import React from 'react';
import { Box, TextField, Button } from '@mui/material';

const ChatInput = ({ value, onChange, onSend, disabled }) => {
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !disabled) {
            onSend(); // Send message on Enter key press
        }
    };

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
                onKeyPress={handleKeyPress}
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
