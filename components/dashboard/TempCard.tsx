import NumberChip from '../Chip/NumberChip';
import TagChip from '../Chip/TagChip';

import { I_Card } from '@/interface/Card';

interface Props {
  onChange: (newCard: I_Card[]) => void;
}

const TempCard = ({ onChange }: Props) => {
  const addCard: I_Card = {
    title: 'Task 1',
    date: '2024-04-13',
    tag: [<TagChip key={1} name='백엔드' size='large' color='red' />],
    user: <NumberChip count={5} />,
  };

  const handleAddCard = () => {
    onChange([addCard]);
  };

  return (
    <div>
      <div>카드생성</div>
      <button onClick={handleAddCard} className='bg-teal-300'>
        제출
      </button>
    </div>
  );
};

export default TempCard;
