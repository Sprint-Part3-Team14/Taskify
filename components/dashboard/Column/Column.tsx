'use client';

import { useEffect, useState } from 'react';

import ColumnTitle from '../ColumnTitle/ColumnTitle';
import Card from '../Card/Card';

import AddButton from '@/components/common/button/add';
import CreateWorkModal from '@/components/Modal/WorkModal/CreateWorkModal';

import { getCardList } from '@/utils/api/getCardList';
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
  const [cardList, setCardList] = useState([]);
  const [cardCount, setCardCount] = useState(0);

  useEffect(() => {
    const getDashboardCardList = async () => {
      try {
        const { cards, totalCount } = await getCardList({ column: columnItem.id });
        setCardList(cards);
        setCardCount(totalCount);
      } catch (error) {
        console.error(error);
      }
    };

    getDashboardCardList();
  }, [columnItem.id]);

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
        </div>
      </div>
    </div>
  );
};

export default Column;
