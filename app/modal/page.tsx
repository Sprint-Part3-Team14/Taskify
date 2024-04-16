'use client';
import WrongPasswordModal from '@/components/Modal/WrongPasswordModal';
import { MouseEvent } from 'react';
import { useState } from 'react';

const modalTest = () => {
  const [isShowModal, setIsShowModal] = useState(false);

  function handleModal(event: MouseEvent<HTMLElement>) {
    event.stopPropagation();
    isShowModal ? setIsShowModal(false) : setIsShowModal(true);
  }

  return (
    <>
      <button type='button' onClick={handleModal}>
        모달아 나와라 얍!
      </button>
      {isShowModal && <WrongPasswordModal handleModal={handleModal} />};
    </>
  );
};

export default modalTest;
