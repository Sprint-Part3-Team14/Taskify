'use client';

import { useState } from 'react';
import EditColumnModal from '@/components/Modal/EditColumnModal';

import Image from 'next/image';

import NumberChip from '../../common/Chip/NumberChip';

import { I_DashboardTitle } from '@/interface/Dashboard';
import { ELLIPSE, SETTING } from '../constants';

const DashboardTitle = ({ title, count }: I_DashboardTitle) => {
  const [isToggledEditColumnMdoal, setIsToggledEditColumnModal] = useState(false);

  const handleEditColumnModal = () => {
    setIsToggledEditColumnModal(!isToggledEditColumnMdoal);
  };

  return (
    <div className='flex justify-between items-center '>
      <div className='flex items-center gap-3  text-lg font-bold'>
        <Image src={ELLIPSE} alt='ellipse' width={8} height={8} />
        <div className='text-lg text-tp-black_700'>{title}</div>
        <NumberChip count={count} />
      </div>
      <Image src={SETTING} alt='setting' width={24} height={24} onClick={handleEditColumnModal} />
      {isToggledEditColumnMdoal && <EditColumnModal handleModal={handleEditColumnModal} />}
    </div>
  );
};

export default DashboardTitle;
