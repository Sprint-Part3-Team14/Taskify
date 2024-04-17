import { ButtonHTMLAttributes, ReactNode } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  buttonColor?: 'confirm' | 'reject';
}

function ConfirmButton({ children, onClick, disabled, buttonColor, ...rest }: Props) {
  let buttonClassName =
    'w-[109px] h-[28px] tb:w-[72px] tb:h-[30px] pc:w-[84px] pc:h-[32px] font-normal flex-center rounded disabled:bg-gray-400';
  buttonColor === 'confirm'
    ? (buttonClassName += ' bg-tp-violet_900 text-white')
    : (buttonClassName += ' bg-tp-white text-tp-violet_900 border border-tp-violet_900');

  return (
    <button onClick={onClick} disabled={disabled} className={buttonClassName}>
      {children}
    </button>
  );
}

export default ConfirmButton;
