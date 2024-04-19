'use client';

import { useState } from 'react';
import Image from 'next/image';
import EditColumnModal from '@/components/Modal/EditColumnModal';
import { I_DashboardTitle } from '@/interface/Dashboard';
import NumberChip from '../../common/Chip/NumberChip';
import { ELLIPSE, SETTING } from '../constants';

const DashboardTitle = ({ title, count }: I_DashboardTitle) => {
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

  const handleChangeNewTitle = () => {
    setInputValue(editedValue);
    handleEditColumnModal();
  };

  const handleModalClose = () => {
    setEditedValue(inputValue);
    handleEditColumnModal();
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
        />
      )}
    </div>
  );
};

export default DashboardTitle;
