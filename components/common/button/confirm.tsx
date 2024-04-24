import { ButtonHTMLAttributes, ReactNode } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  buttonColor?: 'confirm' | 'reject';
}

const ConfirmButton = ({ children, onClick, disabled, buttonColor, Accept_Button, ...rest }: Props) => {
  return (
    <div className='flex justify-center items-center gap-[0.625rem]'>
      <button
        className='w-[5.25rem] h-8 bg-tp-violet_900 rounded text-tp-white text-sm font-medium'
        onClick={Accept_Button}>
        {BUTTON_TITLE.ACCEPT}
      </button>
      <button
        className='w-[5.25rem] h-8 text-tp-violet_900 rounded bg-tp-white border boder-solid border-tp-gray_700 text-sm font-medium'
        onClick={() => {
          handleReject(id);
        }}>
        {BUTTON_TITLE.REJECT}
      </button>
    </div>
  );
};

export default ConfirmButton;
