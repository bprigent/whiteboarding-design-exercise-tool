import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Typography, TextField, Button } from '@mui/material';
import AIMessage from './AIMessage';
import HumanMessage from './HumanMessage';
import Input from './Input';
import { addMessage, setHumanStatus, setAIStatus } from '../../store/slices/chatSlice';


const Chat = () => {
    const dispatch = useDispatch();
    const messages = useSelector((state) => state.chat.messages);
    const inputDisabled = useSelector((state) => state.chat.inputDisabled);

    const [input, setInput] = useState('');

    const handleSendMessage = async () => {
        if (!input.trim() || inputDisabled) return;

        // Dispatch user message
        dispatch(addMessage({role: 'user', text: input, status: 'Sent'}));
        setInput('');

        try {
            const response = await fetch('http://127.0.0.1:5000/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: input, context: messages }),
            });

            if (!response.ok) throw new Error('Failed to fetch AI response');

            const aiResponse = await response.text();

            // Dispatch AI response
            dispatch(addMessage({ role: 'ai', text: aiResponse, status: 'Sent' }));
        } catch (error) {
            dispatch(addMessage({ role: 'ai', text: 'Error fetching response.', status: 'Sent' }));
        } finally {
            dispatch(setHumanStatus('idle'));
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                padding: '24px',
            }}
        >
            <Box
                sx={{
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column', // Stacks messages from the bottom
                    overflowY: 'auto',
                }}
            >
                {messages.map((message, index) =>
                    message.role === 'user' ? (
                        <HumanMessage key={index} text={message.text} status={message.status} />
                    ) : (
                        <AIMessage key={index} text={message.text} status={message.status} />
                    )
                )}
                
            </Box>
            <Input
                value={input}
                onChange={setInput}
                onSend={handleSendMessage}
                disabled={inputDisabled}
            />
        </Box>
    );
};

export default Chat;