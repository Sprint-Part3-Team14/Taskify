'use client';

import Image from 'next/image';
import { useState } from 'react';

import { I_SearchBarProps } from 'interface/myInvitation';
import { SearchIcon } from 'constant/importImage';
import { PLACEHOLDER } from '../constants';

const SearchBar = ({ onSearch }: I_SearchBarProps) => {
  const [keyword, setKeyword] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newKeyword = e.target.value;
    setKeyword(newKeyword);
    onSearch(newKeyword);
  };

  return (
    <div className='px-7'>
      <div className='flex w-full px-4 py-2 gap-2 border border-solid rounded-md border-tp-gray_700 focus-within:border-tp-black_800 focus-within:border-[2.5px]'>
        <Image src={SearchIcon} alt='search' width={24} height={24} />
        <input
          className='w-full mb:text-sm tb:text-base outline-none placeholder:text-tp-gray_800'
          placeholder={PLACEHOLDER.SEARCH}
          value={keyword}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default SearchBar;
