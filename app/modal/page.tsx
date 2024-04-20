'use client';

import ModalDropdown from '@/components/Modal/input/ModalDropdown';
import CreateWorkModal from '@/components/Modal/WorkModal/CreateWorkModal';
import ModalTextarea from '@/components/Modal/input/ModalTextarea';
import InvitationHistory from '@/components/Table/InvitationHistory';
import MemberTable from '@/components/Table/MemberTable';

const modalTest = () => {
  return (
    <div className='bg-tp-black_700 min-h-screen flex flex-col gap-4'>
      <ModalDropdown title='상태' />
      <ModalTextarea />
      <MemberTable />
      <InvitationHistory />
      <CreateWorkModal handleModal={() => {}} />
    </div>
  );
};

export default modalTest;
