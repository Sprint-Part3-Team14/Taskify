import ChangeDashBoardName from '@components/ChangeDashBoardName/ChangeDashBoardName';
import InvitationHistory from '@components/Table/InvitationHistory';
import MemberTable from '@components/Table/MemberTable';

const MydashBoard = () => {
  return (
    <div className='flex flex-col gap-3'>
      <ChangeDashBoardName />
      <MemberTable />
      <InvitationHistory />
      <button
        type='submit'
        className='py-5 px-[5.9375rem] rounded-lg text-tp-black_700 border border-solid border-tp-gray_700 active:bg-tp-gray_600 mt-7 self-start'>
        대시보드 삭제하기
      </button>
      {/** 버튼 컴포넌트 대체 예정 */}
    </div>
  );
};

export default MydashBoard;
