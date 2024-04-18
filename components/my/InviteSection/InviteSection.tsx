import EmptyMessage from '../EmptyMessage/EmptyMessage';
import InviteList from '../InviteList/InviteList';
import SearchBar from '../SearchBar/SearchBar';

const InviteSection = () => {
  let count = 1;
  return (
    <div className='flex flex-col gap-6  rounded-lg bg-tp-white max-w-[63.875rem] min-x-[16.25rem]'>
      <div className='px-7 pt-8 mb:text-xl tb:text-2xl font-bold'>초대 받은 대시보드</div>
      {count > 1 ? (
        <EmptyMessage />
      ) : (
        <>
          <SearchBar />
          <div className='flex flex-col'>
            <div className='tb:grid grid-cols-3 px-7 pb-1 text-tp-gray_800 mb:text-sm tb:text-base mb:hidden '>
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
