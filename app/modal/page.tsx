'use client';

import ModalButton from '@components/Modal/Button/ModalButton';
import CreateColumnModal from '@components/Modal/CreateColumnModal';
import DeleteAllCardModal from '@components/Modal/DeleteAllCardModal';
import EditColumnModal from '@components/Modal/EditColumnModal';
import ModalDropdown from '@components/Modal/Input/ModalDropdown';
import InviteModal from '@components/Modal/InviteModal';
import WrongPasswordModal from '@components/Modal/WrongPasswordModal';

const modalTest = () => {
  return (
    <>
      <ModalDropdown title='상태' />
      <WrongPasswordModal handleModal={() => {}} />
    </>
  );
};

export default modalTest;
