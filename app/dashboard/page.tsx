import ProgressChip from '@/components/Chip/ProgressChip';
import TagChip from '@/components/Chip/TagChip';

const Dashboard = () => {
  return (
    <main className='flex justify-center items-center min-h-screen gap-5 '>
      <TagChip color='blue' size='large'>
        파란색
      </TagChip>
      <TagChip color='red' size='large'>
        빨강
      </TagChip>
      <TagChip color='green' size='large'>
        녹
      </TagChip>
      <TagChip color='brown' size='large'>
        갈색
      </TagChip>
      <ProgressChip size='large' title='To Do' />
    </main>
  );
};

export default Dashboard;
