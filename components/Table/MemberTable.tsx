import Image from 'next/image';
import { DEFAULT_PROFILE_IMAGE } from './constant';
import TableLayout from './TableLayout';

const members = [
  {
    profile_image: '/icon/crown.svg',
    name: '김유경',
  },
  {
    profile_image: '/icon/unsubscribe.svg',
    name: '한태욱',
  },
  {
    profile_image: '/icon/calendar_today.svg',
    name: '김규헌',
  },
];
// api에서 받아오는 데이터로 변경 예정

const MemberTable = () => {
  const MemberList = members.map(member => (
    <div className='flex justify-between border-solid border-b-[1px] py-4 last:border-none'>
      <div className='flex gap-3 items-center ml-7'>
        <div className='w-[2.375rem] h-[2.375rem] relative rounded-full overflow-hidden'>
          <Image fill src={member.profile_image ? member.profile_image : DEFAULT_PROFILE_IMAGE} alt='프로필 사진' />
        </div>
        <p className='text-base text-tp-black_700'>{member.name}</p>
      </div>
      <button type='button' className='border border-solid border-tp-gray_700 rounded-lg py-2 px-6 mr-7'>
        버튼대체
      </button>
    </div>
  ));

  return <TableLayout title='구성원' tableContent={MemberList} />;
};

export default MemberTable;
