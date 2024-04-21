'use client';

import { useState } from 'react';
import Image from 'next/image';
import EditColumnModal from '@/components/Modal/EditColumnModal';
import { I_DashboardTitle } from '@/interface/Dashboard';
import NumberChip from '../../common/Chip/NumberChip';
import { ELLIPSE, SETTING } from '../constants';

import { setAccessToken, getAccessToken } from '@/utils/handleToken';

const ColumnTitle = ({ title, count, columnId }: I_DashboardTitle) => {
  const [isToggledEditColumnMdoal, setIsToggledEditColumnModal] = useState(false);
  const [editedValue, setEditedValue] = useState(title);
  const [inputValue, setInputValue] = useState(title);

  const handleEditColumnModal = () => {
    setIsToggledEditColumnModal(!isToggledEditColumnMdoal);
  };

  const handleChangeInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target.value;
    setEditedValue(target);
  };

  const handleChangeNewTitle = async () => {
    setAccessToken(
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTc2NCwidGVhbUlkIjoiNC0xNCIsImlhdCI6MTcxMzUzNDk0NCwiaXNzIjoic3AtdGFza2lmeSJ9.o5wp3rAonlrxZUKvldFhQWQdIsGksFE8A1qusxMXlpA'
    );
    try {
      const accessToken = getAccessToken();
      const response = await fetch(`https://sp-taskify-api.vercel.app/4-14/columns/${columnId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: editedValue,
        }),
      });

      if (response.ok) {
        handleEditColumnModal();
      }
    } catch (error) {
      console.error(error);
    }

    setInputValue(editedValue);
    handleEditColumnModal();
  };

  const handleModalClose = () => {
    setEditedValue(inputValue);
    handleEditColumnModal();
  };

  const hanldeColumnDelete = async () => {
    setAccessToken(
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTc2NCwidGVhbUlkIjoiNC0xNCIsImlhdCI6MTcxMzUzNDk0NCwiaXNzIjoic3AtdGFza2lmeSJ9.o5wp3rAonlrxZUKvldFhQWQdIsGksFE8A1qusxMXlpA'
    );
    try {
      const accessToken = getAccessToken();
      const response = await fetch(`https://sp-taskify-api.vercel.app/4-14/columns/${columnId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        handleEditColumnModal();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='flex justify-between items-center '>
      <div className='flex items-center gap-3  text-lg font-bold'>
        <Image src={ELLIPSE} alt='ellipse' width={8} height={8} />
        <div className='text-lg text-tp-black_700'>{inputValue}</div>
        <NumberChip count={count} />
      </div>
      <Image src={SETTING} alt='setting' width={24} height={24} onClick={handleEditColumnModal} />
      {isToggledEditColumnMdoal && (
        <EditColumnModal
          handleModal={handleModalClose}
          title='컬럼 관리'
          placeholder='이름을 입력해 주세요.'
          value={editedValue}
          onChange={handleChangeInputValue}
          onClickFirstButton={handleModalClose}
          onClickSecondButton={handleChangeNewTitle}
          onClick={hanldeColumnDelete}
        />
      )}
    </div>
  );
};

export default ColumnTitle;
