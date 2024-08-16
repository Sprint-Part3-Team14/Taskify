import ModalButton from '../Button/ModalButton';

const ModalTextarea = ({ onChange, onClick }) => {
  const handleChange = event => {
    onChange(event.target.value);
  };
  return (
    <div className='flex flex-col gap-2.5'>
      <label htmlFor='Comments'></label>
      <div className='relative inline'>
        <textarea
          id='Comments'
          cols={10}
          rows={10}
          onChange={handleChange}
          placeholder='댓글 작성하기'
          className='tb:w-[28rem] mb:w-[25rem] h-[10rem] border border-solid border-tp-gray_700 rounded-lg pt-4 px-4 pb-11 outline-tp-violet_900 relative placeholder:text-sm '></textarea>
        <div className='absolute bottom-4 tb:left-[21rem] mb:left-[18rem] '>
          <ModalButton onClick={onClick} buttonType='single' singleButton='입력' />
        </div>
      </div>
    </div>
  );
};

export default ModalTextarea;
