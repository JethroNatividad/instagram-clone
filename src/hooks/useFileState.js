import { useState } from 'react';

export default (initialValue) => {
  const [state, setState] = useState(initialValue);
  const handleChange = (evt) => {
    setState(evt.target.files[0]);
  };

  return [state, handleChange, setState];
};
