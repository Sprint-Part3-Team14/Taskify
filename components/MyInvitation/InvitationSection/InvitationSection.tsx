'use client';

import { useState, useEffect } from 'react';

import EmptyMessage from '../EmptyMessage/EmptyMessage';
import InvitationList from '../InvitationList/InvitationList';
import SearchBar from '../SearchBar/SearchBar';

import { TEMPORARY_INVITATION_DATA } from '../constants';

const InvitationSection = () => {
  const [invitationList, setInvitationList] = useState(TEMPORARY_INVITATION_DATA);
  const [filteredInvitationList, setFilteredInvitationList] = useState([...invitationList]);
  const [hasInviation, setHasInvitaion] = useState<boolean>(false);

  useEffect(() => {
    let count: number = invitationList.length;
    let countInvitation = count > 0 ? true : false;
    setHasInvitaion(countInvitation);
  }, [invitationList]);

  const handleAccept = (id: number) => {
    setInvitationList(prevList => prevList.filter(list => list.id !== id));
    setFilteredInvitationList(prevList => prevList.filter(list => list.id !== id));
  };

  const handleReject = (id: number) => {
    setInvitationList(prevList => prevList.filter(list => list.id !== id));
    setFilteredInvitationList(prevList => prevList.filter(list => list.id !== id));
  };

  const handleSearch = (keyword: string) => {
    if (keyword.trim() === '') {
      setFilteredInvitationList(invitationList);
    } else {
      const filteredList = invitationList.filter(list =>
        list.dashboard.title.toLowerCase().includes(keyword.toLowerCase())
      );
      setFilteredInvitationList(filteredList);
    }
  };

  return (
    <div className='flex flex-col gap-6  rounded-lg bg-tp-white max-w-[63.875rem] min-x-[16.25rem]'>
      <div className='px-7 pt-8 mb:text-xl tb:text-2xl font-bold'>초대 받은 대시보드</div>
      {hasInviation ? (
        <>
          <SearchBar onSearch={handleSearch} />
          <div className='flex flex-col'>
            <div className='tb:grid grid-cols-3 px-7 pb-1 text-tp-gray_800 mb:text-sm tb:text-base mb:hidden '>
              <h2>이름</h2>
              <h2>초대자</h2>
              <h2>수락여부</h2>
            </div>
            <InvitationList
              invitationList={filteredInvitationList}
              handleAccept={handleAccept}
              handleReject={handleReject}
            />
          </div>
        </>
      ) : (
        <EmptyMessage />
      )}
    </div>
  );
};

export default InvitationSection;
