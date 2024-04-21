'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { DragDropContext, DropResult, Droppable } from '@hello-pangea/dnd';

import AddButton from 'components/common/button/add';
import Column from '@/components/Dashboard/Column/Column';
import CreateColumnModal from '@/components/Modal/CreateColumnModal';

import { setAccessToken, getAccessToken } from '@/utils/handleToken';
import { usePathname } from 'next/navigation';

const Dashboard = () => {
  const [dashboardItem, setDashboardItem] = useState({ cards: {}, columns: {}, columnOrder: [] });
  const [isToggledCreatedColumnModal, setIsToggledCreatedColumnModal] = useState(false);
  const [columnNewTitle, setColumnNewTitle] = useState('');
  const [columnIds, setColumnIds] = useState([]);

  const path = usePathname();
  const dashboardId = path.split('/')[2];

  const handleToggledCreateColumnModal = () => {
    setIsToggledCreatedColumnModal(!isToggledCreatedColumnModal);
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
        setColumnIds(columnOrder);
        setDashboardItem({ cards: {}, columns, columnOrder });
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
        const updatedColumns = {};

        for (const columnId of columnIds) {
          const response = await fetch(`https://sp-taskify-api.vercel.app/4-14/cards?size=10&columnId=${columnId}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });

          const responseData = await response.json();
          if (responseData.cards) {
            const updatedCardIds = responseData.cards.map(card => card.id);
            updatedColumns[columnId] = {
              ...dashboardItem.columns[columnId],
              cardIds: updatedCardIds,
            };

            const updatedCards = {};
            responseData.cards.forEach(card => {
              updatedCards[card.id] = {
                id: card.id,
                content: {
                  title: card.title,
                  image: card.imageUrl,
                  date: new Date(card.createdAt).toLocaleDateString('ko-KR'),
                  tag: card.tags,
                  user: card.assignee.profileImageUrl,
                },
              };
            });

            setDashboardItem(prevData => ({
              ...prevData,
              columns: {
                ...prevData.columns,
                ...updatedColumns,
              },
              cards: {
                ...prevData.cards,
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
    setAccessToken(
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTc2NCwidGVhbUlkIjoiNC0xNCIsImlhdCI6MTcxMzUzNDk0NCwiaXNzIjoic3AtdGFza2lmeSJ9.o5wp3rAonlrxZUKvldFhQWQdIsGksFE8A1qusxMXlpA'
    );

    if (columnNewTitle.trim() === '') {
      alert('값을 입력해 주세요');
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
      const isDuplicateTitle = checkDuplicate.some(column => column.title === columnNewTitle);

      if (isDuplicateTitle) {
        alert('중복된 컬럼 이름입니다');
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
        handleToggledCreateColumnModal();
        const newColumnData = await response.json();

        setDashboardItem(prevData => ({
          ...prevData,
          columns: {
            ...prevData.columns,
            [newColumnData.id]: {
              id: String(newColumnData.id),
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
        const newColumnOrder = Array.from(dashboardItem.columnOrder);
        newColumnOrder.splice(source.index, 1);
        newColumnOrder.splice(destination.index, 0, draggableId);

        const newData = {
          ...dashboardItem,
          columnOrder: newColumnOrder,
        };
        setDashboardItem(newData);
        return;
      }
      const startColumn = dashboardItem.columns[source.droppableId];
      const finishColumn = dashboardItem.columns[destination.droppableId];

      if (startColumn === finishColumn) {
        const newcardIds = Array.from(startColumn.cardIds);
        newcardIds.splice(source.index, 1);
        newcardIds.splice(destination.index, 0, draggableId);

        const newColumn = {
          ...startColumn,
          cardIds: newcardIds,
        };

        const newData = {
          ...dashboardItem,
          columns: {
            ...dashboardItem.columns,
            [newColumn.id]: newColumn,
          },
        };

        setDashboardItem(newData);
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
          ...dashboardItem,
          columns: {
            ...dashboardItem.columns,
            [newStartColumn.id]: newStartColumn,
            [newFinishColumn.id]: newFinishColumn,
          },
        };

        setDashboardItem(newData);
      }
    },
    [dashboardItem]
  );

  return (
    <>
      <div className='flex flex-row w-full bg-tp-gray_500'>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId='all-columns' direction='horizontal' type='column'>
            {provided => (
              <div className='flex w-full' {...provided.droppableProps} ref={provided.innerRef}>
                {dashboardItem.columnOrder.map((columnId, index) => {
                  const column = dashboardItem.columns[columnId];
                  const cards = column.cardIds.map(cardId => dashboardItem.cards[cardId]);
                  return (
                    <Column column={column} cards={cards} key={column.id} index={index} dashboardId={dashboardId} />
                  );
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
          onClickFirstButton={handleToggledCreateColumnModal}
          onClickSecondButton={handleCreateColumn}
          onChange={handleColumnNewTitle}
          handleModal={handleToggledCreateColumnModal}
        />
      )}
    </>
  );
};

export default Dashboard;
