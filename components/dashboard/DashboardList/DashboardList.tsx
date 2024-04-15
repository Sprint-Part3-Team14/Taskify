import AddButton from '../AddButton/AddButton';
import DashboardTitle from '../DashboardTitle/DashboardTitle';

import { CardProps } from '@/app/(dashboard)/dashboard/[id]/page';
import Card from '@/components/Card/Card';

//타입수정
const DashboardList = ({ cardDatas, title }: { title: string; cardDatas: CardProps[] }) => {
  return (
    <div className='flex flex-col border border-r-[1px] border-dotted  gap-4 w-96  min-h-screen p-5 '>
      <DashboardTitle title={title} />
      <AddButton />
      {cardDatas.map((card, index) => (
        <Card
          key={index}
          title={card.title}
          image={card.image}
          alt={card.title}
          tag={card.tag}
          date={card.date}
          user={card.user}
        />
      ))}
    </div>
  );
};

export default DashboardList;
