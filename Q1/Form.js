
import React, { useState } from 'react';

const Form = ({ onSubmit }) => {
  const [numberId, setNumberId] = useState('');

  const handleChange = (event) => {
    setNumberId(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(numberId);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Number ID:
        <input
          type="text"
          value={numberId}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;