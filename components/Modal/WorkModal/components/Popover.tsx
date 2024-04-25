interface Props {
  editCard: () => void;
  deleteCard: () => void;
}

const Popover = ({ editCard, deleteCard }: Props) => {
  return (
    <div className='absolute right-[80px] top-[-25px] flex flex-col text-center items-center justify-center w-[93px] h-[82px] border rounded-md border-solid '>
      <div
        onClick={editCard}
        className='flex items-center justify-center bg-tp-violet_100 text-tp-violet_900 w-full h-full'>
        수정하기
      </div>
      <div onClick={deleteCard} className='flex items-center justify-center bg-tp-gray_500 w-full h-full'>
        삭제하기
      </div>
    </div>
  );
};

export default Popover;
