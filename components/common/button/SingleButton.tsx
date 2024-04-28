import { FormEvent, MouseEvent, ReactNode } from 'react';

interface SingleButtonProps {
  colorType: 'violet' | 'white';
  type: 'button' | 'submit';
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  onSubmit?: (event: FormEvent<HTMLElement>) => void;
  id?: any;
  children: ReactNode;
}

const SingleButton = ({ colorType, type, onClick, id, children }: SingleButtonProps) => {
  const styleClass =
    colorType === 'violet'
      ? 'text-white py-1.5 px-7 rounded-md text-sm bg-tp-violet_900 self-end active:bg-[#3719AF]'
      : 'text-tp-violet_900 py-1.5 px-7 rounded-md text-sm bg-white border border-solid border-tp-gray_700 active:bg-gray-100';

  return (
    <button onClick={onClick} id={id} type={type} className={styleClass}>
      {children}
    </button>
  );
};

export default SingleButton;
