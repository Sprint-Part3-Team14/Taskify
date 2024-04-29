import { I_Card } from '@/interface/Dashboard';

interface I_InformatinChip {
  cardItem: I_Card;
}

const InformationChip = ({ cardItem }: I_InformatinChip) => {
  return (
    <div className='absolute pc:top-[-80px] pc:left-[300px] mb:top-[50px] mb:left-[260px] flex flex-col border border-solid p-2 rounded-md mb:gap-5'>
      <div className='flex pc:flex-row mb:flex-col gap-3 '>
        <div className='font-semibold text-xs'>담당자</div>
        <div className='flex pc:flex-row mb:flex-col  gap-3'>
          <div>{cardItem.assignee.profileImageUrl}</div>
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
