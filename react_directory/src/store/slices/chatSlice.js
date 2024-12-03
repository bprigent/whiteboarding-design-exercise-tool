import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    messages: [], // Chat history
    humanStatus: 'idle', // 'idle', 'typing', 'sending', 'error'
    aiStatus: 'idle', // 'idle', 'responding', 'error'
    error: null, // Error messages
};

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        addMessage(state, action) {
            state.messages.push(action.payload); // Add a new message
        },
        updateMessage(state, action) {
            const { messageId, token } = action.payload;
            const message = state.messages.find((msg) => msg.id === messageId);
            if (message) {
                message.text += token; // Append the token to the message text
            }
        },
        setHumanStatus(state, action) {
            state.humanStatus = action.payload; // Update human status
        },
        setAIStatus(state, action) {
            state.aiStatus = action.payload; // Update AI status
        },
        setError(state, action) {
            state.error = action.payload; // Set error message
        },
        clearError(state) {
            state.error = null; // Clear error messages
        },
    },
});

export const {
    addMessage,
    updateMessage,
    setHumanStatus,
    setAIStatus,
    setError,
    clearError,
} = chatSlice.actions;

export default chatSlice.reducer;
