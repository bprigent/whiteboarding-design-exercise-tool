import { createSlice } from '@reduxjs/toolkit';
import { setStatus } from './exerciseSlice'; 

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
        const { remainingTime } = getState().timer;

        if (remainingTime > 0) {
            dispatch(decrementTime());
        } else {
            dispatch(pauseTimer());
            dispatch(setStatus('over')); // Notify exercise that the timer is over
            clearInterval(timerInterval);
        }
    }, 1000);
};


// Clear interval properly
export const stopTimer = () => (dispatch) => {
    dispatch(pauseTimer());
    clearInterval(timerInterval); 
};


export default timerSlice.reducer;
