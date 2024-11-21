import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setInputValue, setApiResponse, setStatus } from '../store/slices/formSlice';
import './PromptForm.scss';
import { generateResponse } from '../apiCalls/generate';

function PromptForm() {
  // Initialize the dispatch function to update the Redux store
  const dispatch = useDispatch();
  
  // Get input value and status from store
  const inputValue = useSelector((state) => state.form.inputValue);
  const status = useSelector((state) => state.form.status);

  // update the input value when user types
  const handleOnChange = (e) => {dispatch(setInputValue(e.target.value))}

  // Handle the form submit
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form from refreshing the page
    try {
      dispatch(setStatus('generating')); // Update status to "generating"
      dispatch(setApiResponse('')); // Clear previous response

      const response = await generateResponse(inputValue); // Call the API
      dispatch(setApiResponse(response)); // Update the API response
    } catch (error) {
      dispatch(setApiResponse('Error generating response.'));
    } finally {
      dispatch(setStatus('idle')); // Reset status to "idle"
    }
  };
  

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="text"
          className="form-input"
          placeholder="Enter your text"
          value={inputValue}
          onChange={handleOnChange}
        />
      </div>
      <button type="submit" className="form-submit">
        {status === 'generating' ? 'Generating...' : 'Submit'}
      </button>
    </form>
  );
}

export default PromptForm;
