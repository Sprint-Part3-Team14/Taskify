import { ChangeEvent, useState } from 'react';

export const useInputValue = () => {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return { inputValue, onChange: handleChange };
};
