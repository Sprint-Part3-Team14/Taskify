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
        <p className='text-base text-tp-black_700 ml-7'>{invitation.email}</p>
      </div>
      <button type='button' className='border border-solid border-tp-gray_700 rounded-lg py-2 px-6 mr-7'>
        버튼대체
      </button>
    </div>
  ));

  return <TableLayout title='초대 내역' tableContent={InvitationList} />;
};

export default InvitationHistory;
