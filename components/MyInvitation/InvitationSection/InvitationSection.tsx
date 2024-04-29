'use client';

import { useState, useEffect, useRef } from 'react';

import EmptyMessage from '../EmptyMessage/EmptyMessage';
import InvitationList from '../InvitationList/InvitationList';
import SearchBar from '../SearchBar/SearchBar';
import { INVITATION_TABLE, MESSAGE } from '../constants';

import { getAddInvitationList, getMyInvitationList } from '@/utils/api/getMyInvitationList';
import { acceptInvitationData, deleteInvitationData } from '@/utils/api/invitation';

const InvitationSection = () => {
  const [invitationList, setInvitationList] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [targetId, setCursorId] = useState('');

  const intersectionObserverRef = useRef(null);
  useEffect(() => {
    getMyInvitationData();
  }, []);

  const getMyInvitationData = async () => {
    try {
      if (invitationList.length === 0) {
        const { invitations } = await getMyInvitationList();
        const myInvitationList = Array.isArray(invitations) ? invitations : [];
        setInvitationList(myInvitationList);
        if (myInvitationList.length > 0) {
          setCursorId(myInvitationList[myInvitationList.length - 1].id);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getAddInvitationData = async () => {
    try {
      const { invitations } = await getAddInvitationList({ targetId: targetId });
      const newInvitationList = Array.isArray(invitations) ? invitations : [];
      setInvitationList(prevList => [...prevList, ...newInvitationList]);
      if (newInvitationList.length > 0) {
        setCursorId(newInvitationList[newInvitationList.length - 1].id);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const intersectionObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            getAddInvitationData();
          }
        });
      },
      {
        threshold: 0.5,
      }
    );

    if (intersectionObserverRef.current) {
      intersectionObserver.observe(intersectionObserverRef.current);
    }

    return () => {
      if (intersectionObserverRef.current) {
        intersectionObserver.unobserve(intersectionObserverRef.current);
      }
    };
  }, [targetId]);

  const handleAcceptInvitation = async (id: number) => {
    try {
      const result = await acceptInvitationData({ id: id, inviteAccepted: false });
      if (result) {
        alert(MESSAGE.ACCEPT);
        setInvitationList(prevList => prevList.filter(list => list.id !== id));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleRejectInvitation = async (id: number) => {
    try {
      const result = await deleteInvitationData({ id: id, inviteAccepted: false });

      if (result) {
        alert(MESSAGE.REJECT);
        setInvitationList(prevList => prevList.filter(list => list.id !== id));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearchInvitation = (keyword: string) => {
    setSearchKeyword(keyword);
  };

  const hasInvitation = invitationList.length > 0;
  const hasSearchKeyword = searchKeyword.trim() !== '';

  const filteredInvitationList = hasSearchKeyword
    ? invitationList.filter(list => list.dashboard.title.toLowerCase().includes(searchKeyword.toLowerCase()))
    : invitationList;

  const hasFilteredInvitation = filteredInvitationList.length > 0;

  return (
    <section className='flex flex-col gap-6  rounded-lg bg-tp-white max-w-[63.875rem] min-x-[16.25rem]'>
      <h1 className='px-7 pt-8 mb:text-xl tb:text-2xl font-bold'>{INVITATION_TABLE.TITLE}</h1>
      {hasInvitation && (
        <>
          <SearchBar onSearch={handleSearchInvitation} />
          <div className='flex flex-col'>
            <div className='tb:grid grid-cols-3 px-7 pb-1 text-tp-gray_800 mb:text-sm tb:text-base mb:hidden '>
              <h2>{INVITATION_TABLE.NAME}</h2>
              <h2>{INVITATION_TABLE.INVITOR}</h2>
              <h2>{INVITATION_TABLE.ACCEPTANCE}</h2>
            </div>
            <InvitationList
              invitationList={filteredInvitationList}
              handleAccept={handleAcceptInvitation}
              handleReject={handleRejectInvitation}
            />
            <div ref={intersectionObserverRef}></div>
          </div>
        </>
      )}
      {!hasInvitation && <EmptyMessage message={MESSAGE.EMPTY} />}
      {hasInvitation && !hasFilteredInvitation && <EmptyMessage message={MESSAGE.NO_SEARCH} />}
    </section>
  );
};

export default InvitationSection;
