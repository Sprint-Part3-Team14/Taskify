'use client';

import { useState, useEffect } from 'react';

import EmptyMessage from '../EmptyMessage/EmptyMessage';
import InviteList from '../InviteList/InviteList';
import SearchBar from '../SearchBar/SearchBar';

const InviteSection = () => {
  const [inviteList, setInviteList] = useState([
    { title: 'qqecvd', image: '1', id: 10 },
    { title: 'Title222', image: '2', id: 20 },
    { title: 'eeelqla', image: '3', id: 30 },
    { title: 'Tsdfsdf', image: '4', id: 40 },
    { title: 'Tisdsdweq', image: '5', id: 50 },
  ]);
  const [filteredInviteList, setFilteredInviteList] = useState([...inviteList]);
  const [count, setCount] = useState<number>(inviteList.length);

  useEffect(() => {
    setCount(inviteList.length);
  }, [inviteList]);

  const handleAccept = (id: number) => {
    setInviteList(prevList => prevList.filter(item => item.id !== id));
    setFilteredInviteList(prevList => prevList.filter(item => item.id !== id)); // Update filtered list
  };

  const handleReject = (id: number) => {
    setInviteList(prevList => prevList.filter(item => item.id !== id));
    setFilteredInviteList(prevList => prevList.filter(item => item.id !== id)); // Update filtered list
  };

  const handleSearch = (keyword: string) => {
    if (keyword.trim() === '') {
      setFilteredInviteList(inviteList);
    } else {
      const filteredList = inviteList.filter(item => item.title.toLowerCase().includes(keyword.toLowerCase()));
      setFilteredInviteList(filteredList);
    }
  };

  return (
    <div className='flex flex-col gap-6  rounded-lg bg-tp-white max-w-[63.875rem] min-x-[16.25rem]'>
      <div className='px-7 pt-8 mb:text-xl tb:text-2xl font-bold'>초대 받은 대시보드</div>
      {count === 0 ? (
        <EmptyMessage />
      ) : (
        <>
          <SearchBar onSearch={handleSearch} />
          <div className='flex flex-col'>
            <div className='tb:grid grid-cols-3 px-7 pb-1 text-tp-gray_800 mb:text-sm tb:text-base mb:hidden '>
              <h2>이름</h2>
              <h2>초대자</h2>
              <h2>수락여부</h2>
            </div>
            <InviteList inviteList={filteredInviteList} handleAccept={handleAccept} handleReject={handleReject} />
          </div>
        </>
      )}
    </div>
  );
};

export default InviteSection;
