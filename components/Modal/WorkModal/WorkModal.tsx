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
import ModalTextarea from '../input/ModalTextarea';
import EditCardModal from './EditCardModal';

interface I_ModalCard extends I_Card {
  handleModal: () => void;
  onClickFirstButton: () => void;
}

const WorkModal = ({ handleModal, onClickFirstButton, members, dragDropItem, columnItem, cardItem }: I_ModalCard) => {
  const [isToggledModal, setIstoggeldModal] = useState(false);
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

  const handleToggledModal = () => {
    setIstoggeldModal(!isToggledModal);
  };

  return (
    <ModalLayout handleModal={handleModal} title='새로운 일정 관리 Taskify'>
      <form className='relative'>
        <div className='flex gap-6 pb-6'>
          <div className='flex flex-col gap-4 h-[6.25rem bg-tp-white]'>
            <div className='flex flex-start flex-wrap w-[350px] gap-4 py-7 '>
              {tags.map((name, index) => (
                <TagChip key={index} name={name} size='large' />
              ))}
            </div>
            <div className='flex flex-col gap-2.5 h-[7.5rem]'>{descrpition}</div>
            <div className='flex flex-col gap-2.5 h-[9rem] bg-tp-black_900'></div>
            <div className='flex flex-col gap-2.5 '>
              <ModalTextarea />
            </div>
            <div className='flex flex-col gap-2.5 h-[8rem]'>
              <div className='flex'>
                <div>user</div>
                <div className='felx flex-col'>
                  <div className='flex'>
                    <div>작성자</div>
                    <div>작성일</div>
                  </div>
                  <div>내용</div>
                </div>
              </div>
            </div>
            <div className='flex'>
              <div>수정</div>
              <div>삭제</div>
            </div>
          </div>
          <div>
            <div>담당자</div>
            <div>user</div>
            <div>마감일</div>
            <div>마감시간</div>
          </div>
        </div>
        <div className='absolute top-[-60px] right-0 flex'>
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
          <div onClick={handleToggledModal}>수정</div>
          <div>삭제</div>
          <div>X</div>
        </div>
      </form>
    </ModalLayout>
  );
};

export default WorkModal;
