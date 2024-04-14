import ProgressChip from '@/components/Chip/ProgressChip';
import TagChip from '@/components/Chip/TagChip';

const Dashboard = () => {
  return (
    <main className='flex justify-center items-center min-h-screen gap-5 '>
      <TagChip>백엔드</TagChip>
      <TagChip>프론트엔드</TagChip>
      <TagChip>색이 자동으로 변해야 한다?</TagChip>
    </main>
  );
};

export default Dashboard;
