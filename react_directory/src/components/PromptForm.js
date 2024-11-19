import React, { useState } from 'react';
import './PromptForm.scss';

function PromptForm() {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted value:', inputValue);
    // Add logic to handle form submission here, like sending data to your backend.
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="text"
          className="form-input"
          placeholder="Enter your text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </div>
      <button type="submit" className="form-submit">
        Submit
      </button>
    </form>
  );
}

export default PromptForm;
