'use client';

import ModalButton from '@components/Modal/Button/ModalButton';
import CreateColumnModal from '@components/Modal/CreateColumnModal';
import CreateWorkModal from '@components/WorkModal/CreateWorkModal';
import DeleteAllCardModal from '@components/Modal/DeleteAllCardModal';
import EditColumnModal from '@components/Modal/EditColumnModal';
import ModalDropdown from '@components/Modal/Input/ModalDropdown';
import ModalTextarea from '@components/Modal/Input/ModalTextarea';
import InviteModal from '@components/Modal/InviteModal';
import WrongPasswordModal from '@components/Modal/WrongPasswordModal';

const modalTest = () => {
  return (
    <>
      <ModalDropdown title='상태' />
      <ModalButton buttonType='single' singleButton='입력' />
      <ModalTextarea />
      <CreateWorkModal handleModal={() => {}} />
    </>
  );
};

export default modalTest;
