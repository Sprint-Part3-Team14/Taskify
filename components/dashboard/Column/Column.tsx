'use client';

import { useEffect, useState } from 'react';

import { Droppable, Draggable } from '@hello-pangea/dnd';
import { I_CardItem, I_Column } from 'interface/Dashboard';

import AddButton from 'components/common/button/add';
import CreateWorkModal from 'components/Modal/WorkModal/CreateWorkModal';
import ColumnTitle from '../ColumnTitle/ColumnTitle';
import Card from '../Card/Card';
import { setAccessToken, getAccessToken } from '@/utils/handleToken';
import { TEMP_TOKEN } from '@/app/(dashboard)/dashboard/constants';

const Column = ({ columnItem, cardList, index, dashboardId, dragDropItem }: I_Column) => {
  const [isToggeldModal, setIsToggeldModal] = useState(false);
  const [dashboardMembers, setDashboardMembers] = useState([]);

  const handleToggeldModal = () => {
    setIsToggeldModal(!isToggeldModal);
  };

  useEffect(() => {
    setAccessToken(TEMP_TOKEN);
    const getMyDashboardMembers = async () => {
      try {
        const accessToken = getAccessToken();
        const response = await fetch(
          `https://sp-taskify-api.vercel.app/4-14/members?page=1&size=20&dashboardId=${dashboardId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const responseData = await response.json();
        const MembersData = responseData.members;
        setDashboardMembers(MembersData);
      } catch (error) {
        console.error(error);
      }
    };
    getMyDashboardMembers();
  }, []);

  return (
    <Draggable draggableId={columnItem.id} index={index}>
      {provided => (
        <div
          className='flex flex-col items-center border border-r-[1px] border-dotted  bg-tp-gray_500 gap-4 tb:w-full pc:w-96 tb:h-auto pc:min-h-screen p-5 '
          ref={provided.innerRef}
          {...provided.draggableProps}>
          <div className=' flex flex-col w-full gap-4  ' {...provided.dragHandleProps}>
            <ColumnTitle
              title={columnItem.title}
              count={cardList.length}
              columnId={columnItem.id}
              dashboardId={dashboardId}
            />
            <AddButton onClick={handleToggeldModal} />
            {isToggeldModal && (
              <CreateWorkModal
                handleModal={handleToggeldModal}
                dashboardMembers={dashboardMembers}
                dashboardId={dashboardId}
                column={columnItem}
                onClickFirstButton={handleToggeldModal}
              />
            )}
          </div>
          <Droppable droppableId={columnItem.id} type='card'>
            {provided => (
              <div className='flex flex-col w-full  gap-4' {...provided.droppableProps} ref={provided.innerRef}>
                <>
                  {cardList.map((card: I_CardItem, index: number) => (
                    <Card
                      key={card.id}
                      cardItem={card}
                      index={index}
                      members={dashboardMembers}
                      columnItem={columnItem}
                      dragDropItem={dragDropItem}
                    />
                  ))}
                  {provided.placeholder}
                </>
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};

export default Column;
