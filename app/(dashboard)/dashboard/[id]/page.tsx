import NumberChip from '@/components/Chip/NumberChip';
import TagChip from '@/components/Chip/TagChip';
import AddButton from '@/components/dashboard/AddButton/AddButton';
import DashboardList from '@/components/dashboard/DashboardList/DashboardList';
import TEMP from '@/public/image/desktop.jpg'; //임시 이미지

const Dashboard = () => {
  return (
    <div className='flex '>
      {cardlists.map(({ title, cards }, index) => (
        <DashboardList key={index} title={title} cardDatas={cards} />
      ))}
      <div className='w-fit grow py-16 px-5'>
        <AddButton>새로운 컬럼 추가하기</AddButton>
      </div>
    </div>
  );
};

export default Dashboard;

//목데이터

const cardlists = [
  {
    title: 'To DO 1',

    cards: [
      {
        title: 'Task 1',
        date: '2024-04-13',
        userCount: 5,
        image: TEMP,
        tag: [<TagChip key={1} name='백엔드' size='large' color='red' />],
        user: <NumberChip count={5} />,
      },
      {
        title: 'Task 2',
        date: '2024-04-14',
        userCount: 8,
        image: TEMP,
        tag: [
          <TagChip key={1} name='백엔드' size='large' color='red' />,
          <TagChip key={1} name='프론트 엔드' size='large' color='blue' />,
          <TagChip key={1} name='상' size='large' color='brown' />,
        ],
        user: <NumberChip count={8} />,
      },
      {
        title: 'Task 3',
        date: '2024-04-15',
        userCount: 4,
        image: TEMP,
        tag: [
          <TagChip key={1} name='gpt가' size='large' color='red' />,
          <TagChip key={1} name='수정을' size='large' color='brown' />,
          <TagChip key={1} name='제대로' size='large' color='red' />,
          <TagChip key={1} name='안해줌' size='large' color='blue' />,
        ],
        user: <NumberChip count={4} />,
      },
    ],
  },
  {
    title: 'PROGRESSSSSSS 2',

    cards: [
      {
        title: 'Task 4',
        date: '2024-04-16',
        userCount: 2,
        image: TEMP,
        tag: [<TagChip key={1} name='백엔드' size='large' color='red' />],
        user: <NumberChip count={2} />,
      },
      {
        title: 'Task 5',
        date: '2024-04-17',
        userCount: 6,
        image: TEMP,
        tag: [<TagChip key={1} name='백엔드' size='large' color='red' />],
        user: <NumberChip count={6} />,
      },
    ],
  },
  {
    title: 'Done 3',

    cards: [
      {
        title: 'Task 6',
        date: '2024-04-18',
        userCount: 3,
        image: TEMP,
        tag: [
          <TagChip key={1} name='gpt가' size='large' color='red' />,
          <TagChip key={1} name='수정을' size='large' color='brown' />,
          <TagChip key={1} name='제대로' size='large' color='red' />,
          <TagChip key={1} name='안해줌' size='large' color='blue' />,
        ],
        user: <NumberChip count={3} />,
      },
      {
        title: 'Task 7',
        date: '2024-04-19',
        userCount: 7,
        image: TEMP,
        tag: [<TagChip key={1} name='백엔드' size='large' color='red' />],
        user: <NumberChip count={7} />,
      },
      {
        title: 'Task 8',
        date: '2024-04-20',
        userCount: 4,
        image: TEMP,
        tag: [<TagChip key={1} name='백엔드' size='large' color='red' />],
        user: <NumberChip count={4} />,
      },
      {
        title: 'Task 9',
        date: '2024-04-21',
        userCount: 5,
        image: TEMP,
        tag: [<TagChip key={1} name='백엔드' size='large' color='red' />],
        user: <NumberChip count={5} />,
      },
      {
        title: 'Task 10',
        date: '2024-04-22',
        userCount: 3,
        image: TEMP,
        tag: [<TagChip key={1} name='백엔드' size='large' color='red' />],
        user: <NumberChip count={3} />,
      },
      {
        title: 'Task 10',
        date: '2024-04-22',
        userCount: 3,
        image: TEMP,
        tag: [<TagChip key={1} name='백엔드' size='large' color='red' />],
        user: <NumberChip count={3} />,
      },
      {
        title: 'Task 10',
        date: '2024-04-22',
        userCount: 3,
        image: TEMP,
        tag: [<TagChip key={1} name='백엔드' size='large' color='red' />],
        user: <NumberChip count={3} />,
      },
      {
        title: 'Task 10',
        date: '2024-04-22',
        userCount: 3,
        image: TEMP,
        tag: [<TagChip key={1} name='백엔드' size='large' color='red' />],
        user: <NumberChip count={3} />,
      },
      {
        title: 'Task 10',
        date: '2024-04-22',
        userCount: 3,
        image: TEMP,
        tag: [<TagChip key={1} name='백엔드' size='large' color='red' />],
        user: <NumberChip count={3} />,
      },
      {
        title: 'Task 10',
        date: '2024-04-22',
        userCount: 3,
        image: TEMP,
        tag: [<TagChip key={1} name='백엔드' size='large' color='red' />],
        user: <NumberChip count={3} />,
      },
      {
        title: 'Task 10',
        date: '2024-04-22',
        userCount: 3,
        image: TEMP,
        tag: [<TagChip key={1} name='백엔드' size='large' color='red' />],
        user: <NumberChip count={3} />,
      },
      {
        title: 'Task 10',
        date: '2024-04-22',
        userCount: 3,
        image: TEMP,
        tag: [<TagChip key={1} name='백엔드' size='large' color='red' />],
        user: <NumberChip count={3} />,
      },
      {
        title: 'Task 10',
        date: '2024-04-22',
        userCount: 3,
        image: TEMP,
        tag: [<TagChip key={1} name='백엔드' size='large' color='red' />],
        user: <NumberChip count={3} />,
      },
      {
        title: 'Task 10',
        date: '2024-04-22',
        userCount: 3,
        image: TEMP,
        tag: [<TagChip key={1} name='백엔드' size='large' color='red' />],
        user: <NumberChip count={3} />,
      },
      {
        title: 'Task 10',
        date: '2024-04-22',
        userCount: 3,
        image: TEMP,
        tag: [<TagChip key={1} name='백엔드' size='large' color='red' />],
        user: <NumberChip count={3} />,
      },
      {
        title: 'Task 10',
        date: '2024-04-22',
        userCount: 3,
        image: TEMP,
        tag: [<TagChip key={1} name='백엔드' size='large' color='red' />],
        user: <NumberChip count={3} />,
      },
      {
        title: 'Task 10',
        date: '2024-04-22',
        userCount: 3,
        image: TEMP,
        tag: [<TagChip key={1} name='백엔드' size='large' color='red' />],
        user: <NumberChip count={3} />,
      },
      {
        title: 'Task 10',
        date: '2024-04-22',
        userCount: 3,
        image: TEMP,
        tag: [<TagChip key={1} name='백엔드' size='large' color='red' />],
        user: <NumberChip count={3} />,
      },
      {
        title: 'Task 10',
        date: '2024-04-22',
        userCount: 3,
        image: TEMP,
        tag: [<TagChip key={1} name='백엔드' size='large' color='red' />],
        user: <NumberChip count={3} />,
      },
      {
        title: 'Task 10',
        date: '2024-04-22',
        userCount: 3,
        image: TEMP,
        tag: [<TagChip key={1} name='백엔드' size='large' color='red' />],
        user: <NumberChip count={3} />,
      },
      {
        title: 'Task 10',
        date: '2024-04-22',
        userCount: 3,
        image: TEMP,
        tag: [<TagChip key={1} name='백엔드' size='large' color='red' />],
        user: <NumberChip count={3} />,
      },
      {
        title: 'Task 10',
        date: '2024-04-22',
        userCount: 3,
        image: TEMP,
        tag: [<TagChip key={1} name='백엔드' size='large' color='red' />],
        user: <NumberChip count={3} />,
      },
      {
        title: 'Task 10',
        date: '2024-04-22',
        userCount: 3,
        image: TEMP,
        tag: [<TagChip key={1} name='백엔드' size='large' color='red' />],
        user: <NumberChip count={3} />,
      },
      {
        title: 'Task 10',
        date: '2024-04-22',
        userCount: 3,
        image: TEMP,
        tag: [<TagChip key={1} name='백엔드' size='large' color='red' />],
        user: <NumberChip count={3} />,
      },
      {
        title: 'Task 10',
        date: '2024-04-22',
        userCount: 3,
        image: TEMP,
        tag: [<TagChip key={1} name='백엔드' size='large' color='red' />],
        user: <NumberChip count={3} />,
      },
      {
        title: 'Task 10',
        date: '2024-04-22',
        userCount: 3,
        image: TEMP,
        tag: [<TagChip key={1} name='백엔드' size='large' color='red' />],
        user: <NumberChip count={3} />,
      },
      {
        title: 'Task 10',
        date: '2024-04-22',
        userCount: 3,
        image: TEMP,
        tag: [<TagChip key={1} name='백엔드' size='large' color='red' />],
        user: <NumberChip count={3} />,
      },
      {
        title: 'Task 10',
        date: '2024-04-22',
        userCount: 3,
        image: TEMP,
        tag: [<TagChip key={1} name='백엔드' size='large' color='red' />],
        user: <NumberChip count={3} />,
      },
    ],
  },
];
