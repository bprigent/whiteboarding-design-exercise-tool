import { createSlice } from '@reduxjs/toolkit';

const exerciseSlice = createSlice({
  name: 'exercise', 
  initialState: {
    prompt: '', 
    exerciseStatus: 'idle', // idle, warming, working, success, error, over
  },
  reducers: {
    setPrompt: (state, action) => {
      state.prompt = action.payload; 
    },
    setStatus: (state, action) => {
      state.exerciseStatus = action.payload; 
    },
  },
});

// Export the reducer functions as actions so they can be used in components.
export const { setPrompt, setStatus } = exerciseSlice.actions;

// Export the reducer so it can be added to the Redux store.
export default exerciseSlice.reducer;