const ModalButton = ({
  buttonType,
  firstButton,
  secondButton,
}: {
  buttonType: 'double' | 'single';
  firstButton?: string;
  secondButton?: string;
}) => {
  switch (buttonType) {
    case 'double':
      return (
        <div className='flex gap-3 justify-end'>
          <button
            className='font-medium text-tp-gray_900 px-[2.9rem] py-3.5 border border-solid border-tp-gray_700 text-base rounded-lg active:bg-slate-50'
            type='button'>
            {firstButton}
          </button>
          <button
            className='font-medium text-white bg-tp-violet_900 px-[2.9rem] py-3.5 text-base rounded-lg active:bg-[#4729c2] '
            type='button'>
            {secondButton}
          </button>
        </div>
      );
    case 'single':
      return (
        <div className='flex gap-3 justify-end'>
          {firstButton && (
            <button
              className='font-medium text-tp-gray_900 px-[2.9rem] py-3.5 border border-solid border-tp-gray_700 text-base rounded-lg active:bg-slate-50'
              type='button'>
              {firstButton}
            </button>
          )}
          {secondButton && (
            <button
              className='font-medium text-white bg-tp-violet_900 px-[2.9rem] py-3.5 text-base rounded-lg active:bg-[#4729c2] '
              type='button'>
              {secondButton}
            </button>
          )}
        </div>
      );
  }
};
export default ModalButton;
