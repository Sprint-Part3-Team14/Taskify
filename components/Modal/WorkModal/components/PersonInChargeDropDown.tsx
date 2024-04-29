import { ArrowDropDownIcon, CheckIcon, DEFAULTPROFILEIMAGE } from 'constant/importImage';
import Image from 'next/image';
import { MouseEvent, useState, useRef, useEffect } from 'react';

import { I_Members } from '@/interface/Dashboard';

interface I_PersonInCharge {
  dashboardMember: I_Members[];
  onSelectAssignee: (assigneeId: number) => void;
}

const PersonInChargeDropDown = ({ dashboardMember, onSelectAssignee }: I_PersonInCharge) => {
  const [openList, setOpenList] = useState(false);
  const [selectItem, setSelectItem] = useState(dashboardMember[0].nickname);

  const dropdownRef = useRef<HTMLDivElement>(null);

  function handleOpenDropDown() {
    setOpenList(prevState => !prevState);
  }

  console.log(dashboardMember);

  function handleSelectItem(event: MouseEvent<HTMLElement>) {
    const selectedNickname = event.currentTarget.id;
    setSelectItem(selectedNickname);
    const selectedMember = dashboardMember.find(member => member.nickname === selectedNickname);
    if (selectedMember) {
      onSelectAssignee(selectedMember.userId);
    }
  }

  const handleClickOutside = (event: any) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setOpenList(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className='relative' ref={dropdownRef}>
      <h3 className='text-lg mb-2.5 font-extrabold'>담당자</h3>
      <button
        onClick={handleOpenDropDown}
        type='button'
        className={
          openList
            ? 'tb:w-[13.6rem] mb:w-[12rem] border border-solid border-tp-violet_900 inline-flex justify-between rounded-md bg-white px-3 py-2 hover:bg-gray-50 '
            : 'tb:w-[13.6rem] mb:w-[12rem] border border-solid  inline-flex justify-between rounded-md bg-white px-3 py-2 hover:bg-gray-50 '
        }>
        {selectItem}
        <div className='w-6 h-6 relative'>
          <Image fill src={ArrowDropDownIcon} alt='상태 선택' />
        </div>
      </button>
      {openList && (
        <div className='absolute left-0 z-10 mt-1 tb:w-[13.6rem] mb:w-[12rem] bg-white shadow-lg ring-1 ring-black ring-opacity-5 last:rounded-b-md'>
          {dashboardMember.map(member => (
            <div
              className='flex gap-1.5 px-4 py-2 text-sm hover:bg-slate-50 items-center'
              key={member.id}
              id={member.nickname}
              onClick={handleSelectItem}>
              <div className={selectItem === member.nickname ? 'w-5 h-5 relative' : 'w-5 h-5 relative invisible'}>
                <Image fill src={CheckIcon} alt='선택된 상태' />
              </div>
              <div className='w-[1.625rem] h-[1.625rem] relative rounded-full overflow-hidden'>
                <img
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
