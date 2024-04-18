'use client';

import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import Image from 'next/image';
import Link from 'next/link';

const MainLogo = '/logo/main_site_logo.png';

interface FormData {
  email: string;
  password: string;
}

const SigninPage = () => {
  const { control, handleSubmit } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async data => {
    console.log(data); // 임시 함수
  };

  return (
    <div className='h-screen bg-white'>
      <div className='mx-auto max-h-fit min-h-screen w-full max-w-lg flex-col px-12 py-16 text-center'>
        <Link href='/'>
          <div className='mx-auto my-0 inline-block justify-center'>
            <Image src={MainLogo} alt='메인 로고 이미지' width={200} height={279} />
          </div>
        </Link>
        <h1 className='mt-[10px] text-lg font-GS font-extrabold'>오늘도 만나서 반가워요!</h1>
        <form className='mt-[38px] w-full' onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-[16px]'>
            <label className='flex mb-2 text-16 font-GS font-bold' htmlFor='email'>
              이메일
            </label>
            <Controller
              name='email'
              control={control}
              rules={{
                required: '이메일을 입력해주세요.',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: '올바른 이메일 주소를 입력해주세요.',
                },
              }}
              render={({ field, fieldState }) => (
                <>
                  <input
                    {...field}
                    className={`border border-solid border-tp-gray-700 outline-tp-violet_900 rounded-md p-3.5 w-full ${
                      fieldState.invalid ? 'border-red' : ''
                    }`}
                    type='text'
                    placeholder='example@example.com'
                    autoComplete='off'
                  />
                  {fieldState.invalid && (
                    <small className='flex mt-1 font-GS font-medium text-red-500'>{fieldState.error?.message}</small>
                  )}
                </>
              )}
            />
          </div>
          <div className='mb-[20px]'>
            <label className='flex mb-2 text-16 font-GS font-bold' htmlFor='password'>
              비밀번호
            </label>
            <Controller
              name='password'
              control={control}
              rules={{
                required: '비밀번호를 입력해주세요.',
                minLength: {
                  value: 8,
                  message: '최소 8자 이상 입력해주세요.',
                },
              }}
              render={({ field, fieldState }) => (
                <>
                  <input
                    {...field}
                    className={`border border-solid border-tp-gray-700 outline-tp-violet_900 rounded-md p-3.5 w-full ${
                      fieldState.invalid ? 'border-red' : ''
                    }`}
                    type='password'
                    placeholder='비밀번호'
                    autoComplete='off'
                  />
                  {fieldState.invalid && (
                    <small className='flex mt-1 font-GS font-medium text-red-500'>{fieldState.error?.message}</small>
                  )}
                </>
              )}
            />
          </div>
          <button
            className={'h-[50px]  w-[420px] flex-center rounded-lg bg-tp-violet_900 text-white disabled:bg-gray-400'}>
            로그인
          </button>
        </form>
        <div className='flex justify-center text-base mt-[24px] text-center font-GS  '>
          회원이 아니신가요?{' '}
          <Link href='/signup'>
            <div className='ml-1 text-primary underline text-blue-700'>회원가입하기</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SigninPage;
