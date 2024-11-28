import { configureStore } from '@reduxjs/toolkit';
import formReducer from './slices/formSlice'; 
import exerciseReducer from './slices/exerciseSlice';
import timerReducer from './slices/timerSlice';

const store = configureStore({
  reducer: {
    form: formReducer, 
    exercise: exerciseReducer,
    timer: timerReducer,
  },
});

export default store;

