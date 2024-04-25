'use client';

import { useState } from 'react';

import Image from 'next/image';

import EditColumnModal from 'components/Modal/EditColumnModal';

import { getAccessToken } from 'utils/handleToken';

import NumberChip from '../../common/Chip/NumberChip';

import { EllipseIcon, SettingIcon } from 'constant/importImage';

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
      const isDuplicateTitle = checkDuplicate.some(column => column.title === newColumnTitle);

      if (isDuplicateTitle) {
        alert('중복된 컬럼 이름입니다');
        return;
      }

      const response = await fetch(`https://sp-taskify-api.vercel.app/4-14/columns/${columnId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: newColumnTitle,
        }),
      });

      if (response.ok) {
        handleToggledModal();
      }
    } catch (error) {
      console.error(error);
    }
    setInputValue(newColumnTitle);
  };

  const hanldeColumnDelete = async () => {
    if (window.confirm('컬럼의 모든 카드가 삭제됩니다')) {
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
          handleToggledModal();
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className='flex justify-between items-center '>
      <div className='flex items-center gap-3  text-lg font-bold'>
        <Image src={EllipseIcon} alt='ellipse' width={8} height={8} />
        <div className='text-lg text-tp-black_700'>{inputValue}</div>
        <NumberChip count={count} />
      </div>
      <Image src={SettingIcon} alt='setting' width={24} height={24} onClick={handleToggledModal} />
      {isToggledModal && (
        <EditColumnModal
          handleModal={handleToggledModal}
          title='컬럼 관리'
          placeholder='이름을 입력해 주세요.'
          value={newColumnTitle}
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
