import { useState } from 'react';

import { changeCommentData, deleteCommentData } from '@/utils/api/comment';

interface I_CommentAuthor {
  id: number;
  nickname: string;
  profileImageUrl: string | null;
}

interface I_Comment {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  cardId: number;
  author: I_CommentAuthor;
}

interface I_CommentItem {
  commentList: I_Comment[];
}

const ModalComment = ({ commentList }: I_CommentItem) => {
  const [changeComment, setChangeComment] = useState('');
  const [editTarget, setEditTarget] = useState<number | null>(null);

  const handleChangeComment = async (commentId: number) => {
    try {
      await changeCommentData({ id: commentId, content: changeComment });
      setEditTarget(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    try {
      const confirmed = window.confirm('댓글을 삭제하시겠습니까?');
      if (confirmed) {
        await deleteCommentData({ id: commentId });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const comment = event.target.value;
    setChangeComment(comment);
  };

  const handleCancelEdit = () => {
    setEditTarget(null);
    setChangeComment('');
  };

  return (
    commentList &&
    commentList.map((comment, index) => {
      const createdAtDate = new Date(comment.createdAt);
      const formattedDate = createdAtDate.toISOString().split('T')[0];
      return (
        <div key={index} className='flex w-full flex-col gap-2.5'>
          <div className='flex items-center gap-4'>
            <div className='w-5 h-5 bg-tp-black_900'>{comment.author.profileImageUrl}</div>
            <div className='flex flex-col w-[90%]'>
              <div className='flex items-baseline gap-3'>
                <div className='text-sm font-semibold'>{comment.author.nickname}</div>
                <div className='text-xs text-tp-gray_800'>{formattedDate}</div>
              </div>
              {editTarget === comment.id ? (
                <textarea
                  value={changeComment}
                  onChange={handleChange}
                  className='w-full border border-solid border-gray-300 rounded-md p-2 overflow-hidden'
                />
              ) : (
                <div className='w-full'>{comment.content}</div>
              )}
            </div>
          </div>
          <div className='flex justify-end gap-4 text-xs text-tp-gray_800 pr-5 cursor-pointer'>
            {editTarget === comment.id ? (
              <>
                <button type='button' onClick={() => handleChangeComment(comment.id)}>
                  완료
                </button>
                <button type='button' onClick={handleCancelEdit}>
                  취소
                </button>
              </>
            ) : (
              <button
                type='button'
                onClick={() => {
                  setEditTarget(comment.id);
                  setChangeComment(comment.content);
                }}>
                수정
              </button>
            )}
            <button type='button' onClick={() => handleDeleteComment(comment.id)}>
              삭제
            </button>
          </div>
        </div>
      );
    })
  );
};

export default ModalComment;
