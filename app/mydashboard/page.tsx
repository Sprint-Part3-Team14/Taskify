'use client';
import ChangeDashBoardName from '@/components/ChangeDashBoardName/ChangeDashBoardName';
import InvitationHistory from '@/components/Table/InvitationHistory';
import MemberTable from '@/components/Table/MemberTable';
import { deleteDashBoard } from '@/utils/api/deleteDashBoard';

const MydashBoard = () => {
  {
    /** 해당 대시보드의 아이디를 여기서 뿌려주면 될 것으로 보임 아래는 임시 dashboardId, 절대로 5496 넣지 말 것 소중히 쌓아올린 대쉬보드 입니다 ㅠ*/
  }
  const dashboardId = 6312;

  const handleDeleteDashBoard = async () => {
    await deleteDashBoard({ dashboardId });
  };
  return (
    <div className='flex flex-col gap-3'>
      <ChangeDashBoardName />
      <MemberTable />
      <InvitationHistory />
      <button
        onClick={handleDeleteDashBoard}
        type='submit'
        className='py-5 px-[5.9375rem] rounded-lg text-tp-black_700 border border-solid border-tp-gray_700 active:bg-tp-gray_600 mt-7 self-start'>
        대시보드 삭제하기
      </button>
      {/** 버튼 컴포넌트 대체 예정 */}
    </div>
  );
};

export default MydashBoard;
