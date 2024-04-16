'use client';

import ModalButton from '@components/Modal/Button/ModalButton';
import ModalDropdown from '@components/Modal/Input/ModalDropdown';

const modalTest = () => {
  return (
    <>
      <ModalDropdown title='상태' />
      <ModalButton buttonType='double' singleButton='취소' secondButton='생성' />
      <ModalButton buttonType='single' singleButton='입력' />
    </>
  );
};

export default modalTest;
