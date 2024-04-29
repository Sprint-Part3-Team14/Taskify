import { BUTTON_TITLE } from '@/components/MyInvitation/constants';
import { ButtonHTMLAttributes, ReactNode } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  buttonColor?: 'confirm' | 'reject';
  Accept_Button: () => void;
  Reject_Button: () => void;
  acceptId?: string;
  rejectId?: string;
  acceptType?: 'button' | 'submit' | 'reset';
  rejectType?: 'button' | 'submit' | 'reset';
}

const ConfirmButton = ({
  children,
  onClick,
  disabled,
  buttonColor,
  Accept_Button,
  Reject_Button,
  acceptId,
  rejectId,
  acceptType = 'button',
  rejectType = 'button',
  ...rest
}: Props) => {
  return (
    <div className='flex justify-center items-center gap-[0.625rem]'>
      <button
        id={acceptId}
        type={acceptType}
        className='w-[5.25rem] h-8 bg-tp-violet_900 rounded text-tp-white text-sm font-medium'
        onClick={Accept_Button}>
        {BUTTON_TITLE.ACCEPT}
      </button>
      <button
        id={rejectId}
        type={rejectType}
        className='w-[5.25rem] h-8 text-tp-violet_900 rounded bg-tp-white border border-solid border-tp-gray_700 text-sm font-medium'
        onClick={Reject_Button}>
        {BUTTON_TITLE.REJECT}
      </button>
    </div>
  );
};

export default ConfirmButton;
