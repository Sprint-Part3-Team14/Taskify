import { useState } from 'react';
import { getAccessToken } from '@/utils/handleToken';

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
  const [editedCommentId, setEditedCommentId] = useState<number | null>(null);
  const [modifiedContent, setModifiedContent] = useState<string>('');

  const handleModifyComment = async (commentId: number) => {
    try {
      const accessToken = getAccessToken();
      const response = await fetch(`https://sp-taskify-api.vercel.app/4-14/comments/${commentId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: modifiedContent,
        }),
      });

      setEditedCommentId(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    try {
      const accessToken = getAccessToken();
      const response = await fetch(`https://sp-taskify-api.vercel.app/4-14/comments/${commentId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setModifiedContent(event.target.value);
  };

  const handleCancelEdit = () => {
    setEditedCommentId(null);
    setModifiedContent('');
  };

  return (
    <>
      {commentList &&
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
                  {editedCommentId === comment.id ? (
                    <textarea
                      value={modifiedContent}
                      onChange={handleChange}
                      className='w-full border border-solid border-gray-300 rounded-md p-2 overflow-hidden'
                    />
                  ) : (
                    <div className='w-full'>{comment.content}</div>
                  )}
                </div>
              </div>
              <div className='flex justify-end gap-4 text-xs text-tp-gray_800 pr-5 cursor-pointer'>
                {editedCommentId === comment.id ? (
                  <>
                    <button type='button' onClick={() => handleModifyComment(comment.id)}>
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
                      setEditedCommentId(comment.id);
                      setModifiedContent(comment.content);
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
        })}
    </>
  );
};

export default ModalComment;
