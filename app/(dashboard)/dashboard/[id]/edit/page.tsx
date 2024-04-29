'use client';

import { ArrowForwardIcon } from 'constant/importImage';
import Image from 'next/image';
import Link from 'next/link';

import ChangeDashBoardName from '@/components/ChangeDashBoardName/ChangeDashBoardName';
import InvitationHistory from '@/components/Table/InvitationHistory';
import MemberTable from '@/components/Table/MemberTable';
import Toast from '@/components/common/Toast/Toast';
import { useDashboardId } from '@/hooks/useDashboardId';
import { useHandleToast } from '@/hooks/usehandleToast';
import { deleteDashBoard } from '@/utils/api/deleteDashBoard';

const MydashBoard = () => {
  const { dashboardId } = useDashboardId();
  const { isShowToast, handleToggleToast, setIsShowToast, type, handleToastType, message, handleToastMessage } =
    useHandleToast();

  const handleDeleteDashBoard = async () => {
    try {
      await deleteDashBoard({ dashboardId });
      handleToggleToast();
      handleToastType('complete');
      handleToastMessage('대시보드가 삭제되었습니다.');
    } catch (error: any) {
      handleToggleToast();
      handleToastType('error');
      handleToastMessage(error.message);
    }
  };
  return (
    <>
      {isShowToast && (
        <Toast
          type={type}
          message={message}
          handleToast={handleToggleToast}
          isToast={isShowToast}
          setShowToast={setIsShowToast}
        />
      )}
      <div className='ml-4 mt-5 pb-7'>
        <Link href={`/dashboard/${dashboardId}`}>
          <button type='button' className='text-base text-tp-black_700 flex gap-1.5 items-center mb-6'>
            <div className='w-5 h-5 relative'>
              <Image fill src={ArrowForwardIcon} alt='뒤로 가기 버튼' />
            </div>
            돌아가기
          </button>
        </Link>
        <div className='flex flex-col gap-3'>
          <ChangeDashBoardName dashboardId={dashboardId} />
          <MemberTable dashboardId={dashboardId} />
          <InvitationHistory dashboardId={dashboardId} />
          <button
            onClick={handleDeleteDashBoard}
            type='submit'
            className='py-5 px-[5.9375rem] rounded-lg text-tp-black_700 border border-solid border-tp-gray_700 active:bg-tp-gray_600 mt-7 self-start'>
            대시보드 삭제하기
          </button>
        </div>
      </div>
    </>
  );
};

export default MydashBoard;
