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
import { I_Card } from '@/interface/Dashboard';
import { TEMP_TOKEN } from '@/app/(dashboard)/dashboard/constants';

interface I_ModalCard extends I_Card {
  handleModal: () => void;
  onClickFirstButton: () => void;
}

const EditCardModal = ({
  handleModal,
  onClickFirstButton,
  members,
  dragDropItem,
  columnItem,
  cardItem,
}: I_ModalCard) => {
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

  const [title, setTitle] = useState(cardItem.content.title);
  const [descrpition, setDiscription] = useState(cardItem.content.dsecription);
  const [date, setDate] = useState(cardItem.content.date);
  const [tags, setTags] = useState<string[]>(cardItem.content.tag);
  const [tagsName, setTagsName] = useState('');
  const [image, setImage] = useState(cardItem.content.image);

  const handletitle = (event: ChangeEvent<HTMLInputElement>) => {
    const title = event.target.value;
    setTitle(title);
  };

  const handledescrpition = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const description = event.target.value;
    setDiscription(description);
  };

  const handleTagName = (event: ChangeEvent<HTMLInputElement>) => {
    const tagName = event.target.value;
    setTagsName(tagName);
  };

  const removeTag = (tag: string) => {
    setTags(prevTags => prevTags.filter(item => item !== tag));
  };

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

  const handleEditCard = async () => {
    setAccessToken(TEMP_TOKEN);

    try {
      const accessToken = getAccessToken();
      const response = await fetch(`https://sp-taskify-api.vercel.app/4-14/cards/${cardItem.id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          assigneeUserId: 1764,
          columnId: Number(columnItem.id),
          title: title,
          description: descrpition,
          dueDate: date,
          tags: tags,
          imageUrl:
            'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/taskify/task_image/14_20003_1713343503827.jpeg',
        }),
      });
      if (response.ok) {
        handleModal;
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ModalLayout handleModal={handleModal} title='할 일 수정'>
      <form>
        <div className='flex gap-4 h-[6.25rem]'>
          <ProgressDropDown dragDropItem={dragDropItem} column={columnItem} />
          <PersonInChargeDropDown members={members} />
        </div>
        <div className='flex flex-col gap-2.5 h-[7.5rem]'>
          <label className='flex gap-1 font-extrabold text-lg'>
            제목<span className='text-tp-violet_900 '>*</span>
          </label>
          <input
            type='text'
            placeholder='제목을 입력해 주세요'
            className='border border-solid border-tp-gray_700 p-4 rounded-lg outline-tp-violet_900 placeholder:text-sm'
            onChange={handletitle}
            value={title}
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
              onChange={handledescrpition}
              value={descrpition}
            />
          </div>
        </div>
        <div className='flex flex-col gap-2.5 h-[7.5rem]'>
          <label className='flex gap-1 font-extrabold text-lg '>마감일</label>
          <input
            type='datetime-local'
            date-placeholder='날짜를 입력해 주세요'
            required
            aria-required='true'
            className='border border-solid border-tp-gray_700 p-4 rounded-lg outline-tp-violet_900 before:content-[attr(data-placeholder) w-full]'
            onChange={handleDate}
            value={date}
          />
        </div>
        <div className='flex flex-col gap-2.5 h-[8rem]'>
          <div className='flex items-center'>
            <label className='flex w-10 gap-1 font-extrabold text-lg'>태그</label>
          </div>
          <div className='relative'>
            <input
              type='text'
              placeholder='입력 후 Enter'
              className=' w-full outline-tp-violet_900 placeholder:text-sm border border-solid border-tp-gray_700 p-4 rounded-lg gap-4 '
              value={tagsName}
              onChange={handleTagName}
              onKeyDown={createTagChip}
            />
            <div className='absolute  left-[100px] flex flex-start flex-wrap w-[350px] gap-4 py-7 '>
              {tags.map((name, index) => (
                <TagChip key={index} name={name} size='large' onClick={() => removeTag(name)} />
              ))}
            </div>
          </div>
        </div>
        <InputImageFile size='small' />
        <ModalButton
          buttonType='double'
          firstButton='취소'
          secondButton='수정'
          onClickFirstButton={onClickFirstButton}
          onClickSecondButton={handleEditCard}
        />
      </form>
    </ModalLayout>
  );
};

export default EditCardModal;
