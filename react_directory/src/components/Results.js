import React from 'react';
import { useSelector } from 'react-redux';

function Result() {
    // get the AI answer from the store
    const apiResponse = useSelector((state) => state.form.apiResponse);
    // if the ai answer is null, show default empty message
    if (!apiResponse) return <p>No response yet.</p>;
    // Return the component when there are new content
    return (
        <div>
            <h2>AI response:</h2>
            <pre>{apiResponse}</pre>
        </div>
    );
}

export default Result;