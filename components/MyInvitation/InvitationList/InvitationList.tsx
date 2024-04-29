import { I_MYInviteList } from 'interface/myInvitation';
import { useState, useEffect } from 'react';

import { BUTTON_TITLE, INVITATION_TABLE } from '../constants';

const InvitationList = ({ invitationList, handleAccept, handleReject }: I_MYInviteList) => {
  const [invitationDashboard, setInvitationDashboard] = useState(invitationList);

  useEffect(() => {
    setInvitationDashboard(invitationList);
  }, [invitationList]);

  return (
    <>
      {invitationDashboard &&
        invitationDashboard.map(({ dashboard, inviter, id }, index) => (
          <div
            key={index}
            className='mb:hidden tb:grid grid-cols-3 w-full px-7 py-7 text-base border-b-[1px] border-bg-tp-gray_600'>
            <p className='pl-6'>{dashboard.title}</p>
            <p>{inviter.nickname}</p>
            <div className='flex gap-[0.625rem]'>
              <button
                className='w-[5.25rem] h-8 bg-tp-violet_900 rounded text-tp-white text-sm font-medium'
                onClick={() => {
                  handleAccept(id);
                }}>
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
          </div>
        ))}

      {invitationDashboard &&
        invitationDashboard.map(({ dashboard, inviter, id }, index) => (
          <div
            key={index}
            className='tb:hidden flex justify-center flex-col gap-4 p-4 border-b-[1px] border-bg-tp-gray_600'>
            <div className='flex flex-col gap-[0.625rem]'>
              <div className='flex gap-4 text-sm'>
                <h2 className='text-tp-gray_800'>{INVITATION_TABLE.NAME}</h2>
                <p>{dashboard.title}</p>
              </div>
              <div className='flex gap-4 text-sm'>
                <h2 className='text-tp-gray_800'>{INVITATION_TABLE.INVITOR}</h2>
                <p>{inviter.nickname}</p>
              </div>
            </div>
            <div className='flex justify-center items-center gap-[0.625rem]'>
              <button
                className='w-[5.25rem] h-8 bg-tp-violet_900 rounded text-tp-white text-sm font-medium'
                onClick={() => {
                  handleAccept(id);
                }}>
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
          </div>
        ))}
    </>
  );
};

export default InvitationList;
