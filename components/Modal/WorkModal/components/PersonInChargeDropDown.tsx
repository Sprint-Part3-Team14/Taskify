'use client';
import { ArrowDropDownIcon, CheckIcon, DEFAULTPROFILEIMAGE } from 'constant/importImage';
import Image from 'next/image';
import { MouseEvent, useState, useEffect } from 'react';

// const memberData = {
//   members: [
//     {
//       id: 8108,
//       email: 'test@codeit.com',
//       nickname: 'codeit14',
//       profileImageUrl: null,
//       createdAt: '2024-04-17T10:10:30.042Z',
//       updatedAt: '2024-04-17T10:10:30.042Z',
//       isOwner: true,
//       userId: 1680,
//     },
//     {
//       id: 8141,
//       email: 'yukyoung@naver.com',
//       nickname: 'yukyoung',
//       profileImageUrl: null,
//       createdAt: '2024-04-17T17:51:57.369Z',
//       updatedAt: '2024-04-17T17:51:57.369Z',
//       isOwner: false,
//       userId: 1692,
//     },
//   ],
//   totalCount: 2,
// };

// const { members } = memberData;

interface ModalPorps {
  members: Props[];
  totalCount?: number;
  handleModal?: () => void;
}

interface Props {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: any;
  createdAt: string;
  updatedAt: string;
  isOwner: boolean;
  userId: number;
}

const PersonInChargeDropDown = ({ members }: ModalPorps) => {
  const [openList, setOpenList] = useState(false);
  const [selectItem, setSelectItem] = useState(members[0].nickname);

  function handleOpenDropDown() {
    openList ? setOpenList(false) : setOpenList(true);
  }

  function handleSelectItem(event: MouseEvent<HTMLElement>) {
    setSelectItem(event.currentTarget.id);
  }

  return (
    <div className='relative'>
      <h3 className='text-lg mb-2.5 font-extrabold'>담당자</h3>
      <button
        onClick={handleOpenDropDown}
        type='button'
        className={
          openList
            ? 'w-[13.6rem] border border-solid border-tp-violet_900 inline-flex justify-between rounded-md bg-white px-3 py-2 hover:bg-gray-50 '
            : 'w-[13.6rem] border border-solid  inline-flex justify-between rounded-md bg-white px-3 py-2 hover:bg-gray-50 '
        }>
        {selectItem}
        <div className='w-6 h-6 relative'>
          <Image fill src={ArrowDropDownIcon} alt='상태 선택' />
        </div>
      </button>
      {openList && (
        <div className='absolute left-0 z-10 mt-1 w-[13.6rem] bg-white shadow-lg ring-1 ring-black ring-opacity-5 last:rounded-b-md'>
          {members.map(member => (
            <div
              className='flex gap-1.5 px-4 py-2 text-sm hover:bg-slate-50 items-center'
              key={member.id}
              id={member.nickname}
              onClick={handleSelectItem}>
              <div className={selectItem === member.nickname ? 'w-5 h-5 relative' : 'w-5 h-5 relative invisible'}>
                <Image fill src={CheckIcon} alt='선택된 상태' />
              </div>
              <div className='w-[1.625rem] h-[1.625rem] relative rounded-full overflow-hidden'>
                <Image
                  fill
                  src={member.profileImageUrl ? member.profileImageUrl : DEFAULTPROFILEIMAGE}
                  alt={selectItem + '의 프로필 사진'}
                />
              </div>
              {member.nickname}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PersonInChargeDropDown;
