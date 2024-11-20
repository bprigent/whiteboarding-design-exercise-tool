import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setInputValue, setApiResponse } from '../store/slices/formSlice';
import './PromptForm.scss';

function PromptForm() {
  // Initialize the dispatch function to update the Redux store
  const dispatch = useDispatch();
  
  // Get input value from store
  const inputValue = useSelector((state) => state.form.inputValue);
  
  // update the input value when user types
  const handleOnChange = (e) => {dispatch(setInputValue(e.target.value))}

  // Handle the form submit
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent form from refreshing the page
    
    // Dispatch the API response to the Redux store
    const apiResponse = 'some value from backend'
    dispatch(setApiResponse(apiResponse));
    console.log('Submitted value:', inputValue);
    dispatch(setApiResponse(apiResponse));
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
        Submit
      </button>
    </form>
  );
}

export default PromptForm;
