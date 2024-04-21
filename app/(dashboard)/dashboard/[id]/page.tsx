'use client';

import React, { useCallback, useEffect, useState } from 'react';

import { DragDropContext, DropResult, Droppable } from '@hello-pangea/dnd';

import AddButton from '@/components/common/button/add';
import Column from '@/components/Dashboard/Column/Column';
import CreateColumnModal from '@/components/Modal/CreateColumnModal';

import { setAccessToken, getAccessToken } from '@/utils/handleToken';
import { usePathname } from 'next/navigation';

export interface I_DashboardColumns {
  result: string;
  data: [];
}

export interface I_DashboardColumnsItem {
  id: number;
  title: string;
  teamId: string;
  dashboardId: number;
  createdAt: string;
  updatedAt: string;
}

const Dashboard = () => {
  const [isToggledCreatedColumnModal, setIsToggledCreatedColumnModal] = useState(false);
  const [data, setData] = useState({ cards: {}, columns: {}, columnOrder: [] });
  const [columnNewTitle, setColumnNewTitle] = useState('');
  const path = usePathname();
  const dashboardId = path.split('/')[2];

  const handleToggledCreateColumnModal = () => {
    setIsToggledCreatedColumnModal(!isToggledCreatedColumnModal);
  };

  const handlCloseModal = () => {
    handleToggledCreateColumnModal();
  };

  const handleColumnNewTitle = (title: string) => {
    setColumnNewTitle(title);
  };

  useEffect(() => {
    setAccessToken(
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTc2NCwidGVhbUlkIjoiNC0xNCIsImlhdCI6MTcxMzUzNDk0NCwiaXNzIjoic3AtdGFza2lmeSJ9.o5wp3rAonlrxZUKvldFhQWQdIsGksFE8A1qusxMXlpA'
    );
    const getDashboardColumnList = async () => {
      try {
        const accessToken = getAccessToken();
        const response = await fetch(`https://sp-taskify-api.vercel.app/4-14/columns?dashboardId=${dashboardId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const responseData = await response.json();
        const columns = {};
        const columnOrder = responseData.data.map(column => {
          columns[String(column.id)] = {
            id: String(column.id),
            title: column.title,
            cardIds: [],
          };
          return String(column.id);
        });
        setData({ cards: {}, columns, columnOrder });
      } catch (error) {
        console.error(error);
      }
    };
    getDashboardColumnList();
  }, []);

  const handleCreateColumn = async () => {
    setAccessToken(
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTc2NCwidGVhbUlkIjoiNC0xNCIsImlhdCI6MTcxMzUzNDk0NCwiaXNzIjoic3AtdGFza2lmeSJ9.o5wp3rAonlrxZUKvldFhQWQdIsGksFE8A1qusxMXlpA'
    );
    try {
      const accessToken = getAccessToken();
      const response = await fetch(`https://sp-taskify-api.vercel.app/4-14/columns`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: columnNewTitle,
          dashboardId: Number(dashboardId),
        }),
      });

      if (response.ok) {
        handlCloseModal();
        const newColumnData = await response.json();

        setData(prevData => ({
          ...prevData,
          columns: {
            ...prevData.columns,
            [newColumnData.id]: {
              id: newColumnData.id,
              title: newColumnData.title,
              cardIds: [],
            },
          },
          columnOrder: [...prevData.columnOrder, newColumnData.id],
        }));
      }
    } catch (error) {
      console.error(error);
    }
  };

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
    <>
      <div className='flex flex-row w-full bg-tp-gray_500'>
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
          <AddButton onClick={handleToggledCreateColumnModal}>새로운 컬럼 추가하기</AddButton>
        </div>
      </div>
      {isToggledCreatedColumnModal && (
        <CreateColumnModal
          onClickFirstButton={handlCloseModal}
          onClickSecondButton={handleCreateColumn}
          onChange={handleColumnNewTitle}
          handleModal={handleToggledCreateColumnModal}
        />
      )}
    </>
  );
};

export default Dashboard;
