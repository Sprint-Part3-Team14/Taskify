const ChangePassword = () => {
  return (
    <div
      role='change-password-container'
      className='flex flex-col pt-8 px-7 pb-7 bg-white rounded-lg shadow-md w-[38.75rem]'>
      <h2 className='text-2xl text-tp-black_700 font-bold mb-8'>비밀번호 변경</h2>
      <div role='password-change-input-container' className='flex flex-col gap-5 mb-6'>
        <div role='current-password' className='flex flex-col gap-2.5'>
          <label htmlFor='current-password' className='text-lg text-tp-black_700'>
            현재 비밀번호
          </label>
          <input
            type='text'
            id='current-password'
            placeholder='현재 비밀번호 입력'
            className='p-4 w-[22.875rem] rounded-md border border-solid border-tp-gray_700 disabled:bg-white'
          />
        </div>
        <div role='current-password' className='flex flex-col gap-2.5'>
          <label htmlFor='current-password' className='text-lg text-tp-black_700'>
            새 비밀번호
          </label>
          <input
            type='text'
            id='new-password'
            placeholder='현재 비밀번호 입력'
            className='p-4 w-[22.875rem] rounded-md border border-solid border-tp-gray_700 disabled:bg-white'
          />
        </div>
        <div role='current-password' className='flex flex-col gap-2.5'>
          <label htmlFor='current-password' className='text-lg text-tp-black_700'>
            새 비밀번호 확인
          </label>
          <input
            type='text'
            id='new-password-check'
            placeholder='현재 비밀번호 입력'
            className='p-4 w-[22.875rem] rounded-md border border-solid border-tp-gray_700 disabled:bg-white'
          />
        </div>
      </div>
      <button type='button' className='self-end px-4 py-2.5'>
        버튼 대체
      </button>
    </div>
  );
};

export default ChangePassword;
