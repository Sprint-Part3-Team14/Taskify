import InputImageButton from '@components/Modal/Button/InputImageButton';
import Image from 'next/image';
import Link from 'next/link';

const MyPage = () => {
  return (
    <div className='p-5 bg-[#fafafa] min-h-auto'>
      <Link href='/boardid'>
        <button type='button' className='text-base text-tp-black_700 flex gap-1.5 items-center mb-6'>
          <div className='w-5 h-5 relative'>
            <Image fill src='/icon/arrow_forward.svg' alt='뒤로 가기 버튼' />
          </div>
          돌아가기
        </button>
      </Link>
      <div className='flex flex-col w-[38.75rem] bg-white p-8 rounded-lg mb-2.5 shadow-sm'>
        <h1 className='text-2xl font-bold text-tp-black_700'>프로필</h1>
        <div className='mt-7 mb-6 flex gap-4 items-center'>
          <InputImageButton size='large' />
          <div className='flex flex-col gap-5'>
            <div className='flex flex-col gap-2.5'>
              <label className='text-lg text-tp-black_700'>이메일</label>
              <input
                type='email'
                className='border border-solid border-tp-gray-700 outline-tp-violet_900 rounded-md p-3.5 w-[22.875rem]'
              />
            </div>
            <div className='flex flex-col gap-2.5'>
              <label className='text-lg text-tp-black_700'>닉네임</label>
              <input
                type='text'
                className='border border-solid border-tp-gray-700 outline-tp-violet_900 rounded-md p-3.5 w-[22.875rem]'
              />
            </div>
          </div>
        </div>
        <button
          type='submit'
          className='bg-tp-violet_900 rounded-lg px-7 py-2 self-end text-tp-white active:bg-[#4729c2]'>
          저장
        </button>
      </div>
      <div className='flex flex-col w-[38.75rem] bg-white p-8 rounded-lg shadow-sm'>
        <h1 className='text-2xl font-bold text-tp-black_700'>비밀번호 변경</h1>
        <div className='mt-7 mb-6 flex flex-col gap-5'>
          <div className='flex flex-col gap-2.5'>
            <label className='text-lg text-tp-black_700'>현재 비밀번호</label>
            <input
              placeholder='현재 비밀번호 입력'
              type='email'
              className='border border-solid border-tp-gray-700 outline-tp-violet_900 rounded-md p-3.5 w-full'
            />
          </div>
          <div className='flex flex-col gap-2.5'>
            <label className='text-lg text-tp-black_700'>새 비밀번호</label>
            <input
              placeholder='새 비밀번호 입력'
              type='email'
              className='border border-solid border-tp-gray-700 outline-tp-violet_900 rounded-md p-3.5 w-full'
            />
          </div>
          <div className='flex flex-col gap-2.5'>
            <label className='text-lg text-tp-black_700'>새 비밀번호 확인</label>
            <input
              placeholder='새 비밀번호 입력'
              type='password'
              className='border border-solid border-tp-gray-700 outline-tp-violet_900 rounded-md p-3.5 w-full '
            />
          </div>
          <button
            type='submit'
            className='bg-tp-violet_900 rounded-lg px-7 py-2 self-end text-tp-white active:bg-[#4729c2]'>
            변경
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
