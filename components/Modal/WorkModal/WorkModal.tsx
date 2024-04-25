import { useEffect, useState, useRef } from 'react';

import ModalLayout from '../ModalLayout';

import Image from 'next/image';

import TagChip from '@/components/common/Chip/TagChip';
import { getAccessToken } from '@/utils/handleToken';

import ModalTextarea from '../input/ModalTextarea';
import EditCardModal from './EditCardModal';
import ModalComment from './components/ModalComment';
import ProgressChip from '@/components/common/Chip/ProgressChip';
import { CloseIcon, MoreVertIcon } from 'constant/importImage';
import Popover from './components/Popover';
import { useHandleModal } from '@/hooks/useHandleModal';
import { I_Column, I_Members, I_Card } from '@/interface/Dashboard';
import { getCommentList, getAddCommentList } from '@/utils/api/getComment';

interface I_WorkModal {
  handleModal: () => void;
  dashboardMember: I_Members[];
  columnItem: I_Column;
  cardItem: I_Card;
}

const WorkModal = ({ handleModal, dashboardMember, columnItem, cardItem }: I_WorkModal) => {
  const { isShowModal, handleToggleModal } = useHandleModal();
  const [isToggledPopover, setIsToggledPopover] = useState(false);
  const [comment, setComment] = useState('');
  const [commentList, setCommentList] = useState([]);
  const [targetId, setCursorId] = useState('');

  const intersectionObserverRef = useRef(null);
  useEffect(() => {
    getCommentData();
  }, []);

  const handleToggledPopover = () => {
    setIsToggledPopover(!isToggledPopover);
  };

  const handleDeleteCard = async () => {
    try {
      const isConfirmed = window.confirm('카드를 삭제하시겠습니까?');
      if (!isConfirmed) {
        return;
      }

      const accessToken = getAccessToken();
      const response = await fetch(`https://sp-taskify-api.vercel.app/4-14/cards/${cardItem.id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        handleModal();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateCommnet = async () => {
    try {
      const accessToken = getAccessToken();
      const response = await fetch('https://sp-taskify-api.vercel.app/4-14/comments', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: comment,
          cardId: cardItem.id,
          columnId: cardItem.columnId,
          dashboardId: columnItem.dashboardId,
        }),
      });
    } catch (error) {
      console.error(error);
    }
  };

  const getCommentData = async () => {
    try {
      if (commentList.length === 0) {
        const { comments } = await getCommentList({ cardId: cardItem.id });
        const commentList = Array.isArray(comments) ? comments : [];
        setCommentList(commentList);
        if (commentList.length > 0) {
          setCursorId(commentList[commentList.length - 1].id);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getAddCommentData = async () => {
    try {
      const { comments } = await getAddCommentList({ cardId: cardItem.id, targetId: targetId });
      const newCommentList = Array.isArray(comments) ? comments : [];
      setCommentList(prevList => [...prevList, ...newCommentList]);
      if (newCommentList.length > 0) {
        setCursorId(newCommentList[newCommentList.length - 1].id);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const intersectionObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            getAddCommentData();
          }
        });
      },
      {
        threshold: 0.5,
      }
    );

    if (intersectionObserverRef.current) {
      intersectionObserver.observe(intersectionObserverRef.current);
    }

    return () => {
      if (intersectionObserverRef.current) {
        intersectionObserver.unobserve(intersectionObserverRef.current);
      }
    };
  }, [targetId]);

  return (
    <>
      <ModalLayout handleModal={handleModal} title='새로운 일정 관리 Taskify'>
        <form className='relative '>
          <div className='absolute top-[-70px] left-[300px] flex flex-col border border-solid p-2 rounded-md'>
            <div className='flex  gap-3'>
              <div className='font-semibold text-xs'>담당자</div>
              <div className='flex gap-3'>
                <div>{cardItem.assignee.profileImageUrl}</div>
                <div className='text-xs'>{cardItem.assignee.nickname}</div>
              </div>
            </div>
            <div className='flex  gap-3'>
              <div className='font-semibold text-xs'>마감일</div>
              <div className='text-xs'>{cardItem.dueDate}</div>
            </div>
          </div>

          <div className='flex gap-10 '>
            <div className='flex flex-col w-[28rem] gap-5 h-[6.25rem]bg-tp-white'>
              <div className='flex items-center w-full overflow-hidde`n gap-5'>
                <div className='flex flex-shrink-0 pr-3 border-r-[1px]'>
                  <ProgressChip title={columnItem.title} />
                </div>
                <div className='flex flex-wrap w-[350px] gap-4 '>
                  {cardItem.tags.map((name: string, index: number) => (
                    <TagChip key={index} name={name} size='large' />
                  ))}
                </div>
              </div>
              <div className='flex flex-col gap-2.5 h-[15.625rem] bg-tp-black_900'>
                <img className='h-[15.625rem] object-cover' src={cardItem.imageUrl} alt='user' />
              </div>
              <div className='flex flex-col gap-2.5 h-[7.5rem] overflow-y-scroll'>{cardItem.description}</div>
              <div className='flex flex-col gap-2.5 '>
                <ModalTextarea onClick={handleCreateCommnet} onChange={setComment} />
              </div>
            </div>
            <div className='flex flex-col gap-3 w-[40rem] h-[38rem] p-5 overflow-y-scroll  '>
              <ModalComment commentList={commentList} />
              <div ref={intersectionObserverRef}></div>
            </div>
          </div>
          <div className='absolute top-[-60px] right-0 flex gap-3 text-sm '>
            <button type='button' onClick={handleToggledPopover}>
              <Image src={MoreVertIcon} alt='edit' width={28} height={28} />
            </button>
            {isToggledPopover && <Popover editCard={handleToggleModal} deleteCard={handleDeleteCard} />}

            <button type='button' onClick={handleModal}>
              <Image src={CloseIcon} alt='close' width={28} height={28} />
            </button>
          </div>
        </form>
      </ModalLayout>
      {isShowModal && (
        <EditCardModal
          handleModal={handleToggleModal}
          dashboardMember={dashboardMember}
          columnItem={columnItem}
          cardItem={cardItem}
          onClickFirstButton={handleToggleModal}
        />
      )}
    </>
  );
};

export default WorkModal;
