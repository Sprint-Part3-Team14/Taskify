import { MouseEvent, useEffect, useState } from 'react';

import InviteModal from '../Modal/InviteModal';
import PageNationButton from '../PageNation/PageNationButton';
import Toast from '../common/Toast/Toast';
import SingleButton from '../common/button/SingleButton';

import TableLayout from './TableLayout';

import { useHandleModal } from '@/hooks/useHandleModal';
import { usePageNation } from '@/hooks/usePageNation';
import { useHandleToast } from '@/hooks/usehandleToast';
import { deletePostInvitation } from '@/utils/api/deletePostInvitation';
import { getInvitations } from '@/utils/api/getInvitations';

const InvitationHistory = ({ dashboardId }: { dashboardId: number }) => {
  const { isShowModal, handleToggleModal } = useHandleModal();
  const { pageNation, setPageNation, handleCurrentPage } = usePageNation();
  const [invitations, setInvitations] = useState(null);
  const cancelInvite = useHandleToast();
  const showCount = 5;

  const handleDeleteInvitation = async (event: MouseEvent<HTMLButtonElement>) => {
    const invitationId = Number(event.currentTarget.id);
    try {
      await deletePostInvitation({ dashboardId: dashboardId, invitationId: invitationId });
      cancelInvite.handleToggleToast();
      cancelInvite.handleToastMessage('대시보드 초대가 취소되었습니다.');
      cancelInvite.handleToastType('complete');
      handleLoadInvitations();
    } catch (error: any) {
      cancelInvite.handleToggleToast();
      cancelInvite.handleToastMessage(error.message);
      cancelInvite.handleToastType('error');
    }
  };

  const InvitationList = (
    <>
      <div className='text-sm text-tp-gray_800 mt-6 -mb-1 tb:-mb-2.5 pc:-mb-1 ml-7  pc:my-3 pc:h-auto h-10'>이메일</div>
      {invitations &&
        invitations.map(invitation => (
          <div className='flex justify-between border-solid border-b-[1px] pc:py-[1.125rem] last:border-none py-4'>
            <div className='flex gap-3 items-center'>
              <p className='text-base text-tp-black_700 ml-7 whitespace-nowrap text-ellipsis overflow-hidden pc:w-[28rem] tb:w-[23rem] w-[9rem]'>
                {invitation.invitee.email}
              </p>
            </div>
            <div className='pr-7'>
              <SingleButton type='button' colorType='white' id={invitation.id} onClick={handleDeleteInvitation}>
                취소
              </SingleButton>
            </div>
          </div>
        ))}
    </>
  );
  const invitationHeader = (
    <div className='flex gap-2.5 items-self relative'>
      <PageNationButton
        totalPage={pageNation.totalPage}
        currentPage={pageNation.currentPage}
        handleCurrentPage={handleCurrentPage}
      />
      <div className='tb:static absolute top-[3.2rem] right-0'>
        <SingleButton colorType='violet' type='button' onClick={handleToggleModal}>
          <div className='flex items-center gap-2.5 py-1'>
            <img src='/images/icon/plus.svg' alt='초대하기 아이콘' />
            <p>초대</p>
          </div>
        </SingleButton>
      </div>
    </div>
  );

  const handleLoadInvitations = async () => {
    try {
      const { invitations, totalCount } = await getInvitations({
        currentPage: pageNation.currentPage,
        showCount: showCount,
        dashboardId: dashboardId,
      });
      setPageNation(prevState => ({
        ...prevState,
        totalPage: Math.ceil(totalCount / showCount),
      }));
      setInvitations(invitations);
    } catch (error: any) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleLoadInvitations();
  }, [pageNation.currentPage]);

  return (
    <>
      {cancelInvite.isShowToast && (
        <Toast
          type={cancelInvite.type}
          message={cancelInvite.message}
          isToast={cancelInvite.isShowToast}
          setShowToast={cancelInvite.setIsShowToast}
          handleToast={cancelInvite.handleToggleToast}
        />
      )}
      <InviteModal
        dashboardId={dashboardId}
        handleModal={handleToggleModal}
        dataHandler={handleLoadInvitations}
        isShowModal={isShowModal}
      />
      <TableLayout title='초대 내역' headerContent={invitationHeader} tableContent={InvitationList} />
    </>
  );
};

export default InvitationHistory;
