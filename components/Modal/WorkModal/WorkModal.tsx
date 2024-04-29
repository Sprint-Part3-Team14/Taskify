import { CloseIcon, MoreVertIcon } from 'constant/importImage';
import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';

import ModalLayout from '../ModalLayout';
import ModalTextarea from '../input/ModalTextarea';

import EditCardModal from './EditCardModal';
import InformationChip from './components/InformationChip';
import ModalComment from './components/ModalComment';
import Popover from './components/Popover';

import ProgressChip from '@/components/common/Chip/ProgressChip';
import TagChip from '@/components/common/Chip/TagChip';
import { useHandleModal } from '@/hooks/useHandleModal';
import { I_Column, I_Members, I_Card, I_Dashboard } from '@/interface/Dashboard';
import { getCommentList, getAddCommentList, createCommentData } from '@/utils/api/comment';
import { deleteCard } from '@/utils/api/deleteCard';

interface I_WorkModal {
  handleModal: () => void;
  dashboardMember: I_Members[];
  dashboardItem: I_Dashboard[];
  columnItem: I_Column;
  cardItem: I_Card;
}

const WorkModal = ({ handleModal, dashboardMember, columnItem, cardItem, dashboardItem }: I_WorkModal) => {
  const { isShowModal, handleToggleModal } = useHandleModal();
  const [isToggledPopover, setIsToggledPopover] = useState(false);
  const [comment, setComment] = useState('');
  const [commentList, setCommentList] = useState([]);
  const [targetId, setCursorId] = useState('');
  const isCommnetList = commentList.length !== 0 ? true : false;

  const handleCreateCommnet = async () => {
    try {
      await createCommentData({
        content: comment,
        cardId: cardItem.id,
        columnId: cardItem.columnId,
        dashboardId: cardItem.dashboardId,
      });
      getCommentData();
      setComment('');
    } catch (error) {
      console.error(error);
    }
  };

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

      await deleteCard({ cardId: cardItem.id });
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
          {isCommnetList && <InformationChip cardItem={cardItem} />}
          <div className='flex mb:flex-col pc:flex-row gap-10 '>
            <div className='flex flex-col tb:w-[28rem] mb:w-[25rem] gap-5 h-[6.25rem]bg-tp-white'>
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
              <div className='flex flex-col gap-2.5 pc:w-full mb:w-[15rem] mb:h-[10rem] pc:h-[15.625rem] rounded-lg overflow-hidden '>
                {cardItem.imageUrl ? (
                  <img
                    className=' mb:h-[10rem] pc:h-[15.625rem] pc:w-full mb:w-[15rem] object-cover'
                    src={cardItem.imageUrl}
                    alt='user'
                  />
                ) : (
                  <img
                    className=' mb:h-[10rem] pc:h-[15.625rem] pc:w-full mb:w-[15rem] object-containr'
                    src={'/images/icon/unsubscribe.svg'}
                    alt='none'
                  />
                )}
              </div>
              <div className='flex flex-col gap-2.5 h-[7.5rem] overflow-hidden'>{cardItem.description}</div>
              <div className='flex flex-col gap-2.5 '>
                <ModalTextarea onClick={handleCreateCommnet} onChange={setComment} />
              </div>
            </div>
            {isCommnetList && (
              <div className='flex flex-col gap-3 pc:w-[40rem] tb:[28rem] pc:h-[38rem] mb:h-[6rem] p-5 overflow-y-scroll  '>
                <ModalComment commentList={commentList} />
                <div ref={intersectionObserverRef}></div>
              </div>
            )}
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
          dashboardMembers={dashboardMember}
          dashboardItem={dashboardItem}
          columnItem={columnItem}
          cardItem={cardItem}
          onClickFirstButton={handleToggleModal}
        />
      )}
    </>
  );
};

export default WorkModal;
