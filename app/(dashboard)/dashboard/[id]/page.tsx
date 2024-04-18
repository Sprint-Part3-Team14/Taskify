'use client';

import React, { useCallback, useState } from 'react';

import { DragDropContext, DropResult, Droppable } from '@hello-pangea/dnd';
import { StaticImageData } from 'next/image';

import { initialData } from './initial-data';

import AddButton from '@/components/dashboard/AddButton/AddButton';
import Column from '@/components/dashboard/Column/Column';

interface I_Data {
  cards: {
    [key: string]: {
      id: string;
      content: {
        image?: StaticImageData;
        title: string;
        tag: React.ReactNode[];
        date: string;
        user: JSX.Element;
      };
    };
  };
  columns: {
    [key: string]: { id: string; title: string; cardIds: string[] };
  };
  columnOrder: string[];
}

const Dashboard = () => {
  const [data, setData] = useState<I_Data>(initialData);
  const onDragEnd = useCallback(
    (result: DropResult) => {
      const { destination, source, draggableId, type } = result;
      if (!destination) return;
      if (destination.droppableId === source.droppableId && source.index === destination.index) return;

      if (type === 'column') {
        const newColumnOrder = Array.from(data.columnOrder);
        newColumnOrder.splice(source.index, 1);
        newColumnOrder.splice(destination.index, 0, draggableId);

        const newData = {
          ...data,
          columnOrder: newColumnOrder,
        };
        setData(newData);
        return;
      }
      const startColumn = data.columns[source.droppableId];
      const finishColumn = data.columns[destination.droppableId];

      if (startColumn === finishColumn) {
        const newcardIds = Array.from(startColumn.cardIds);
        newcardIds.splice(source.index, 1);
        newcardIds.splice(destination.index, 0, draggableId);

        const newColumn = {
          ...startColumn,
          cardIds: newcardIds,
        };

        const newData = {
          ...data,
          columns: {
            ...data.columns,
            [newColumn.id]: newColumn,
          },
        };

        setData(newData);
      } else {
        const startcardIds = Array.from(startColumn.cardIds);
        startcardIds.splice(source.index, 1);
        const newStartColumn = {
          ...startColumn,
          cardIds: startcardIds,
        };

        const finishcardIds = Array.from(finishColumn.cardIds);
        finishcardIds.splice(destination.index, 0, draggableId);
        const newFinishColumn = {
          ...finishColumn,
          cardIds: finishcardIds,
        };

        const newData = {
          ...data,
          columns: {
            ...data.columns,
            [newStartColumn.id]: newStartColumn,
            [newFinishColumn.id]: newFinishColumn,
          },
        };

        setData(newData);
      }
    },
    [data]
  );

  return (
    <div className='flex flex-row w-full'>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId='all-columns' direction='horizontal' type='column'>
          {provided => (
            <div className='flex w-full' {...provided.droppableProps} ref={provided.innerRef}>
              {data.columnOrder.map((columnId, index) => {
                const column = data.columns[columnId];
                const cards = column.cardIds.map(cardId => data.cards[cardId]);
                return <Column column={column} cards={cards} key={column.id} index={index} />;
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <div className='w-fit grow py-16 px-5'>
        <AddButton>새로운 컬럼 추가하기</AddButton>
      </div>
    </div>
  );
};

export default Dashboard;
