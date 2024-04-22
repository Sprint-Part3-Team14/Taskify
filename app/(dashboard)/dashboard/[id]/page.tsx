'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { DragDropContext, DropResult, Droppable } from '@hello-pangea/dnd';

import AddButton from 'components/common/button/add';
import Column from 'components/Dashboard/Column/Column';
import CreateColumnModal from 'components/Modal/CreateColumnModal';

import { setAccessToken, getAccessToken } from 'utils/handleToken';

import { TEMP_TOKEN, ERROR } from '../constants';
import { I_ColumnOrder_Cards, I_ColumnOrder_Columns } from '@/interface/Dashboard';

const Dashboard = () => {
  const [dragDropItem, setDragDropItem] = useState({ cards: {}, columns: {}, columnOrder: [] });
  const [isToggledModal, setIsToggledModal] = useState(false);
  const [columnNewTitle, setColumnNewTitle] = useState('');
  const [columnIds, setColumnIds] = useState([]);

  const path = usePathname();
  const dashboardId = path.split('/')[2];

  const handleToggledModal = () => {
    setIsToggledModal(!isToggledModal);
  };

  const handleColumnNewTitle = (title: string) => {
    setColumnNewTitle(title);
  };

  useEffect(() => {
    setAccessToken(TEMP_TOKEN);
    const getDashboardColumnList = async () => {
      try {
        const accessToken = getAccessToken();
        const response = await fetch(`https://sp-taskify-api.vercel.app/4-14/columns?dashboardId=${dashboardId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const responseData = await response.json();
        console.log(responseData);
        const columns = {};
        const columnOrder = responseData.data.map((column: I_ColumnOrder_Columns) => {
          columns[String(column.id)] = {
            id: String(column.id),
            title: column.title,
            cardIds: [],
          };
          return String(column.id);
        });
        setColumnIds(columnOrder);
        setDragDropItem({ cards: {}, columns, columnOrder });
      } catch (error) {
        console.error(error);
      }
    };
    getDashboardColumnList();
  }, []);

  useEffect(() => {
    const getDashboardCardList = async () => {
      try {
        const accessToken = getAccessToken();
        const updateColumnsCards = {};

        for (const columnId of columnIds) {
          const response = await fetch(`https://sp-taskify-api.vercel.app/4-14/cards?size=10&columnId=${columnId}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });

          const responseData = await response.json();
          if (responseData.cards) {
            const updatedCardIds = responseData.cards.map((card: I_ColumnOrder_Cards) => card.id);
            updateColumnsCards[columnId] = {
              ...dragDropItem.columns[columnId],
              cardIds: updatedCardIds,
            };

            const updatedCards = {};
            responseData.cards.forEach((card: I_ColumnOrder_Cards) => {
              updatedCards[card.id] = {
                id: card.id,
                content: {
                  title: card.title,
                  image: card.imageUrl,
                  dsecription: card.description,
                  date: new Date(card.createdAt).toLocaleDateString('ko-KR'),
                  tag: card.tags,
                  user: card.assignee.profileImageUrl,
                },
              };
            });

            setDragDropItem(prevList => ({
              ...prevList,
              columns: {
                ...prevList.columns,
                ...updateColumnsCards,
              },
              cards: {
                ...prevList.cards,
                ...updatedCards,
              },
            }));
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    getDashboardCardList();
  }, [columnIds]);

  const handleCreateColumn = async () => {
    setAccessToken(TEMP_TOKEN);

    if (columnNewTitle.trim() === '') {
      alert(ERROR.NOTITLE);
      return;
    }

    try {
      const accessToken = getAccessToken();
      const checkDuplicateResponse = await fetch(
        `https://sp-taskify-api.vercel.app/4-14/columns?dashboardId=${dashboardId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const responseData = await checkDuplicateResponse.json();
      const checkDuplicate = responseData.data;
      const isDuplicateTitle = checkDuplicate.some((column: I_ColumnOrder_Columns) => column.title === columnNewTitle);

      if (isDuplicateTitle) {
        alert(ERROR.DUPLICATE);
        return;
      }

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
        handleToggledModal();
        const newColumnData = await response.json();

        setDragDropItem(prevList => ({
          ...prevList,
          columns: {
            ...prevList.columns,
            [newColumnData.id]: {
              id: String(newColumnData.id),
              title: newColumnData.title,
              cardIds: [],
            },
          },
          columnOrder: [...prevList.columnOrder, newColumnData.id],
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
        const newColumnOrder = Array.from(dragDropItem.columnOrder);
        newColumnOrder.splice(source.index, 1);
        newColumnOrder.splice(destination.index, 0, draggableId);

        const newData = {
          ...dragDropItem,
          columnOrder: newColumnOrder,
        };
        setDragDropItem(newData);
        return;
      }
      const startColumn = dragDropItem.columns[source.droppableId];
      const finishColumn = dragDropItem.columns[destination.droppableId];

      if (startColumn === finishColumn) {
        const newcardIds = Array.from(startColumn.cardIds);
        newcardIds.splice(source.index, 1);
        newcardIds.splice(destination.index, 0, draggableId);

        const newColumn = {
          ...startColumn,
          cardIds: newcardIds,
        };

        const newData = {
          ...dragDropItem,
          columns: {
            ...dragDropItem.columns,
            [newColumn.id]: newColumn,
          },
        };

        setDragDropItem(newData);
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
          ...dragDropItem,
          columns: {
            ...dragDropItem.columns,
            [newStartColumn.id]: newStartColumn,
            [newFinishColumn.id]: newFinishColumn,
          },
        };

        setDragDropItem(newData);
      }
    },
    [dragDropItem]
  );

  return (
    <>
      <div className='flex flex-row w-full bg-tp-gray_500'>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId='all-columns' direction='horizontal' type='column'>
            {provided => (
              <div className='flex w-full' {...provided.droppableProps} ref={provided.innerRef}>
                {dragDropItem.columnOrder.map((columnId, index) => {
                  const column = dragDropItem.columns[columnId];
                  const cards = column.cardIds.map((cardId: number) => dragDropItem.cards[cardId]);
                  return (
                    <Column
                      column={column}
                      cards={cards}
                      key={column.id}
                      index={index}
                      dashboardId={dashboardId}
                      dragDropItem={dragDropItem}
                    />
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <div className='w-fit grow py-16 px-5'>
          <AddButton onClick={handleToggledModal}>새로운 컬럼 추가하기</AddButton>
        </div>
      </div>
      {isToggledModal && (
        <CreateColumnModal
          onClickFirstButton={handleToggledModal}
          onClickSecondButton={handleCreateColumn}
          onChange={handleColumnNewTitle}
          handleModal={handleToggledModal}
        />
      )}
    </>
  );
};

export default Dashboard;
