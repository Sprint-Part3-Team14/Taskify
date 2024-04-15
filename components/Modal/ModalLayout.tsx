import { ReactNode } from 'react';
import { I_ModalTitle } from './ModalType';

const ModalLayout = ({ title, children }: { title?: I_ModalTitle; children: ReactNode }) => {
  return (
    <div className='bg-tp-black_800 opacity-70 fixed top-0 left-0 right-0 bottom-0 grid place-items-center'>
      <div className='bg-white px-7 py-8 rounded-lg flex flex-col gap-8 relative'>
        {title && <h1 className='text-2xl font-bold'>{title}</h1>}
        {children}
      </div>
    </div>
  );
};

export default ModalLayout;
