'use client';

import { useEffect, useState, useRef } from 'react';

import ColumnTitle from '../ColumnTitle/ColumnTitle';
import Card from '../Card/Card';

import AddButton from '@/components/common/button/add';
import CreateWorkModal from '@/components/Modal/WorkModal/CreateWorkModal';

import { getAddCardList, getCardList } from '@/utils/api/getCardList';
import { getDashboardMember } from '@/utils/api/getDashboardMember';
import { useHandleModal } from '@/hooks/useHandleModal';
import { I_Column, I_Dashboard } from '@/interface/Dashboard';

interface I_ColumnList {
  columnItem: I_Column;
  dashboardItem: I_Dashboard[];
}

const Column = ({ columnItem, dashboardItem }: I_ColumnList) => {
  const { isShowModal, handleToggleModal } = useHandleModal();
  const [dashboardMember, setDashboardMember] = useState([]);
  const [cardCount, setCardCount] = useState(0);
  const [cardList, setCardList] = useState([]);
  const [targetId, setCursorId] = useState('');

  useEffect(() => {
    const getMyDashboardMembers = async () => {
      try {
        const { members } = await getDashboardMember({ dashboard: columnItem.dashboardId });
        setDashboardMember(members);
      } catch (error) {
        console.error(error);
      }
    };
    getMyDashboardMembers();
  }, []);

  const intersectionObserverRef = useRef(null);
  useEffect(() => {
    getDashboardCardList();
  }, []);

  const getDashboardCardList = async () => {
    try {
      if (cardList.length === 0) {
        const { cards } = await getCardList({ column: columnItem.id });
        const cardList = Array.isArray(cards) ? cards : [];
        setCardList(cards);
        if (cardList.length > 0) {
          setCursorId(cardList[cardList.length - 1].id);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getAddDashboardCardList = async () => {
    try {
      const { cards, totalCount } = await getAddCardList({ column: columnItem.id, targetId: targetId });
      const newCardList = Array.isArray(cards) ? cards : [];
      setCardList(prevList => [...prevList, ...newCardList]);
      setCardCount(totalCount);
      if (newCardList.length > 0) {
        setCursorId(newCardList[newCardList.length - 1].id);
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
            getAddDashboardCardList();
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

  return (
    <div className='flex flex-col items-center pc:border-r-[1px] border-dotted  bg-tp-gray_500 gap-4 tb:w-full pc:w-96 tb:h-auto pc:min-h-screen p-5 '>
      <div className=' flex flex-col w-full gap-4  '>
        <ColumnTitle
          columnId={columnItem.id}
          dashboardId={columnItem.dashboardId}
          count={cardCount}
          title={columnItem.title}
        />
        <AddButton onClick={handleToggleModal} />
        {isShowModal && (
          <CreateWorkModal handleModal={handleToggleModal} columnItem={columnItem} dashboardMembers={dashboardMember} />
        )}
      </div>
      <div className='flex flex-col w-full  gap-4'>
        <div className='flex flex-col w-full  gap-4'>
          {cardList &&
            cardList.map(card => (
              <Card
                key={card.id}
                columnItem={columnItem}
                cardItem={card}
                dashboardMember={dashboardMember}
                dashboardItem={dashboardItem}
              />
            ))}
          <div ref={intersectionObserverRef}></div>
        </div>
      </div>
    </div>
  );
};

export default Column;
