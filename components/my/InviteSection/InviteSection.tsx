import EmptyMessage from '../../mydashboard/EmptyMessage/EmptyMessage';
import InviteList from '../../mydashboard/InviteList/InviteList';
import SearchBar from '../SearchBar/SearchBar';

const InviteSection = () => {
  let count = 1;
  return (
    <div className='flex flex-col gap-6 w-full rounded-lg  bg-tp-white'>
      <div className='px-7 pt-8 text-2xl font-bold'>초대 받은 대시보드</div>
      {count > 0 ? (
        <EmptyMessage />
      ) : (
        <>
          <SearchBar />
          <div className='flex flex-col'>
            <div className='grid grid-cols-3 px-7 pb-1 text-tp-gray_800 text-base '>
              <div>이름</div>
              <div>초대자</div>
              <div>수락여부</div>
            </div>
            <InviteList />
          </div>
        </>
      )}
    </div>
  );
};

export default InviteSection;
