import ModalButton from '../Button/ModalButton';

const ModalTextarea = ({ onChange, onClick }) => {
  const handleChange = event => {
    onChange(event.target.value);
  };
  return (
    <div className='flex flex-col gap-2.5'>
      <label htmlFor='Comments'>댓글</label>
      <div className='relative inline'>
        <textarea
          id='Comments'
          cols={10}
          rows={10}
          onChange={handleChange}
          placeholder='댓글 작성하기'
          className='w-[28.125rem] h-[6.875rem] border border-solid border-tp-gray_700 rounded-lg pt-4 px-4 pb-11 outline-tp-violet_900 relative placeholder:text-sm '></textarea>
        <div className='absolute bottom-4 left-[21.8rem] '>
          <ModalButton onClick={onClick} buttonType='single' singleButton='입력' />
        </div>
      </div>
    </div>
  );
};

export default ModalTextarea;
