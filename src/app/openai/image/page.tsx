"use client"

import { useState } from 'react';

function YourComponent() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState(null);

  const handleChange = (event) => {
    setPrompt(event.target.value);
  };

  const handleClick = async () => {
    try {
      const response = await fetch('/api/openai/images', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (response.ok) {
        const data = await response.json();
        setResponse(data);
      } else {
        // Handle the error response here
        console.error('API request failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter your prompt"
        value={prompt}
        onChange={handleChange}
      />
      <button onClick={handleClick}>Make POST Request</button>
      {response && (
        <div>
          <h2>API Response:</h2>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default YourComponent;
