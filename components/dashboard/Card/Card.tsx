'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Draggable } from '@hello-pangea/dnd';

import EditCardModal from 'components/Modal/WorkModal/EditCardModal';
import TagChip from 'components/common/Chip/TagChip';
import { I_Card } from 'interface/Dashboard';
import { CALENDAR } from '../constants';

const Card = ({ cards, index, members, column, dragDropItem }: I_Card) => {
  const [isToggledModal, setIstoggeldModal] = useState(false);

  const handleToggledModal = () => {
    setIstoggeldModal(!isToggledModal);
  };
  const isDragDisabled = String(cards.id) === '';
  return (
    <Draggable draggableId={String(cards.id)} index={index} isDragDisabled={isDragDisabled}>
      {provided => (
        <div
          className='flex flex-col gap-2.5 p-5 w-[20.8125rem] border border-solid border-tp-gray_700 bg-tp-white rounded-md'
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}>
          <div className='flex flex-col gap-[10px]' onClick={handleToggledModal}>
            {cards?.content.image && <img className='w-full rounded-md' src={cards?.content.image} alt='card' />}
            <div className=' font-semibold text-base'>{cards.content.title}</div>
            <div className='flex gap-1.5'>
              {cards.content.tag.map((item, index) => (
                <TagChip key={index} name={item} size='large' color={1} />
              ))}
            </div>
            <div className='flex justify-between'>
              <div className='flex flex-wrap items-center gap-1.5'>
                <Image src={CALENDAR} alt='calendar' width={18} height={18} />
                <div className='text-xs font-medium text-tp-gray_900'>{cards.content.date}</div>
              </div>
              <div>{cards.content.user}</div>
            </div>
          </div>
          {isToggledModal && (
            <EditCardModal
              handleModal={handleToggledModal}
              members={members}
              column={column}
              dragDropItem={dragDropItem}
              cards={cards}
            />
          )}
        </div>
      )}
    </Draggable>
  );
};

export default React.memo(Card);
