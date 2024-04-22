'use client';

import React, { useState } from 'react';

import EditCardModal from '@/components/Modal/WorkModal/EditCardModal';

import { Draggable } from '@hello-pangea/dnd';
import Image from 'next/image';
import TagChip from '@/components/common/Chip/TagChip';
import { I_Card } from '@/interface/Dashboard';

const CALENDAR = '/icon/calendar_today.svg';

const Card = ({ card, index, members, column, dashboardItem }: I_Card) => {
  const [isToggledEditWorkModal, setIsToggledEditWorkModal] = useState(false);

  const handleToggledEditWorkModal = () => {
    setIsToggledEditWorkModal(!isToggledEditWorkModal);
  };
  const isDragDisabled = String(card.id) === '';
  return (
    <Draggable draggableId={String(card.id)} index={index} isDragDisabled={isDragDisabled}>
      {provided => (
        <div
          className='flex flex-col gap-2.5 p-5 border border-solid border-tp-gray_700 bg-tp-gray_500 rounded-md'
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}>
          <div className='flex flex-col gap-[10px]' onClick={handleToggledEditWorkModal}>
            {card?.content.image && <img className='w-full rounded-md' src={card?.content.image} alt='card' />}
            <div className=' font-semibold text-base'>{card.content.title}</div>
            <div className='flex gap-1.5'>
              {card.content.tag.map((item, index) => (
                <TagChip key={index} name={item} size='large' color='red' />
              ))}
            </div>
            <div className='flex justify-between'>
              <div className='flex items-center gap-1.5'>
                <Image src={CALENDAR} alt='calendar' width={18} height={18} />
                <div className='text-xs font-medium text-tp-gray_900'>{card.content.date}</div>
              </div>
              <div>{card.content.user}</div>
            </div>
          </div>
          {isToggledEditWorkModal && (
            <EditCardModal
              handleModal={handleToggledEditWorkModal}
              members={members}
              column={column}
              dashboardItem={dashboardItem}
              card={card}
            />
          )}
        </div>
      )}
    </Draggable>
  );
};

export default React.memo(Card);
