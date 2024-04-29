'use clinet';

import { ChangeEvent, useState } from 'react';

import ModalButton from '../Button/ModalButton';
import ModalLayout from '../ModalLayout';
import { I_ModalToggle } from '../ModalType';
import { ERROR } from '../constant';

import PersonInChargeDropDown from './components/PersonInChargeDropDown';

import InputImageFile from '@/components/InputImage/InputImage';
import TagChip from '@/components/common/Chip/TagChip';
import { I_Column, I_Members } from '@/interface/Dashboard';
import { changeCardImage } from '@/utils/api/changeCardImage';
import { createCard } from '@/utils/api/createCard';
import { formatDate } from '@/utils/formatDate';

interface I_CreateWorkModal extends I_ModalToggle {
  handleModal: () => void;
  columnItem: I_Column;
  dashboardMembers: I_Members[];
}

const CreateWorkModal = ({ handleModal, columnItem, dashboardMembers }: I_CreateWorkModal) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState();
  const [tags, setTags] = useState<string[]>([]);
  const [tagsName, setTagsName] = useState('');
  const [date, setDate] = useState('');
  const [assigneeUserId, setAssigneeUserId] = useState<number | undefined>();

  const handleCreateCard = async () => {
    if (!title) {
      alert(ERROR.TITLE);
      return;
    }
    if (!description) {
      alert(ERROR.DESCRIPTION);
    }
    if (!date) {
      alert(ERROR.DATE);
    }
    try {
      await createCard({
        title: title,
        dashboardId: Number(columnItem.dashboardId),
        columnId: Number(columnItem.id),
        description: description,
        dueDate: date,
        tags: tags,
        imageUrl: image,
        assigneeUserId: assigneeUserId,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleCardTitle = (event: ChangeEvent<HTMLInputElement>) => {
    const title = event.target.value;
    setTitle(title);
  };

  const handleCardDescription = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const description = event.target.value;
    setDescription(description);
  };

  const handleCardDate = (event: ChangeEvent<HTMLInputElement>) => {
    const inputDate = event.target.value;
    const selectedDate = new Date(inputDate);
    const currentDate = new Date();
    if (selectedDate < currentDate) {
      alert(ERROR.DUEDATE);
      event.target.value = '';
      return;
    }

    const formattedDate = formatDate(selectedDate);

    setDate(formattedDate);
  };

  const handleTagName = (event: ChangeEvent<HTMLInputElement>) => {
    setTagsName(event.target.value);
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

  const removeTag = (tag: string) => {
    setTags(prevTags => prevTags.filter(item => item !== tag));
  };

  const handleCardImage = async ({ file }) => {
    const { imageUrl } = await changeCardImage({ file, columnId: Number(columnItem.id) });
    setImage(imageUrl);
  };

  return (
    <ModalLayout handleModal={handleModal} title='할 일 생성'>
      <form>
        <div className='flex gap-4 h-[6.25rem]'>
          <PersonInChargeDropDown dashboardMember={dashboardMembers} />
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
              className='text-sm tb:w-[28.125rem] mb:w-[25.125rem] h-[6rem] border border-solid border-tp-gray_700 rounded-lg pt-4 px-4 pb-11 outline-tp-violet_900 relative placeholder:text-sm'
              onChange={handleCardDescription}
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
            onChange={handleCardDate}
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
        <InputImageFile size='small' apiCallback={handleCardImage} />
        <ModalButton
          buttonType='double'
          firstButton='취소'
          secondButton='생성'
          onClickFirstButton={handleModal}
          onClickSecondButton={handleCreateCard}
        />
      </form>
    </ModalLayout>
  );
};

export default CreateWorkModal;
