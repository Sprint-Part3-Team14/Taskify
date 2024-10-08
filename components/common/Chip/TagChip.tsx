'use client';

import { useState } from 'react';

export interface I_TagChip {
  name: string;
  size: 'large' | 'small';
  onClick?: () => void;
}

const fontSizeSelect = {
  large: 'text-xs',
  small: 'text-[0.625rem]',
};

const colors = {
  1: 'bg-[#DBE6F7] text-[#4981D5]',
  2: 'bg-[#F7DBF0] text-[#D549B6]',
  3: 'bg-[#E7F7DB] text-[#86D549]',
  4: 'bg-[#F9EEE3] text-[#D58D49]',
};

const TagChip = ({ size, name, onClick }: I_TagChip) => {
  const [randomColorIndex] = useState(Math.floor(Math.random() * 4) + 1);

  return (
    <div
      onClick={onClick}
      className={`${fontSizeSelect[size]} ${colors[randomColorIndex]} flex items-center px-2 py-1 gap-1.5 rounded`}>
      {name}
    </div>
  );
};

export default TagChip;
