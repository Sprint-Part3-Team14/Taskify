import TableLayout from './TableLayout';

const mockData = [
  {
    email: 'test@codeit.com',
  },
  {
    email: 'sksms2104@naver.com',
  },
  {
    email: 'yukyoung@naver.com',
  },
];
// api에서 데이터를 받아와서 띄워줘야 함

const InvitationHistory = () => {
  const InvitationList = mockData.map(invitation => (
    <div className='flex justify-between border-solid border-b-[1px] py-4 last:border-none'>
      <div className='flex gap-3 items-center'>
        <p className='text-base text-tp-black_700 ml-7 whitespace-nowrap text-ellipsis overflow-hidden pc:w-[26rem] tb:w-[23rem] mb:w-[10rem]'>
          {invitation.email}
        </p>
      </div>
      <button
        type='button'
        className='text-tp-violet_900 text-sm border border-solid border-tp-gray_700 rounded-lg mr-7 pc:py-2 pc:px-7 mb:py-1.5 mb:px-3'>
        취소
      </button>
    </div>
  ));

  return <TableLayout title='초대 내역' tableContent={InvitationList} />;
};

export default InvitationHistory;
