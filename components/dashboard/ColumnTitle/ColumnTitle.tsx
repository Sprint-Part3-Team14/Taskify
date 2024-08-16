'use client';

import EditColumnModal from 'components/Modal/EditColumnModal';
import { EllipseIcon, SettingIcon } from 'constant/importImage';
import Image from 'next/image';
import { useState } from 'react';

import NumberChip from '../../common/Chip/NumberChip';
import { MESSAGE, PLACEHOLDER, TITLE } from '../constants';

import { I_Column } from '@/interface/Dashboard';
import { changeNewColumnTitle } from '@/utils/api/changeColumn';
import { deleteColumn } from '@/utils/api/deleteColumn';
import { getColumnList } from '@/utils/api/getColumnList';

const ColumnTitle = ({ title, changeCardList, columnId, dashboardId }) => {
  const [isToggledModal, setIsToggeldModal] = useState(false);

  const [newColumnTitle, setNewColumnTitle] = useState(title);
  const [inputValue, setInputValue] = useState(title);

  const cardCount = changeCardList[columnId] ? changeCardList[columnId].length : 0;

  const handleToggledModal = () => {
    setNewColumnTitle(inputValue);
    setIsToggeldModal(!isToggledModal);
  };

  const handleChangeInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const title = event.target.value;
    setNewColumnTitle(title);
  };

  const handleChangeNewTitle = async () => {
    try {
      const { data } = await getColumnList({ id: dashboardId });

      const isDuplicateTitle = data.some((column: I_Column) => column.title === newColumnTitle);

      if (isDuplicateTitle) {
        alert(MESSAGE.IS_DUPLICATE_COLUMN);
        return;
      }

      const result = await changeNewColumnTitle({
        column: columnId,
        changeTitle: {
          title: newColumnTitle,
        },
      });

      if (result) {
        handleToggledModal();
        setInputValue(newColumnTitle);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const hanldeColumnDelete = async () => {
    if (window.confirm(MESSAGE.IS_DELETE)) {
      try {
        await deleteColumn({ column: columnId });
      } catch (error) {
        console.error(error);
      }
    }
    handleToggledModal();
    window.location.reload();
  };

  return (
    <div className='flex justify-between items-center '>
      <div className='flex items-center gap-3  text-lg font-bold'>
        <Image src={EllipseIcon} alt='ellipse' width={8} height={8} />
        <div className='text-lg text-tp-black_700'>{inputValue}</div>
        <NumberChip count={cardCount} />
      </div>
      <button onClick={handleToggledModal}>
        <Image src={SettingIcon} alt='setting' width={24} height={24} />
      </button>
      {isToggledModal && (
        <EditColumnModal
          handleModal={handleToggledModal}
          title={TITLE.CHANGE_NAME}
          placeholder={PLACEHOLDER.INPUT_NAME}
          value={newColumnTitle}
          newColumnTitle={newColumnTitle}
          onChange={handleChangeInputValue}
          onClickFirstButton={handleToggledModal}
          onClickSecondButton={handleChangeNewTitle}
          onClick={hanldeColumnDelete}
        />
      )}
    </div>
  );
};

export default ColumnTitle;
