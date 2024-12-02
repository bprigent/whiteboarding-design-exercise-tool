import { configureStore } from '@reduxjs/toolkit';
import formReducer from './slices/formSlice'; 
import exerciseReducer from './slices/exerciseSlice';
import timerReducer from './slices/timerSlice';
import chatReducer from './slices/chatSlice';

const store = configureStore({
  reducer: {
    form: formReducer, 
    exercise: exerciseReducer,
    timer: timerReducer,
    chat: chatReducer,
  },
});

export default store;

