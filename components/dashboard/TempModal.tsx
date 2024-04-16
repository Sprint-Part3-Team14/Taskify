'use client';

import { useState } from 'react';

const TempModal = ({ onChange, onClick }: { onChange: (value: string) => void; onClick: () => void }) => {
  const [value, setValue] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target.value;
    setValue(target);
  };

  const handleSubmit = () => {
    onChange(value);
    onClick();
  };

  return (
    <div>
      <div>컬럼생성</div>
      <input className='border border-solid border-red-400 ' onChange={handleChange} value={value} />
      <button className='bg-teal-300' onClick={handleSubmit}>
        제출
      </button>
    </div>
  );
};

export default TempModal;
