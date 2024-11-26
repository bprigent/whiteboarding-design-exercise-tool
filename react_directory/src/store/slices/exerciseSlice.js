import { createSlice } from '@reduxjs/toolkit';

const exerciseSlice = createSlice({
  name: 'exercise', 
  initialState: {
    timer: '',
    prompt: '', 
    status: 'idle', 
  },
  reducers: {
    setTimer: (state, action) => {
      state.timer = action.payload; 
    },
    setPrompt: (state, action) => {
      state.prompt = action.payload; 
    },
    setStatus: (state, action) => {
      state.status = action.payload; 
    },
  },
});

// Export the reducer functions as actions so they can be used in components.
export const { setTimer, setPrompt, setStatus } = exerciseSlice.actions;

// Export the reducer so it can be added to the Redux store.
export default exerciseSlice.reducer;