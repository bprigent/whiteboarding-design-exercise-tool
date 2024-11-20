import { configureStore } from '@reduxjs/toolkit';
import formReducer from './slices/formSlice'; // We'll create this next

const store = configureStore({
  reducer: {
    form: formReducer, // Add reducers here
  },
});

export default store;

