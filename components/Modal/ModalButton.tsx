const ModalDoubleButton = ({ leftButton, rightButton }: { leftButton: string; rightButton: string }) => {
  return (
    <div className='flex gap-3 justify-end'>
      <button
        className='font-medium text-tp-gray_900 px-[2.9rem] py-3.5 border border-solid border-tp-gray_700 text-base rounded-lg active:bg-slate-50'
        type='button'>
        {leftButton}
      </button>
      <button
        className='font-medium text-white bg-tp-violet_900 px-[2.9rem] py-3.5 text-base rounded-lg active:bg-[#4729c2] '
        type='button'>
        {rightButton}
      </button>
    </div>
  );
};
export default ModalDoubleButton;
