import React from 'react';
import Image from 'next/image';

import TagChip from 'components/common/Chip/TagChip';

import { CalendarTodayIcon } from 'constant/importImage';
import WorkModal from '@/components/Modal/WorkModal/WorkModal';
import { useHandleModal } from '@/hooks/useHandleModal';
import { I_Card, I_Column, I_Members } from '@/interface/Dashboard';

interface I_CardItem {
  cardItem: I_Card;
  columnItem: I_Column;
  dashboardMember: I_Members[];
}

const Card = ({ cardItem, dashboardMember, columnItem }: I_CardItem) => {
  const { isShowModal, handleToggleModal } = useHandleModal();
  const createdAtDate = new Date(cardItem.createdAt);
  const formattedDate = createdAtDate.toISOString().split('T')[0];

  return (
    <>
      <div className='flex flex-col gap-2.5 p-5 w-full border border-solid border-tp-gray_700 bg-tp-white rounded-md'>
        <div className='flex pc:flex-col tb:flex-row mb:flex-col w-full gap-[0.625rem]' onClick={handleToggleModal}>
          {cardItem.imageUrl && (
            <img
              className='flex flex-col gap-[0.625rem] tb:w-[5.7rem]  pc:w-full  rounded-md '
              src={cardItem.imageUrl}
              alt='card'
            />
          )}
          <div className='flex flex-col w-full gap-[0.625rem]'>
            <div className=' font-semibold text-base'>{cardItem.title}</div>
            <div className='flex gap-1.5'>
              {cardItem.tags.map((tag, index) => (
                <TagChip key={index} name={tag} size='large' />
              ))}
            </div>
            <div className='flex justify-between'>
              <div className='flex flex-wrap items-center gap-1.5'>
                <Image src={CalendarTodayIcon} alt='calendar' width={18} height={18} />
                <div className='text-xs font-medium text-tp-gray_900'>{formattedDate}</div>
              </div>
              <div>{cardItem.assignee.profileImageUrl}</div>
            </div>
          </div>
        </div>
      </div>
      {isShowModal && (
        <WorkModal
          handleModal={handleToggleModal}
          dashboardMember={dashboardMember}
          columnItem={columnItem}
          cardItem={cardItem}
        />
      )}
    </>
  );
};

export default Card;
