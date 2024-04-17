import { usePathname } from 'next/navigation';

import AddButton from '../AddButton/AddButton';
import DashboardTitle from '../DashboardTitle/DashboardTitle';
import TempCard from '../TempCard';

import Card from '@/components/Card/Card';
import { I_CardList } from '@/interface/Dashboard';

const DashboardList = ({ cardDatas, title }: I_CardList) => {
  const path = usePathname();
  const dashboardId = path.split('/')[2];

  console.log(dashboardId);

  return (
    <div className='flex flex-col border border-r-[1px] border-dotted  gap-4 w-96  min-h-screen p-5 '>
      <DashboardTitle title={title} count={cardDatas?.length || 0} />
      <AddButton />
      <TempCard />
      {cardDatas?.map((card, index) => (
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
