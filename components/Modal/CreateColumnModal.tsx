'use clinet';

import { ChangeEvent, useState } from 'react';

import ModalButton from './Button/ModalButton';
import ModalLayout from './ModalLayout';
import { I_ModalToggle } from './ModalType';

import { createColumn } from '@/utils/api/createColumn';

interface I_CreateColumnModal extends I_ModalToggle {
  dashboardId: string;
  columnTitle: Array<string>;
}

const CreateColumnModal = ({ handleModal, dashboardId, columnTitle }: I_CreateColumnModal) => {
  const [newColumnTitle, setNewColumnTitle] = useState('');
  const handleNewColumn = (event: ChangeEvent<HTMLInputElement>) => {
    const title = event.target.value;
    setNewColumnTitle(title);
  };

  const handleCreateColumn = async () => {
    if (newColumnTitle.trim() === '') {
      alert('제목을 입력해주세요');
      return;
    }

    if (columnTitle.includes(newColumnTitle)) {
      alert('중복된 컬럼이 존재합니다.');
      return;
    }

    try {
      const {} = await createColumn({ title: newColumnTitle, dashboardId: Number(dashboardId) });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ModalLayout handleModal={handleModal} title='새 컬럼 생성'>
      <form className='flex flex-col'>
        <label className='text-lg'>이름</label>
        <input
          className='p-4 border border-solid mt-2.5 mb-7 border-tp-gray_700 rounded-lg w-[30.0rem]'
          type='text'
          placeholder='새로운 프로젝트'
          value={newColumnTitle}
          onChange={handleNewColumn}
        />
        <ModalButton
          onClickFirstButton={handleModal}
          onClickSecondButton={handleCreateColumn}
          buttonType='double'
          firstButton='취소'
          secondButton='생성'
        />
      </form>
    </ModalLayout>
  );
};

export default CreateColumnModal;
