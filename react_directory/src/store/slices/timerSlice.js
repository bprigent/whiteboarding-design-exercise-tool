import { createSlice } from '@reduxjs/toolkit';

let timerInterval = null;

const timerSlice = createSlice({
    name: 'timer',
    initialState: {
        remainingTime: 0, // Remaining time in seconds
        timerStatus: 'paused', // paused | playing
    },
    reducers: {
        setRemainingTime: (state, action) => {
            state.remainingTime = action.payload;
        },
        playTimer: (state) => {
            state.timerStatus = 'playing';
        },
        pauseTimer: (state) => {
            state.timerStatus = 'paused';
        },
        decrementTime: (state) => {
            if (state.remainingTime > 0) {
                state.remainingTime -= 1;
            } else {
                state.timerStatus = 'paused';
                clearInterval(timerInterval);
            }
        }
    },
});

export const { setRemainingTime, playTimer, pauseTimer, decrementTime } = timerSlice.actions;

export const startTimer = () => (dispatch, getState) => {
  
    const { timer } = getState();
    if (timer.timerStatus === 'playing') return; // Prevent starting multiple timers

    dispatch(playTimer());
    timerInterval = setInterval(() => {
        dispatch(decrementTime());
    }, 1000);

};

export const stopTimer = () => (dispatch) => {
    dispatch(pauseTimer());
    clearInterval(timerInterval); // Clear interval properly
};

export default timerSlice.reducer;
