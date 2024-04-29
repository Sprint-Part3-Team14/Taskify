import { ButtonHTMLAttributes, PropsWithChildren } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  id?: string;
  type?: 'button' | 'submit' | 'reset';
}

const RemoveButton = ({ children, id, type = 'button', ...rest }: PropsWithChildren<Props>) => {
  return (
    <button
      id={id}
      type={type}
      className='flex justify-center text-lg font-bold w-[284px] tb:w-[320px] pc:w-[320px] py-5 tb:py-6 rounded-md border border-solid border-tp-gray_700'
      {...rest}>
      {children}
      <div className='flex items-center justify-center'>
        <p className='flex font-bold text-base tb:text-lg'>대시보드 삭제하기</p>
      </div>
    </button>
  );
};

export default RemoveButton;
