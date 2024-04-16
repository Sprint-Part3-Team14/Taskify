'use client';

import ModalDoubleButton from '@/components/Modal/ModalButton';
import ModalDropdown from '@/components/Modal/input/ModalDropdown';

const modalTest = () => {
  return (
    <>
      <ModalDropdown title='상태' />
      <ModalDoubleButton leftButton='취소' rightButton='생성' />
    </>
  );
};

export default modalTest;
