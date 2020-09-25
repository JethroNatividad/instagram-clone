import { useState } from 'react';

export default (initialValue) => {
  const [state, setState] = useState(initialValue);
  const handleStateChange = (evt) => {
    setState(evt.target.value);
  };
  const resetState = () => {
    setState('');
  };
  return [state, handleStateChange, resetState];
};
