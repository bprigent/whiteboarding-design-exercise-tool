import React from 'react';
import { Box, TextField } from '@mui/material';
import { IconButton } from '../Buttons';

const ChatInput = ({ value, onChange, onSend, conversationStatus }) => {
    
    let disabled = false; // Define 'disabled' variable with a default value

    if (conversationStatus === 'locked') {
        disabled = true;
    }

    return (
        <Box
            sx={{
                display: 'flex',
                gap: 1,
                marginTop: '20px',
            }}
        >
            <TextField
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Ask questions about the prompt"
                disabled={disabled}
                sx={{
                    '& .MuiOutlinedInput-root': {
                        padding: 0,
                        backgroundColor: '#ffffff',
                        border: '1px solid #E5E5E5',
                        borderRadius: '20px',
                        '&:hover': {
                            outline: '2px solid #1976d2',
                        },
                        '&.Mui-focused': {
                            outline: '2px solid #1976d2',
                        },
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                        border: 'none', // Removes the default outline
                    },
                    flexGrow: 1,
                }}
            />
            <IconButton onClick={onSend} disabled={disabled} icon='Send'/>
        </Box>
    );
};

export default ChatInput;
