'use client';

import { useState } from 'react';

import { Droppable, Draggable } from '@hello-pangea/dnd';
import { StaticImageData } from 'next/image';

import AddButton from '@/components/common/button/add';
import CreateWorkModal from '@/components/Modal/WorkModal/CreateWorkModal';
import DashboardTitle from '../ColumnTitle/ColumnTitle';
import Card from '../Card/Card';

interface I_Column {
  column: { id: string; title: string; cardIds: string[] };
  cards: {
    id: string;
    content: {
      image?: StaticImageData;
      title: string;
      tag: React.ReactNode[];
      date: string;
      user: JSX.Element;
    };
  }[];
  index: number;
  dashboardId: string;
}

const Column = ({ column, cards, index, dashboardId }: I_Column) => {
  const [isToggeldCreateWorkModal, setIsCreatWorkModal] = useState(false);

  const handleCreateWorkModal = () => {
    setIsCreatWorkModal(!isToggeldCreateWorkModal);
  };

  return (
    <Draggable draggableId={column.id} index={index}>
      {provided => (
        <div
          className='flex flex-col border border-r-[1px] border-dotted  bg-tp-gray_500 gap-4 w-96  min-h-screen p-5 '
          ref={provided.innerRef}
          {...provided.draggableProps}>
          <div className=' flex flex-col  gap-4  ' {...provided.dragHandleProps}>
            <DashboardTitle title={column.title} count={cards.length} columnId={column.id} dashboardId={dashboardId} />
            <AddButton onClick={handleCreateWorkModal} />
            {isToggeldCreateWorkModal && <CreateWorkModal handleModal={handleCreateWorkModal} />}
          </div>
          <Droppable droppableId={column.id} type='card'>
            {provided => (
              <div className='flex flex-col  gap-4' {...provided.droppableProps} ref={provided.innerRef}>
                <>
                  {cards.map((card, idx) => (
                    <Card key={card.id} card={card} index={idx} />
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
