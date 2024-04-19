'use client';

import Image from 'next/image';
import { useState } from 'react';

import { I_SearchBarProps } from '@/interface/myInvitation';

const SEARCH_ICON = '/icon/search.svg';

const SearchBar = ({ onSearch }: I_SearchBarProps) => {
  const [keyword, setKeyword] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newKeyword = e.target.value;
    setKeyword(newKeyword);
    onSearch(newKeyword);
  };

  return (
    <div className='px-7'>
      <div className='flex w-full px-4 py-2 gap-2 border border-solid rounded-md border-tp-gray_700'>
        <Image src={SEARCH_ICON} alt='search' width={24} height={24} />
        <input
          className='w-full mb:text-sm tb:text-base placeholder:text-tp-gray_800'
          placeholder='검색'
          value={keyword}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default SearchBar;
