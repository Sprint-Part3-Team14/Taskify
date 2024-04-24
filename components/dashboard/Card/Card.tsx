'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Draggable } from '@hello-pangea/dnd';

import WorkModal from '@/components/Modal/WorkModal/WorkModal';
import TagChip from 'components/common/Chip/TagChip';
import { I_Card } from 'interface/Dashboard';
import { CalendarTodayIcon } from 'constant/importImage';

const Card = ({ cardItem, index, members, columnItem, dragDropItem }: I_Card) => {
  const [isToggledModal, setIstoggeldModal] = useState(false);

  const handleToggledModal = () => {
    setIstoggeldModal(!isToggledModal);
  };

  console.log(cardItem);

  const isDragDisabled = String(cardItem.id) === '';
  return (
    <Draggable draggableId={String(cardItem.id)} index={index} isDragDisabled={isDragDisabled}>
      {provided => (
        <div
          className='flex flex-col gap-2.5 p-5 w-full border border-solid border-tp-gray_700 bg-tp-white rounded-md'
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}>
          <div className='flex pc:flex-col tb:flex-row mb:flex-col w-full gap-[0.625rem]' onClick={handleToggledModal}>
            {cardItem?.content.image && (
              <img
                className='flex flex-col gap-[0.625rem] tb:w-[5.7rem]  pc:w-full  rounded-md '
                src={cardItem?.content.image}
                alt='card'
              />
            )}
            <div className='flex flex-col w-full gap-[0.625rem]'>
              <div className=' font-semibold text-base'>{cardItem.content.title}</div>
              <div className='flex gap-1.5'>
                {cardItem.content.tag.map((item, index) => (
                  <TagChip key={index} name={item} size='large' />
                ))}
              </div>
              <div className='flex justify-between'>
                <div className='flex flex-wrap items-center gap-1.5'>
                  <Image src={CalendarTodayIcon} alt='calendar' width={18} height={18} />
                  <div className='text-xs font-medium text-tp-gray_900'>{cardItem.content.date}</div>
                </div>
                <div>{cardItem.content.user}</div>
              </div>
            </div>
          </div>
          {isToggledModal && (
            <WorkModal
              handleModal={handleToggledModal}
              members={members}
              columnItem={columnItem}
              dragDropItem={dragDropItem}
              cardItem={cardItem}
              onClickFirstButton={handleToggledModal}
            />
          )}
        </div>
      )}
    </Draggable>
  );
};

export default React.memo(Card);
