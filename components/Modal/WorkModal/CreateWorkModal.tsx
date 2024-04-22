import { ChangeEvent, useState } from 'react';
import InputImageButton from '../Button/InputImageButton';
// import ModalDropdown from '../Input/ModalDropdown';
import ModalLayout from '../ModalLayout';
import PersonInChargeDropDown from './components/PersonInChargeDropDown';
import ProgressDropDown from './components/ProgressDropDown';
import Image from 'next/image';
import InputImageFile from '@/components/InputImage/InputImage';
import ModalButton from '../Button/ModalButton';
import TagChip from '@/components/common/Chip/TagChip';
import { setAccessToken, getAccessToken } from '@/utils/handleToken';

interface ModalPorps {
  dashboardMembers: Props[];
  totalCount?: number;
  handleModal: () => void;
  dashboardId: string;
  column: { id: string; title: string; cardIds: string[] };
  onClickFirstButton: () => void;
}

interface Props {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string;
  createdAt: string;
  updatedAt: string;
  isOwner: boolean;
  userId: number;
}

const CreateWorkModal = ({ handleModal, dashboardMembers, dashboardId, column, onClickFirstButton }: ModalPorps) => {
  const [selectImage, setSelectImage] = useState('');
  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const [tags, setTags] = useState<string[]>([]);
  const [tagsName, setTagsName] = useState('');
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');

  const handleTagName = (event: ChangeEvent<HTMLInputElement>) => {
    setTagsName(event.target.value);
  };

  //시간 분 선택할 수 있게 수정헤야 함
  const handleDate = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedDate = new Date(event.target.value);
    const currentTime = new Date();

    const selectedHours = ('0' + selectedDate.getHours()).slice(-2);
    const selectedMinutes = ('0' + selectedDate.getMinutes()).slice(-2);
    const currentHours = ('0' + currentTime.getHours()).slice(-2);
    const currentMinutes = ('0' + currentTime.getMinutes()).slice(-2);

    const hours = selectedDate.toDateString() === currentTime.toDateString() ? currentHours : selectedHours;
    const minutes = selectedDate.toDateString() === currentTime.toDateString() ? currentMinutes : selectedMinutes;

    const formattedDate =
      selectedDate.getFullYear() +
      '-' +
      ('0' + (selectedDate.getMonth() + 1)).slice(-2) +
      '-' +
      ('0' + selectedDate.getDate()).slice(-2) +
      ' ' +
      hours +
      ':' +
      minutes;

    setDate(formattedDate);
  };

  const handleCardTitle = event => {
    setTitle(event.target.value);
  };

  const handleCardDescrpition = event => {
    setDescription(event.target.value);
  };

  const createTagChip = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const newTag = tagsName.trim();
      if (newTag) {
        setTags(prevTags => [...prevTags, newTag]);
        setTagsName('');
      }
    }
  };

  //이미지 받아오는 부분 수정
  const handleCreateColumn = async () => {
    setAccessToken(
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTc2NCwidGVhbUlkIjoiNC0xNCIsImlhdCI6MTcxMzUzNDk0NCwiaXNzIjoic3AtdGFza2lmeSJ9.o5wp3rAonlrxZUKvldFhQWQdIsGksFE8A1qusxMXlpA'
    );

    try {
      const accessToken = getAccessToken();
      const response = await fetch(`https://sp-taskify-api.vercel.app/4-14/cards`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          assigneeUserId: 1764,
          dashboardId: Number(dashboardId),
          columnId: Number(column.id),
          title: title,
          description: description,
          dueDate: date,
          tags: tags,
          imageUrl:
            'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/taskify/task_image/14_20003_1713343503827.jpeg',
        }),
      });
      if (response.ok) {
        handleModal();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ModalLayout handleModal={handleModal} title='할 일 생성'>
      <form>
        <div className='flex gap-4 h-[6.25rem]'>
          <PersonInChargeDropDown members={dashboardMembers} />
        </div>
        <div className='flex flex-col gap-2.5 h-[7.5rem]'>
          <label className='flex gap-1 font-extrabold text-lg'>
            제목<span className='text-tp-violet_900 '>*</span>
          </label>
          <input
            type='text'
            placeholder='제목을 입력해 주세요'
            className='border border-solid border-tp-gray_700 p-4 rounded-lg outline-tp-violet_900 placeholder:text-sm'
            onChange={handleCardTitle}
          />
        </div>
        <div className='flex flex-col gap-2.5 h-[9rem]'>
          <label className='flex gap-1 font-extrabold text-lg'>
            설명<span className='text-tp-violet_900 '>*</span>
          </label>
          <div className='relative inline'>
            <textarea
              id='Comments'
              placeholder='설명을 입력해 주세요'
              className='text-sm w-[28.125rem] h-[6rem] border border-solid border-tp-gray_700 rounded-lg pt-4 px-4 pb-11 outline-tp-violet_900 relative placeholder:text-sm'
              onChange={handleCardDescrpition}
            />
          </div>
        </div>
        <div className='flex flex-col gap-2.5 h-[7.5rem]'>
          <label className='flex gap-1 font-extrabold text-lg '>마감일</label>
          <input
            type='date'
            date-placeholder='날짜를 입력해 주세요'
            required
            aria-required='true'
            className='border border-solid border-tp-gray_700 p-4 rounded-lg outline-tp-violet_900 before:content-[attr(data-placeholder) w-full]'
            onChange={handleDate}
          />
        </div>
        <div className='flex flex-col gap-2.5 h-[8rem]'>
          <div className='flex items-center'>
            <label className='flex w-10 gap-1 font-extrabold text-lg'>태그</label>
            <div className='flex items-center w-full p-4 rounded-lg gap-4 '>
              {tags.map((name, index) => (
                <TagChip key={index} name={name} size='large' />
              ))}
            </div>
          </div>
          <input
            type='text'
            placeholder='입력 후 Enter'
            className='w-full outline-tp-violet_900 placeholder:text-sm border border-solid border-tp-gray_700 p-4 rounded-lg gap-4'
            value={tagsName}
            onChange={handleTagName}
            onKeyDown={createTagChip}
          />
        </div>
        <InputImageFile size='small' />
        <ModalButton
          buttonType='double'
          firstButton='취소'
          secondButton='생성'
          onClickSecondButton={handleCreateColumn}
          onClickFirstButton={onClickFirstButton}
        />
      </form>
    </ModalLayout>
  );
};

export default CreateWorkModal;
