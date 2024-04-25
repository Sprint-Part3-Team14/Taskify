import { I_Card } from '@/interface/Dashboard';

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
  onDelete: () => void;
  onModify: () => void;
}

const ModalComment = ({ commentList, onDelete, onModify }: I_CommentItem) => {
  return (
    <>
      {commentList &&
        commentList.map((comment, index) => {
          const createdAtDate = new Date(comment.createdAt);
          const formattedDate = createdAtDate.toISOString().split('T')[0];
          return (
            <div key={index} className='flex w-full flex-col gap-2.5 '>
              <div className='flex items-center gap-4'>
                <div className='w-5 h-5 bg-tp-black_900'>{comment.author.profileImageUrl}</div>
                <div className='felx flex-col'>
                  <div className='flex items-baseline gap-3'>
                    <div className='text-sm font-semibold'>{comment.author.nickname}</div>
                    <div className='text-xs text-tp-gray_800'>{formattedDate}</div>
                  </div>
                  <div>{comment.content}</div>
                </div>
              </div>
              <div className='flex justify-end gap-4 text-xs text-tp-gray_800 pr-5 cursor-pointer'>
                <div onModify={onModify}>수정</div>
                <div onDelete={onDelete}>삭제</div>
              </div>
            </div>
          );
        })}
    </>
  );
};

export default ModalComment;
