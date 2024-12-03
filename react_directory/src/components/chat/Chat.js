import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box } from '@mui/material';
import AIMessage from './AIMessage';
import HumanMessage from './HumanMessage';
import Input from './Input';
import { addMessage, updateMessageStatus, setConversationStatus } from '../../store/slices/chatSlice';
import { sendMessageToAPI } from '../../apiCalls/sendMessageToAPI';


/* 
The goal of this component is to manage the conversations.
*/

const Chat = () => {
    const dispatch = useDispatch();
    const messageHistory = useSelector((state) => state.chat.messages);
    const exercise = useSelector((state) => state.exercise.prompt)
    const conversationStatus = useSelector((state) => state.chat.conversationStatus);

    const [input, setInput] = useState('');

    const handleSendMessage = async () => {
        // create new message object
        const newMessageId = Date.now() + "-user";
        const newMessage = { id: newMessageId, author: "user", content: input, status: "Sending"}
        // Send message to slice
        dispatch(addMessage(newMessage));

        // clear content of the input box, disable the input
        setInput("");
        dispatch(setConversationStatus('locked'))

        // update message status to 'sent'
        dispatch(updateMessageStatus({messageId:newMessageId, newStatus:'Sent'}))

        try {
            // Call the API utility function with dispatch
            await sendMessageToAPI({dispatch, userMessage: input, messageHistory: messageHistory, exercise: exercise});

        } catch (error) {
            // create an message answer with the error
            const newErrorMessageId = Date.now() + "-ai";
            const errorMessage = {id: newErrorMessageId, author: "ai", content: "Sorry, my server is not working properly.", status: "Error"}
            dispatch(addMessage(errorMessage));
            // re-open the conversation
            dispatch(setConversationStatus('opened'))
        } finally {
            // re-open the conversation
            dispatch(setConversationStatus('opened'))
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
                {messageHistory.map((message, index) =>
                    message.author === 'user' ? (
                        <HumanMessage key={index} text={message.content} status={message.status} />
                    ) : (
                        <AIMessage key={index} text={message.content} status={message.status} />
                    )
                )}
                
            </Box>
            <Input
                value={input}
                onChange={setInput}
                onSend={handleSendMessage}
                conversationStatus={conversationStatus}
            />
        </Box>
    );
};

export default Chat;