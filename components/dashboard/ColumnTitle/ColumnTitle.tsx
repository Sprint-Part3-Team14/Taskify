'use client';

import { useState } from 'react';
import Image from 'next/image';

import EditColumnModal from 'components/Modal/EditColumnModal';
import NumberChip from '../../common/Chip/NumberChip';
import { EllipseIcon, SettingIcon } from 'constant/importImage';

import { getColumnList } from '@/utils/api/getColumnList';
import { I_Column } from '@/interface/Dashboard';
import { changeNewColumnTitle } from '@/utils/api/changeCard';
import { deleteColumn } from '@/utils/api/deleteColumn';

const ColumnTitle = ({ title, count, columnId, dashboardId }) => {
  const [isToggledModal, setIsToggeldModal] = useState(false);
  const [newColumnTitle, setNewColumnTitle] = useState(title);
  const [inputValue, setInputValue] = useState(title);

  const handleToggledModal = () => {
    setNewColumnTitle(inputValue);
    setIsToggeldModal(!isToggledModal);
  };

  const handleChangeInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const title = event.target.value;
    setNewColumnTitle(title);
  };

  const handleChangeNewTitle = async () => {
    if (newColumnTitle.trim() === '') {
      alert('값을 입력해주세요.');
      return;
    }

    try {
      const { data } = await getColumnList({ id: dashboardId });

      const isDuplicateTitle = data.some((column: I_Column) => column.title === newColumnTitle);

      if (isDuplicateTitle) {
        alert('중복된 컬럼 이름입니다');
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
    if (window.confirm('컬럼의 모든 카드가 삭제됩니다')) {
      try {
        await deleteColumn({ column: columnId });
      } catch (error) {
        console.error(error);
      }
    }
    handleToggledModal();
  };

  return (
    <div className='flex justify-between items-center '>
      <div className='flex items-center gap-3  text-lg font-bold'>
        <Image src={EllipseIcon} alt='ellipse' width={8} height={8} />
        <div className='text-lg text-tp-black_700'>{inputValue}</div>
        <NumberChip count={count} />
      </div>
      <button onClick={handleToggledModal}>
        <Image src={SettingIcon} alt='setting' width={24} height={24} />
      </button>
      {isToggledModal && (
        <EditColumnModal
          handleModal={handleToggledModal}
          title='컬럼 관리'
          placeholder='이름을 입력해 주세요.'
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
