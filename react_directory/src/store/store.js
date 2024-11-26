import { configureStore } from '@reduxjs/toolkit';
import formReducer from './slices/formSlice'; 
import exerciseReducer from './slices/exerciseSlice';

const store = configureStore({
  reducer: {
    form: formReducer, 
    exercise: exerciseReducer,
  },
});

export default store;

