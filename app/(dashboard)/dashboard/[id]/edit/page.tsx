'use client';
import ChangeDashBoardName from '@/components/ChangeDashBoardName/ChangeDashBoardName';
import InvitationHistory from '@/components/Table/InvitationHistory';
import MemberTable from '@/components/Table/MemberTable';
import { deleteDashBoard } from '@/utils/api/deleteDashBoard';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowForwardIcon } from 'constant/importImage';

const MydashBoard = () => {
  const dashboardId = 6778;

  const handleDeleteDashBoard = async () => {
    try {
      await deleteDashBoard({ dashboardId });
    } catch (error: any) {
      console.error(error);
    }
  };
  return (
    <>
      <Link href='/boardid'>
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
        {/** 버튼 컴포넌트 대체 예정 */}
      </div>
    </>
  );
};

export default MydashBoard;
