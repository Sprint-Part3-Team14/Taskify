import { StaticImageData } from 'next/image';

import AddButton from '@/components/dashboard/AddButton/AddButton';
import DashboardList from '@/components/dashboard/DashboardList/DashboardList';
import NumberChip from '@/components/dashboard/DashboardTitle/NumberChip'; // 임시 컴포넌트
import TEMP from '@/public/image/desktop.jpg'; //임시 이미지

// interface폳더로 옮길 dashboardProps

export interface CardProps {
  image?: StaticImageData;
  alt?: string;
  title: string;
  tag: React.ReactNode[];
  date: string;
  user: JSX.Element;
}

const Dashboard = () => {
  return (
    <section className='flex min-h-screen  '>
      <div className='flex min-h-full min-w-full w-full '>
        <div className='w-72 bg-slate-500'>사이드바 임시 공간...</div>
        <div className='w-full '>
          <div className=' h-20 bg-slate-400'>헤더 임시 공간 ...</div>
          <div className='flex '>
            {cardlists.map((list, index) => (
              <DashboardList key={index} title={list.title} cardDatas={list.cards} />
            ))}
            <div className='w-fit grow py-16 px-5'>
              <AddButton />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;

//목데이터

const cardlists = [
  {
    title: 'To 1',
    cards: [
      {
        title: 'Task 1',
        date: '2024-04-13',
        userCount: 5,
        image: TEMP,
        tag: [<NumberChip key={1} count={3} />, <NumberChip key={2} count={2} />, <NumberChip key={3} count={1} />],
        user: <NumberChip count={5} />,
      },
      {
        title: 'Task 2',
        date: '2024-04-14',
        userCount: 8,
        image: TEMP,
        tag: [<NumberChip key={1} count={4} />, <NumberChip key={2} count={1} />, <NumberChip key={3} count={3} />],
        user: <NumberChip count={8} />,
      },
      {
        title: 'Task 3',
        date: '2024-04-15',
        userCount: 4,
        image: TEMP,
        tag: [
          <NumberChip key={1} count={2} />,
          <NumberChip key={2} count={2} />,
          <NumberChip key={3} count={2} />,
          <NumberChip key={4} count={1} />,
        ],
        user: <NumberChip count={4} />,
      },
    ],
  },
  {
    title: 'To 2',
    cards: [
      {
        title: 'Task 4',
        date: '2024-04-16',
        userCount: 2,
        image: TEMP,
        tag: [<NumberChip key={1} count={1} />],
        user: <NumberChip count={2} />,
      },
      {
        title: 'Task 5',
        date: '2024-04-17',
        userCount: 6,
        image: TEMP,
        tag: [<NumberChip key={1} count={2} />, <NumberChip key={2} count={3} />],
        user: <NumberChip count={6} />,
      },
    ],
  },
  {
    title: 'To 3',
    cards: [
      {
        title: 'Task 6',
        date: '2024-04-18',
        userCount: 3,
        image: TEMP,
        tag: [<NumberChip key={1} count={3} />, <NumberChip key={2} count={1} />],
        user: <NumberChip count={3} />,
      },
      {
        title: 'Task 7',
        date: '2024-04-19',
        userCount: 7,
        image: TEMP,
        tag: [<NumberChip key={1} count={2} />, <NumberChip key={2} count={3} />, <NumberChip key={3} count={2} />],
        user: <NumberChip count={7} />,
      },
      {
        title: 'Task 8',
        date: '2024-04-20',
        userCount: 4,
        image: TEMP,
        tag: [<NumberChip key={1} count={3} />, <NumberChip key={2} count={1} />],
        user: <NumberChip count={4} />,
      },
      {
        title: 'Task 9',
        date: '2024-04-21',
        userCount: 5,
        image: TEMP,
        tag: [<NumberChip key={1} count={2} />, <NumberChip key={2} count={3} />],
        user: <NumberChip count={5} />,
      },
      {
        title: 'Task 10',
        date: '2024-04-22',
        userCount: 3,
        image: TEMP,
        tag: [<NumberChip key={1} count={3} />],
        user: <NumberChip count={3} />,
      },
    ],
  },
];
