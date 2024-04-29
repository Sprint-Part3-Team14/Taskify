import { MouseEvent, useEffect, useState } from 'react';

import InviteModal from '../Modal/InviteModal';
import PageNationButton from '../PageNation/PageNationButton';

import TableLayout from './TableLayout';

import { useHandleModal } from '@/hooks/useHandleModal';
import { usePageNation } from '@/hooks/usePageNation';
import { deletePostInvitation } from '@/utils/api/deletePostInvitation';
import { getInvitations } from '@/utils/api/getInvitations';

const InvitationHistory = ({ dashboardId }: { dashboardId: number }) => {
  const { isShowModal, handleToggleModal } = useHandleModal();
  const { pageNation, setPageNation, handleCurrentPage } = usePageNation();
  const [invitations, setInvitations] = useState(null);
  const showCount = 5;

  const handleDeleteInvitation = async (event: MouseEvent<HTMLButtonElement>) => {
    const invitationId = Number(event.currentTarget.id);
    try {
      await deletePostInvitation({ dashboardId: dashboardId, invitationId: invitationId });
      alert('대시보드 초대가 취소되었습니다.');
    } catch (error: any) {
      alert(error.message);
    }
  };

  const InvitationList = (
    <>
      <div>
        <div className='flex items-center text-sm text-tp-gray_800 ml-7 mt-3 h-[3.5rem]'>이메일</div>
      </div>
      {invitations &&
        invitations.map(invitation => (
          <div className='flex justify-between border-solid border-b-[1px] py-4 last:border-none'>
            <div className='flex gap-3 items-center'>
              <p className='text-base text-tp-black_700 ml-7 whitespace-nowrap text-ellipsis overflow-hidden pc:w-[26rem] tb:w-[23rem] w-[10rem]'>
                {invitation.invitee.email}
              </p>
            </div>
            <button
              onClick={handleDeleteInvitation}
              id={invitation.id}
              type='button'
              className='text-tp-violet_900 text-sm border border-solid border-tp-gray_700 rounded-lg mr-7 pc:py-2 pc:px-7 py-1.5 px-3'>
              취소
            </button>
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
      <button
        onClick={handleToggleModal}
        type='button'
        className='flex gap-2.5 items-center bg-tp-violet_900 text-white text-md px-3 py-2 rounded-md tb:static absolute top-[3.5rem] right-1'>
        <img src='/images/icon/plus.svg' alt='초대하기 아이콘' /> 초대
      </button>
      {/** 버튼 대체 예정 */}
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
      {isShowModal && <InviteModal dashboardId={dashboardId} handleModal={handleToggleModal} />}
      <TableLayout title='초대 내역' headerContent={invitationHeader} tableContent={InvitationList} />
    </>
  );
};

export default InvitationHistory;
