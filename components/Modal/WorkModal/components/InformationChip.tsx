import { I_Card } from '@/interface/Dashboard';

interface I_InformatinChip {
  cardItem: I_Card;
}

const InformationChip = ({ cardItem }: I_InformatinChip) => {
  return (
    <div className='absolute pc:top-[-80px] pc:left-[300px] mb:top-[50px] mb:left-[260px] flex flex-col border border-solid p-2 rounded-md mb:gap-5 pc:gap-0.5'>
      <div className='flex items-center pc:flex-row mb:flex-col gap-3 '>
        <div className='font-semibold text-xs'>담당자</div>
        <div className='flex pc:flex-row mb:flex-col items-center  gap-3'>
          <img className='w-6 h-6 rounded-full' src={cardItem.assignee.profileImageUrl} alt='profile' />
          <div className='text-xs'>{cardItem.assignee.nickname}</div>
        </div>
      </div>
      <div className='flex pc:flex-row mb:flex-col  gap-3'>
        <div className='font-semibold text-xs'>마감일</div>
        <div className='text-xs'>{cardItem.dueDate}</div>
      </div>
    </div>
  );
};
export default InformationChip;
