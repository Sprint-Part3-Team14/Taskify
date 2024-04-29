'use client';

import { Draggable, Droppable } from '@hello-pangea/dnd';
import { useEffect, useState, useRef } from 'react';

import Card from '../Card/Card';
import ColumnTitle from '../ColumnTitle/ColumnTitle';

import CreateWorkModal from '@/components/Modal/WorkModal/CreateWorkModal';
import AddButton from '@/components/common/button/add';
import { useHandleModal } from '@/hooks/useHandleModal';
import { I_Column, I_Dashboard } from '@/interface/Dashboard';
import { getAddCardList, getCardList } from '@/utils/api/getCardList';
import { getDashboardMember } from '@/utils/api/getDashboardMember';

interface I_ColumnList {
  columnItem: I_Column;
  dashboardItem: I_Dashboard[];
  index: number;
  onCardListChange: (columnId: number, cardList: I_CardItem[]) => void;
  changeCardList: { [columnId: number]: I_CardItem[] };
}

interface I_CardItem {
  id: number;
  title: string;
  description: string;
  tags: string[];
  dueDate: string;
  assignee: {
    id: number;
    nickname: string;
    profileImageUrl: string | null;
  };
  imageUrl: string | null;
  teamId: string;
  dashboardId: number;
  columnId: number;
  createdAt: string;
  updatedAt: string;
}

const Column = ({ columnItem, dashboardItem, index, onCardListChange, changeCardList }: I_ColumnList) => {
  const { isShowModal, handleToggleModal } = useHandleModal();
  const [dashboardMember, setDashboardMember] = useState([]);
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

  useEffect(() => {
    onCardListChange(columnItem.id, cardList);
  }, [cardList]);

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
      const { cards } = await getAddCardList({ column: columnItem.id, targetId: targetId });
      const newCardList = Array.isArray(cards) ? cards : [];
      setCardList(prevList => [...prevList, ...newCardList]);
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
    <Draggable draggableId={String(columnItem.id)} index={index}>
      {provided => (
        <div
          className='flex flex-col items-center pc:border-r-[1px] border-dotted h-full bg-tp-gray_500 gap-4 tb:w-full pc:w-96 tb:h-auto pc:min-h-screen p-5'
          ref={provided.innerRef}
          {...provided.draggableProps}>
          <div className=' flex flex-col w-full  gap-4' {...provided.dragHandleProps}>
            <ColumnTitle
              columnId={columnItem.id}
              dashboardId={columnItem.dashboardId}
              changeCardList={changeCardList}
              title={columnItem.title}
            />
            <AddButton onClick={handleToggleModal} />
            {isShowModal && (
              <CreateWorkModal
                handleModal={handleToggleModal}
                columnItem={columnItem}
                dashboardMembers={dashboardMember}
              />
            )}
          </div>
          <Droppable droppableId={String(columnItem.id)} type='card'>
            {provided => (
              <div className='flex flex-col w-full  gap-4' {...provided.droppableProps} ref={provided.innerRef}>
                <div className='flex flex-col w-full  gap-4'>
                  {changeCardList[columnItem.id] &&
                    changeCardList[columnItem.id].map((card, index) => (
                      <Card
                        key={card.id}
                        columnItem={columnItem}
                        cardItem={card}
                        dashboardMember={dashboardMember}
                        dashboardItem={dashboardItem}
                        index={index}
                      />
                    ))}
                  <div ref={intersectionObserverRef}></div>
                </div>
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};

export default Column;
