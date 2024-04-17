import React from 'react';

import { Draggable } from '@hello-pangea/dnd';
import Image, { StaticImageData } from 'next/image';

import CALENDAR from '@/public/icon/calendar_today.svg';

interface I_Card {
  card: {
    id: string;
    content: {
      image?: StaticImageData;
      title: string;
      tag: React.ReactNode[];
      date: string;
      user: JSX.Element;
    };
  };
  index: number;
}

const Card = ({ card, index }: I_Card) => {
  const isDragDisabled = card.id === '';
  return (
    <Draggable draggableId={card.id} index={index} isDragDisabled={isDragDisabled}>
      {provided => (
        <div
          className='flex flex-col gap-2.5 p-5 border border-solid border-tp-gray_700 rounded-md'
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}>
          <div className='flex flex-col gap-[10px]'>
            {card?.content.image && (
              <Image className='w-full rounded-md' src={card?.content.image} alt='card' width={270} height={160} />
            )}
            <div className=' font-semibold text-base'>{card.content.title}</div>
            <div className='flex gap-1.5'>
              {card.content.tag.map((item, index) => (
                <div key={index}>{item}</div>
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
        </div>
      )}
    </Draggable>
  );
};

export default React.memo(Card);
