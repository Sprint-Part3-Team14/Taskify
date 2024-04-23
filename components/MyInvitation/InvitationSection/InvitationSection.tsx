'use client';

import { useState, useEffect, useRef } from 'react';

import EmptyMessage from '../EmptyMessage/EmptyMessage';
import InvitationList from '../InvitationList/InvitationList';
import SearchBar from '../SearchBar/SearchBar';
import { INVITATION_TABLE, MESSAGE } from '../constants';

import { getAccessToken } from 'utils/handleToken';

const PAGE_SIZE = 10;

const InvitationSection = () => {
  const [invitationList, setInvitationList] = useState([]);
  const [filteredInvitationList, setFilteredInvitationList] = useState([...invitationList]);
  const [hasInvitation, setHasInvitation] = useState(false);
  const [hasFilteredInvitation, setHasFilteredInvitation] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [cursorId, setCursorId] = useState('');

  const intersectionObserverRef = useRef(null);

  useEffect(() => {
    getMyInvitationData();
  }, []);

  useEffect(() => {
    setFilteredInvitationList(invitationList);
  }, [invitationList]);

  const getMyInvitationData = async () => {
    try {
      if (invitationList.length === 0) {
        const accessToken = getAccessToken();
        const response = await fetch(`https://sp-taskify-api.vercel.app/4-14/invitations?size=${PAGE_SIZE}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const responseData = await response.json();
        const myInvitationList = Array.isArray(responseData.invitations) ? responseData.invitations : [];
        setInvitationList(myInvitationList);
        setHasInvitation(myInvitationList.length > 0);
        setHasFilteredInvitation(myInvitationList.length > 0);
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
      const accessToken = getAccessToken();
      const response = await fetch(
        `https://sp-taskify-api.vercel.app/4-14/invitations?size=${PAGE_SIZE}&cursorId=${cursorId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const responseData = await response.json();
      const newInvitationList = Array.isArray(responseData.invitations) ? responseData.invitations : [];
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
  }, [cursorId]);

  const handleAcceptInvitation = async (id: number) => {
    try {
      const accessToken = getAccessToken();
      const response = await fetch(`https://sp-taskify-api.vercel.app/4-14/invitations/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ inviteAccepted: true }),
      });

      if (response.ok) {
        setInvitationList(prevList => prevList.filter(list => list.id !== id));
        setFilteredInvitationList(prevList => prevList.filter(list => list.id !== id));
      }
    } catch (error) {
      console.error(error);
    }
    setInvitationList(prevList => prevList.filter(list => list.id !== id));
    setFilteredInvitationList(prevList => prevList.filter(list => list.id !== id));
  };

  const handleRejectInvitation = async (id: number) => {
    try {
      const accessToken = getAccessToken();
      const response = await fetch(`https://sp-taskify-api.vercel.app/4-14/invitations/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ inviteAccepted: false }),
      });

      if (response.ok) {
        setInvitationList(prevList => prevList.filter(list => list.id !== id));
        setFilteredInvitationList(prevList => prevList.filter(list => list.id !== id));
      }
    } catch (error) {
      console.error(error);
    }
    setInvitationList(prevList => prevList.filter(list => list.id !== id));
    setFilteredInvitationList(prevList => prevList.filter(list => list.id !== id));
  };

  const handleSearchInvitation = (keyword: string) => {
    setSearchKeyword(keyword);
  };

  useEffect(() => {
    if (searchKeyword.trim() === '') {
      setFilteredInvitationList(invitationList);
      setHasFilteredInvitation(true);
    } else {
      const filteredList = invitationList.filter(list =>
        list.dashboard.title.toLowerCase().includes(searchKeyword.toLowerCase())
      );
      setFilteredInvitationList(filteredList);
      setHasFilteredInvitation(filteredList.length > 0);
    }
  }, [searchKeyword, invitationList]);
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
