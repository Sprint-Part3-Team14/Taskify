'use client';

import { DragDropContext, Droppable, DropResult } from '@hello-pangea/dnd';
import { usePathname } from 'next/navigation';
import React, { ChangeEvent, useEffect, useState } from 'react';



import CreateColumnModal from '@/components/Modal/CreateColumnModal';
import { MESSAGE } from '@/components/MyInvitation/constants';
import AddButton from '@/components/common/button/add';
import Column from '@/components/dashboard/Column/Column';
import { BUTTON } from '@/components/dashboard/constants';
import { useHandleModal } from '@/hooks/useHandleModal';
import { createColumn } from '@/utils/api/createColumn';
import { getColumnList } from '@/utils/api/getColumnList';

const Dashboard = () => {
  const { isShowModal, handleToggleModal } = useHandleModal();
  const [newColumnTitle, setNewColumnTitle] = useState('');
  const [columnList, setColumnList] = useState([]);
  const [cardLists, setCardLists] = useState({});

  const path = usePathname();
  const dashboardId = path.split('/')[2];
  const columnTitle = columnList && columnList.map(column => column.title);

  const getDashboardColumnList = async () => {
    try {
      const { data } = await getColumnList({ id: dashboardId });
      setColumnList(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getDashboardColumnList();
  }, []);

  const handleCreateColumn = async () => {
    if (columnTitle.includes(newColumnTitle)) {
      alert(MESSAGE.IS_DUPLICATE_COLUMN);
      return;
    }

    try {
      const result = await createColumn({ title: newColumnTitle, dashboardId: Number(dashboardId) });
      if (result) {
        handleToggleModal();
        getDashboardColumnList();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleNewColumn = (event: ChangeEvent<HTMLInputElement>) => {
    const title = event.target.value;
    setNewColumnTitle(title);
  };

  const handleCardListChange = (columnId: number, newCardList: any[]) => {
    setCardLists(prevState => ({
      ...prevState,
      [columnId]: newCardList,
    }));
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId && source.index === destination.index) {
      return;
    }

    if (type === 'column') {
      const draggedColumnId = Number(draggableId);
      const draggedColumn = columnList.find(column => column.id === draggedColumnId);
      const newColumnList = Array.from(columnList);
      newColumnList.splice(source.index, 1);
      newColumnList.splice(destination.index, 0, draggedColumn);
      setColumnList(newColumnList);

      return;
    }

    if (type === 'card') {
      if (source.droppableId === destination.droppableId) {
        const nextColumn = Array.from(cardLists[source.droppableId]);
        const [draggedCard] = nextColumn.splice(source.index, 1);
        nextColumn.splice(destination.index, 0, draggedCard);

        setCardLists({
          ...cardLists,
          [source.droppableId]: nextColumn,
        });

        return;
      }

      const sourceColumnId = Number(source.droppableId);
      const destinationColumnId = Number(destination.droppableId);

      const newSourceColumn = Array.from(cardLists[sourceColumnId]);
      const newDestinationColumn = Array.from(cardLists[destinationColumnId]);

      const [draggedCard] = newSourceColumn.splice(source.index, 1);
      newDestinationColumn.splice(destination.index, 0, draggedCard);
      setCardLists({
        ...cardLists,
        [sourceColumnId]: newSourceColumn,
        [destinationColumnId]: newDestinationColumn,
      });
    }
  };

  return (
    <main className='flex mb:flex-col pc:flex-row pc:w-full bg-tp-gray_500'>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId='column' direction='horizontal' type='column'>
          {provided => (
            <section className='flex justify-between' ref={provided.innerRef} {...provided.droppableProps}>
              <div className='flex pc:flex-row mb:flex-col w-full'>
                {columnList &&
                  columnList.map((column, index) => (
                    <Column
                      key={column.id}
                      columnItem={column}
                      dashboardItem={columnList}
                      index={index}
                      onCardListChange={handleCardListChange}
                      changeCardList={cardLists}
                    />
                  ))}
              </div>
              {provided.placeholder}
            </section>
          )}
        </Droppable>
      </DragDropContext>
      <div className='mb:sticky mb:py-5 mb:bottom-0 min-w-[20rem]  pc:static pc:py-[4rem] px-5 bg-tp-gray_500'>
        <AddButton onClick={handleToggleModal}>{BUTTON.ADD_COLUMN}</AddButton>
        {isShowModal && (
          <CreateColumnModal
            handleModal={handleToggleModal}
            onChange={handleNewColumn}
            onClickSecondButton={handleCreateColumn}
            newColumnTitle={newColumnTitle}
          />
        )}
      </div>
    </main>
  );
};

export default Dashboard;
