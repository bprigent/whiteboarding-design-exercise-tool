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
    setHumanStatus,
    setAIStatus,
    setError,
    clearError,
} = chatSlice.actions;

export default chatSlice.reducer;
