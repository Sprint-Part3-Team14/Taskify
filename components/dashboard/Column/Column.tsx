'use client';

import { useState } from 'react';

import { Droppable, Draggable } from '@hello-pangea/dnd';
import { I_Column } from '@/interface/Dashboard';

import AddButton from 'components/common/button/add';
import CreateWorkModal from 'components/Modal/WorkModal/CreateWorkModal';
import ColumnTitle from '../ColumnTitle/ColumnTitle';
import Card from '../Card/Card';

const Column = ({ column, cards, index, dashboardId }: I_Column) => {
  const [isToggeldCreateWorkModal, setIsToggledCreatWorkModal] = useState(false);
  const handleToggledCreateWorkModal = () => {
    setIsToggledCreatWorkModal(!isToggeldCreateWorkModal);
  };
  return (
    <Draggable draggableId={column.id} index={index}>
      {provided => (
        <div
          className='flex flex-col border border-r-[1px] border-dotted  bg-tp-gray_500 gap-4 w-96  min-h-screen p-5 '
          ref={provided.innerRef}
          {...provided.draggableProps}>
          <div className=' flex flex-col  gap-4  ' {...provided.dragHandleProps}>
            <ColumnTitle title={column.title} count={cards.length} columnId={column.id} dashboardId={dashboardId} />
            <AddButton onClick={handleToggledCreateWorkModal} />
            {isToggeldCreateWorkModal && <CreateWorkModal handleModal={handleToggledCreateWorkModal} />}
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
