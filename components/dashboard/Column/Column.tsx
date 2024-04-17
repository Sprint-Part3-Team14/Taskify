import { Droppable, Draggable } from '@hello-pangea/dnd';
import { StaticImageData } from 'next/image';

import AddButton from '../AddButton/AddButton';
import DashboardTitle from '../DashboardTitle/DashboardTitle';

import Card from '@/components/Card/Card';

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
}

const Column = ({ column, cards, index }: I_Column) => {
  return (
    <Draggable draggableId={column.id} index={index}>
      {provided => (
        <div
          className='flex flex-col border border-r-[1px] border-dotted gap-4 w-96  min-h-screen p-5 '
          ref={provided.innerRef}
          {...provided.draggableProps}>
          <div className=' flex flex-col  gap-4  ' {...provided.dragHandleProps}>
            <DashboardTitle title={column.title} count={cards.length} />
            <AddButton />
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
