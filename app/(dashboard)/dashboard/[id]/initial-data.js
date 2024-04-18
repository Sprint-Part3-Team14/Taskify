import NumberChip from '@/components/Chip/NumberChip';
import TagChip from '@/components/Chip/TagChip';
import TEMP from '@/public/image/desktop.jpg';

export const initialData = {
  cards: {
    'card-1': {
      id: 'card-1',
      content: {
        title: 'card 1',
        image: TEMP,
        date: '2024-04-13',
        tag: [<TagChip name='백엔드' size='large' color='red' />],
        user: <NumberChip count={5} />,
      },
    },
    'card-2': {
      id: 'card-2',
      content: {
        title: 'card 2',
        date: '2024-04-14',

        tag: [
          <TagChip name='백엔드' size='large' color='red' />,
          <TagChip name='프론트 엔드' size='large' color='blue' />,
          <TagChip name='상' size='large' color='brown' />,
        ],
        user: <NumberChip count={8} />,
      },
    },
    'card-3': {
      id: 'card-3',
      content: {
        title: 'card 3',
        date: '2024-04-15',
        image: TEMP,
        tag: [
          <TagChip name='gpt가' size='large' color='red' />,
          <TagChip name='수정을' size='large' color='brown' />,
          <TagChip name='제대로' size='large' color='red' />,
          <TagChip name='안해줌' size='large' color='blue' />,
        ],
        user: <NumberChip count={4} />,
      },
    },
    'card-4': {
      id: 'card-4',
      content: {
        title: 'card 4',
        date: '2024-04-16',

        tag: [<TagChip name='백엔드' size='large' color='red' />],
        user: <NumberChip count={2} />,
      },
    },
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'To do',
      cardIds: ['card-1', 'card-2', 'card-3', 'card-4'],
    },
    'column-2': {
      id: 'column-2',
      title: 'In progress',
      cardIds: [],
    },
    'column-3': {
      id: 'column-3',
      title: 'Done',
      cardIds: [],
    },
  },

  columnOrder: ['column-1', 'column-2', 'column-3'],
};
