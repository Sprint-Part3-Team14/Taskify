'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { getAccessToken, setAccessToken } from '@/utils/handleToken';
import { ERROR_MESSAGES } from 'constant/errorMessage';
import { REG_EXP } from 'constant/regexp';

const MainLogo = '/logo/main_site_logo.png';

interface FormData {
  email: string;
  password: string;
  watch: string;
}

const SigninPage = () => {
  const { control, handleSubmit, watch } = useForm<FormData>();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const email = watch('email');
  const password = watch('password');
  // useEffect(() => {
  //   const accessToken = getAccessToken();

  //   if (accessToken) {
  //     console.log(accessToken);
  //     router.push('/dashboard');
  //   }
  // }, [router]);

  const onSubmit: SubmitHandler<FormData> = async data => {
    try {
      const response = await fetch('https://sp-taskify-api.vercel.app/4-14/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();
      console.log(responseData);

      if (response.ok) {
        const { accessToken } = responseData;
        setAccessToken(accessToken);
        router.push('/dashboard');
      } else {
        console.error('Failed to log in:', responseData.error);
        alert('비밀번호가 일치하지 않습니다.');
      }
    } catch (error) {
      console.error('Failed to submit form:', error);
    }
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
                required: ERROR_MESSAGES.email.field,
                pattern: {
                  value: REG_EXP.VALID_EMAIL,
                  message: ERROR_MESSAGES.email.pattern,
                },
              }}
              render={({ field, fieldState }) => (
                <>
                  <input
                    {...field}
                    className={`border border-solid outline-tp-violet_900 rounded-md p-3.5 w-full ${
                      fieldState.invalid ? 'border-tp-red' : 'border-tp-gray-700'
                    }`}
                    type='text'
                    placeholder='example@example.com'
                    autoComplete='on'
                  />
                  {fieldState.invalid && (
                    <small className='flex mt-1 font-GS font-medium text-red-500'>{fieldState.error?.message}</small>
                  )}
                </>
              )}
            />
          </div>
          <div className='mb-[20px] relative'>
            <label className='flex mb-2 text-16 font-GS font-bold' htmlFor='password'>
              비밀번호
            </label>
            <Controller
              name='password'
              control={control}
              rules={{
                required: ERROR_MESSAGES.password.field,
                minLength: {
                  value: 8,
                  message: ERROR_MESSAGES.password.pattern,
                },
              }}
              render={({ field, fieldState }) => (
                <>
                  <input
                    {...field}
                    className={`border border-solid outline-tp-violet_900 rounded-md p-3.5 w-full ${
                      fieldState.invalid ? 'border-tp-red' : 'border-tp-gray-700'
                    }`}
                    type={showPassword ? 'text' : 'password'}
                    placeholder='비밀번호'
                    autoComplete='off'
                  />
                  <span
                    className='absolute top-[45px] right-[15px] cursor-pointer'
                    onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? '😀' : '😑'}
                  </span>
                  {fieldState.invalid && (
                    <small className='flex mt-1 font-GS font-medium text-red-500'>{fieldState.error?.message}</small>
                  )}
                </>
              )}
            />
          </div>
          <button
            type='submit'
            disabled={!email || !password}
            className={'h-[50px]  w-full flex-center rounded-lg bg-tp-violet_900 text-white disabled:bg-gray-400'}>
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
