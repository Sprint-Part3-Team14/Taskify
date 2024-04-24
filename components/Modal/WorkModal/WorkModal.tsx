import { ChangeEvent, useState } from 'react';

import ModalLayout from '../ModalLayout';

import Image from 'next/image';

import TagChip from '@/components/common/Chip/TagChip';
import { setAccessToken, getAccessToken } from '@/utils/handleToken';
import { I_Card } from '@/interface/Dashboard';
import { TEMP_TOKEN } from '@/app/(dashboard)/dashboard/constants';
import ModalTextarea from '../input/ModalTextarea';
import EditCardModal from './EditCardModal';
import ProgressChip from '@/components/common/Chip/ProgressChip';
import { CloseIcon, MoreVertIcon } from 'constant/importImage';
import Popover from './components/Popover';
import DeleteAllCardModal from '../DeleteAllCardModal';

interface I_ModalCard extends I_Card {
  handleModal: () => void;
  handlePopover: () => void;
}

const WorkModal = ({ handleModal, members, dragDropItem, columnItem, cardItem }: I_ModalCard) => {
  const [isToggledModal, setIstoggeldModal] = useState(false);
  const [isToggledPopover, setIsToggledPopover] = useState(false);

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

  const handleToggledModal = () => {
    setIstoggeldModal(!isToggledModal);
  };

  const handleToggledPopover = () => {
    setIsToggledPopover(!isToggledPopover);
  };

  return (
    <ModalLayout handleModal={handleModal} title='새로운 일정 관리 Taskify'>
      <form className='relative'>
        <div className='flex gap-6 '>
          <div className='flex flex-col w-[28rem] gap-5 h-[6.25rem]bg-tp-white'>
            <div className='flex items-center w-full overflow-hidde`n gap-5'>
              <div className='flex flex-shrink-0 pr-3 border-r-[1px]'>
                <ProgressChip title={columnItem.title} />
              </div>
              <div className='flex flex-wrap w-[350px] gap-4 '>
                {tags.map((name, index) => (
                  <TagChip key={index} name={name} size='large' />
                ))}
              </div>
            </div>
            <div className='flex flex-col gap-2.5 h-[7.5rem] overflow-y-scroll'>{descrpition}</div>
            <div className='flex flex-col gap-2.5 h-[15.625rem] bg-tp-black_900'></div>
            <div className='flex flex-col gap-2.5 '>
              <ModalTextarea />
            </div>
            <div className='flex w-full flex-col gap-2.5 '>
              <div className='flex items-center gap-4'>
                <div>U</div>
                <div className='felx flex-col'>
                  <div className='flex items-baseline gap-3'>
                    <div className='text-sm font-semibold'>작성자</div>
                    <div className='text-xs text-tp-gray_800'>작성일</div>
                  </div>
                  <div className=''>내용</div>
                </div>
              </div>
              <div className='flex justify-end gap-3 text-xs text-tp-gray_800'>
                <div>수정</div>
                <div>삭제</div>
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-3 w-[11.25rem] h-[9.375rem] p-4 border border-solid rounded-lg '>
            <div className='flex flex-col gap-3'>
              <div className='font-semibold text-xs'>담당자</div>
              <div className='flex gap-3'>
                <div className=''>U</div>
                <div className='text-xs'>이름</div>
              </div>
            </div>
            <div className='flex flex-col gap-3'>
              <div className='font-semibold text-xs'>마감일</div>
              <div className='text-xs'>마감시간</div>
            </div>
          </div>
        </div>
        <div className='absolute top-[-60px] right-0 flex gap-3 text-sm '>
          <button type='button' onClick={handleToggledPopover}>
            <Image src={MoreVertIcon} alt='edit' width={28} height={28} />
          </button>
          {isToggledPopover && <Popover onClick={handleToggledModal} />}
          {isToggledModal && (
            <EditCardModal
              handleModal={handleToggledModal}
              members={members}
              columnItem={columnItem}
              dragDropItem={dragDropItem}
              cardItem={cardItem}
              onClickFirstButton={handleToggledModal}
            />
          )}
          <button type='button' onClick={handleModal}>
            <Image src={CloseIcon} alt='close' width={28} height={28} />
          </button>
        </div>
      </form>
    </ModalLayout>
  );
};

export default WorkModal;
