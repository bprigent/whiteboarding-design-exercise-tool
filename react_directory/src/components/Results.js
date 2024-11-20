import React from 'react';
import { useSelector } from 'react-redux';

function Result() {
  const apiResponse = useSelector((state) => state.form.apiResponse);

  if (!apiResponse) return <p>No response yet.</p>;

  return (
    <div>
      <h2>API Response:</h2>
      <pre>{JSON.stringify(apiResponse, null, 2)}</pre>
    </div>
  );
}

export default Result;