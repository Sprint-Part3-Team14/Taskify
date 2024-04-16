import { MouseEvent, ReactNode } from 'react';
import { I_ModalTitle } from './ModalType';

const ModalLayout = ({
  title,
  handleModal,
  children,
}: {
  title?: I_ModalTitle;
  handleModal: (event: MouseEvent<HTMLElement>) => void;
  children: ReactNode;
}) => {
  return (
    <div className='flex justify-center '>
      <div onClick={handleModal} className='bg-tp-black_800 opacity-70 fixed top-0 left-0 right-0 bottom-0 ' />
      <div className='bg-white px-7 py-8 rounded-lg flex flex-col gap-8 absolute top-1/2 translate-y-[-50%]'>
        {title && <h1 className='text-2xl font-bold'>{title}</h1>}
        {children}
      </div>
    </div>
  );
};

export default ModalLayout;
