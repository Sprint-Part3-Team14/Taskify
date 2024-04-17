'use client';
import ModalButton from '@components/Modal/Button/ModalButton';
import ModalDropdown from '@components/Modal/Input/ModalDropdown';
import ModalTextarea from '@components/Modal/Input/ModalTextarea';
import InvitationHistory from '@components/Table/InvitationHistory';
import MemberTable from '@components/Table/MemberTable';

const modalTest = () => {
  return (
    <div className='bg-tp-black_700 min-h-screen flex flex-col gap-4'>
      <ModalDropdown title='상태' />
      <ModalButton buttonType='single' singleButton='입력' />
      <ModalTextarea />
      <MemberTable />
      <InvitationHistory />
    </div>
  );
};

export default modalTest;
