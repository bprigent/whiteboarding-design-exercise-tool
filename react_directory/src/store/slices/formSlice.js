// Import `createSlice` from Redux Toolkit to easily create a slice
import { createSlice } from '@reduxjs/toolkit';

// A slice is a part of the Redux store that manages a specific feature or piece of state.
const formSlice = createSlice({
  name: 'form', // The name of this slice, used as a key in the Redux store
  initialState: {
    inputValue: '', // The input value entered by the user in the form.
    apiResponse: null, // The API response after the form is submitted.
  },
  reducers: {
    // A reducer function to update the `inputValue` in the state.
    setInputValue: (state, action) => {
      state.inputValue = action.payload; // Update the state with the new input value.
    },

    // A reducer function to update the `apiResponse` in the state.
    setApiResponse: (state, action) => {
      state.apiResponse = action.payload; // Update the state with the API response.
    },
  },
});

// Export the reducer functions as actions so they can be used in components.
export const { setInputValue, setApiResponse } = formSlice.actions;

// Export the reducer so it can be added to the Redux store.
export default formSlice.reducer;

