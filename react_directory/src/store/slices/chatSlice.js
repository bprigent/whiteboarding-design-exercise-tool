import { createSlice } from '@reduxjs/toolkit';

/*
This slice is here to gather the content of the conversation.
It stores the history of messages. Each message has an id, author, content, status.
It store the status of the converssation status so that we can prevent people from 
*/ 

const initialState = {
    messages: [], // Chat history [{id: '...', author: '...', content: '...', status: '...'}]
    conversationStatus: 'locked', // 'locked', 'opened'
};

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        addMessage(state, action) {
            state.messages.push(action.payload); // Add a new message
        },
        updateMessageContent(state, action) {
            const { messageId, token } = action.payload;
            const message = state.messages.find((msg) => msg.id === messageId);
            if (message) {
                console.log(`Updating message: ${messageId} with token: ${token}`); // Debug log
                message.content += token; 
            } else {
                console.warn(`Message with ID ${messageId} not found for token: ${token}`);
            }
        },
        updateMessageStatus(state, action) {
            const { messageId, newStatus } = action.payload;
            const message = state.messages.find((msg) => msg.id === messageId);
            if (message) {
                // Append the token to the message text
                message.status = newStatus; 
            }
        },
        setConversationStatus(state, action) {
            state.conversationStatus = action.payload; // Update conversation status
        },
    },
});

export const {
    addMessage,
    updateMessageContent,
    updateMessageStatus,
    setConversationStatus,
} = chatSlice.actions;

export default chatSlice.reducer;
