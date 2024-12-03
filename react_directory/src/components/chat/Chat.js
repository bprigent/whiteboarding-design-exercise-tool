import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box } from '@mui/material';
import AIMessage from './AIMessage';
import HumanMessage from './HumanMessage';
import Input from './Input';
import { addMessage, setHumanStatus } from '../../store/slices/chatSlice';
import { sendMessage } from '../../apiCalls/sendMessage';


const Chat = () => {
    const dispatch = useDispatch();
    const messages = useSelector((state) => state.chat.messages);
    const inputDisabled = useSelector((state) => state.chat.inputDisabled);

    const [input, setInput] = useState('');

    const handleSendMessage = async () => {
        if (!input.trim() || inputDisabled) return;

        // Dispatch user message
        dispatch(
            addMessage({ id: Date.now(), role: "user", text: input, status: "Sent" })
        );
        setInput("");

        try {
            // Call the API utility function with dispatch
            await sendMessage(dispatch, input, messages);
        } catch (error) {
            dispatch(
                addMessage({
                    id: Date.now(),
                    role: "ai",
                    text: "Error fetching response.",
                    status: "Error",
                })
            );
        } finally {
            dispatch(setHumanStatus("idle"));
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
                    flexDirection: 'column',
                    justifyContent: 'flex-end', // Aligns messages at the bottom
                    overflowY: 'auto', // Enables scrolling when overflowing
                }}
            >
                {/* Add a spacer to push content down */}
                <Box sx={{ marginTop: 'auto' }} />
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